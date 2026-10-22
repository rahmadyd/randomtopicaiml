import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import staticIdeas from '@/data/ideas.json';
import { ProjectIdea } from '@/types';

// Input validation schema
const RequestSchema = z.object({
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  category: z.enum([
    'computer-vision',
    'nlp',
    'time-series',
    'recommendation',
    'reinforcement-learning',
    'generative-ai',
    'anomaly-detection',
    'speech-processing'
  ]),
  industry: z.enum([
    'healthcare',
    'finance',
    'ecommerce',
    'education',
    'social-media',
    'gaming',
    'agriculture',
    'transportation'
  ]),
});

// Simple in-memory rate limiting (for production, use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = requestCounts.get(ip);
  
  if (!limit || now > limit.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute
    return true;
  }
  
  if (limit.count >= 10) { // 10 requests per minute
    return false;
  }
  
  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const requestId = nanoid();
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  
  // Check if API key is loaded
  if (!process.env.GROQ_API_KEY) {
    console.warn('⚠️ GROQ_API_KEY is not set in environment variables');
  }
  
  console.log({
    requestId,
    ip,
    timestamp: new Date().toISOString(),
    endpoint: '/api/generate',
  });

  try {
    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = RequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input parameters', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { level, category, industry } = validation.data;

    // Try to find from static database first
    const matchingIdeas = (staticIdeas as unknown as ProjectIdea[]).filter(
      (idea: ProjectIdea) => 
        idea.level === level &&
        idea.category === category &&
        idea.industry === industry
    );

    if (matchingIdeas.length > 0) {
      // Return random idea from static database
      const randomIdea = matchingIdeas[Math.floor(Math.random() * matchingIdeas.length)];
      console.log({ requestId, source: 'static-database', ideaId: randomIdea.id });
      return NextResponse.json(randomIdea);
    }

    // If no match in database, generate with AI
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      console.error({ requestId, error: 'GROQ_API_KEY not configured' });
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const prompt = `Generate a unique ${level}-level ${category.replace('-', ' ')} project for the ${industry} industry.

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "id": "unique-id",
  "title": "Project Title",
  "description": "Detailed 2-3 sentence description",
  "level": "${level}",
  "category": "${category}",
  "industry": "${industry}",
  "estimatedTime": "X weeks",
  "techniques": ["technique1", "technique2", "technique3"],
  "datasets": ["dataset name 1", "dataset name 2"],
  "datasetLinks": [
    {
      "name": "Dataset Name",
      "url": "https://www.kaggle.com/datasets/...",
      "size": "~500MB",
      "source": "kaggle"
    },
    {
      "name": "Dataset Name 2",
      "url": "https://huggingface.co/datasets/...",
      "size": "~2GB",
      "source": "huggingface"
    }
  ],
  "algorithms": [
    {
      "name": "Algorithm Name (e.g., ResNet-50, LSTM, XGBoost)",
      "reason": "Why this algorithm is recommended for this specific project",
      "complexity": "simple"
    },
    {
      "name": "Alternative Algorithm",
      "reason": "When to use this instead",
      "complexity": "moderate"
    }
  ],
  "projectSize": {
    "datasetSize": "~500MB",
    "modelSize": "~50MB",
    "totalStorage": "~1GB (including env & deps)",
    "trainingTime": "~2 hours on GPU / ~8 hours on CPU"
  },
  "recommendedPlatform": "colab",
  "platformReason": "Requires GPU for training; Google Colab T4 GPU is sufficient and free",
  "learningOutcomes": ["outcome1", "outcome2", "outcome3"],
  "roadmap": {
    "phases": [
      {
        "name": "Phase 1: Setup",
        "duration": "Week 1",
        "tasks": ["task1", "task2", "task3"]
      },
      {
        "name": "Phase 2: Development",
        "duration": "Week 2",
        "tasks": ["task1", "task2", "task3"]
      }
    ],
    "resources": ["resource1", "resource2"],
    "tips": ["tip1", "tip2"]
  }
}

IMPORTANT RULES:
- datasetLinks URLs must be REAL absolute URLs from Kaggle, HuggingFace, UCI, or official sources
- recommendedPlatform must be one of: "local", "colab", or "both"
- For ${level} level: if the project needs GPU or dataset >2GB, recommend "colab"; if it can run on CPU with <2GB, recommend "local"; otherwise "both"
- algorithms must list the PRIMARY algorithm first, then 1-2 alternatives
- projectSize.trainingTime must include both GPU and CPU estimates
- Make it specific, actionable, and tailored to ${level} level.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are an AI/ML project idea generator. Always respond with valid JSON only, no markdown formatting.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content?.trim() || '';
    
    // Clean up response (remove markdown code blocks if present)
    const cleanedResponse = responseText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    let generatedIdea;
    try {
      generatedIdea = JSON.parse(cleanedResponse);
    } catch {
      console.error({ requestId, error: 'Failed to parse AI response', response: cleanedResponse });
      return NextResponse.json(
        { error: 'Failed to generate valid idea format' },
        { status: 500 }
      );
    }

    console.log({ requestId, source: 'groq-ai', ideaId: generatedIdea.id });
    
    return NextResponse.json(generatedIdea);

  } catch (error) {
    console.error({
      requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: 'Failed to generate idea. Please try again.' },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
