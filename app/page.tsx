'use client';

import { useState } from 'react';
import { RefreshCw, Printer } from 'lucide-react';
import DropdownSelectors from '@/components/DropdownSelectors';
import BingoAnimation from '@/components/BingoAnimation';
import IdeaCard from '@/components/IdeaCard';
import DetailedRoadmap from '@/components/DetailedRoadmap';
import type { ProjectIdea } from '@/types';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState<ProjectIdea | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (level: string, category: string, industry: string) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedIdea(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, category, industry }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate idea');
      }

      const data = await response.json();
      
      // Simulate bingo animation delay
      setTimeout(() => {
        setGeneratedIdea(data);
        setIsGenerating(false);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    document.title = generatedIdea?.title ?? 'AI-ML Project Idea';
    window.print();
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#080914] text-white selection:bg-indigo-500/30 selection:text-white">
      {/* ── Ambient Background Glowing Orbs (iOS Frost Glass Effect) ──────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden ambient-glow z-0">
        <div className="absolute -top-32 -left-20 w-[32rem] h-[32rem] bg-indigo-600/25 rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute top-1/4 -right-28 w-[36rem] h-[36rem] bg-purple-600/25 rounded-full blur-[150px] animate-float-reverse" />
        <div className="absolute top-2/3 left-1/4 w-[30rem] h-[30rem] bg-cyan-500/20 rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute -bottom-24 right-1/3 w-[28rem] h-[28rem] bg-pink-600/20 rounded-full blur-[130px] animate-float-reverse" />
        {/* Subtle grid mesh overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        {/* Header */}
        <header className="text-center mb-12 no-print">
          {/* iOS-Style Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ios-glass-pill text-xs font-medium text-white/90 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI-Powered Idea Generator</span>
            <span className="text-white/30">•</span>
            <span className="text-indigo-300">iOS Glass Edition</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent drop-shadow-sm">
              AI/ML Project Idea
            </span>{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>

          <p className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Dapatkan ide proyek AI & Machine Learning yang komprehensif, roadmap bertahap, dataset siap pakai, dan estimasi resource sesuai level Anda.
          </p>
        </header>

        {/* Selection Area - iOS Glass Container */}
        <div className="ios-glass rounded-[32px] p-6 sm:p-10 mb-10 no-print transition-all duration-300">
          <DropdownSelectors onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>

        {/* Bingo Animation */}
        {isGenerating && (
          <div className="mb-10 no-print">
            <BingoAnimation />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="ios-glass rounded-2xl p-5 mb-10 no-print border-red-500/30 bg-red-950/20">
            <div className="flex items-center gap-3">
              <span className="text-red-400 text-xl">⚠️</span>
              <p className="text-red-200 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Generated Idea */}
        {generatedIdea && !isGenerating && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            <IdeaCard idea={generatedIdea} />
            
            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap no-print pt-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl ios-glass-pill hover:bg-white/15 active:scale-95 text-white font-medium text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-indigo-500/20"
                title="Buka dialog print browser untuk cetak atau simpan sebagai PDF"
              >
                <Printer className="w-4 h-4 text-indigo-300" />
                Print / Save as PDF
              </button>

              <button
                onClick={() => setGeneratedIdea(null)}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 active:scale-95 text-white font-medium text-sm sm:text-base transition-all duration-200 shadow-lg shadow-indigo-500/25"
              >
                <RefreshCw className="w-4 h-4 text-white" />
                Generate New Idea
              </button>
            </div>

            {/* Detailed Roadmap */}
            <DetailedRoadmap roadmap={generatedIdea.roadmap} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-20 text-white/40 text-xs sm:text-sm no-print">
          <p className="flex items-center justify-center gap-2">
            <span>Designed with iOS Glassmorphism</span>
            <span>•</span>
            <span>Powered by Groq AI</span>
          </p>
          <p className="mt-1.5 text-white/30 text-xs">Fast • Structured • Free</p>
        </footer>
      </div>
    </main>
  );
}
