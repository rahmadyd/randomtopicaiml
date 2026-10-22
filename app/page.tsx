'use client';

import { RefreshCw, Printer } from 'lucide-react';
import DropdownSelectors from '@/components/DropdownSelectors';
import IdeaCard from '@/components/IdeaCard';
import DetailedRoadmap from '@/components/DetailedRoadmap';
import type { ProjectIdea } from '@/types';
import { useState } from 'react';

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, category, industry }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate idea');
      }

      const data = await response.json();
      setGeneratedIdea(data);
      setIsGenerating(false);

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
    <main className="min-h-screen relative overflow-hidden ios-aurora-bg text-white selection:bg-indigo-500/30 selection:text-white">
      {/* Light dot overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      <div className="container mx-auto px-4 py-10 max-w-5xl relative z-10">
        {/* Header */}
        <header className="text-center mb-10 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ios-glass-pill text-xs font-medium text-white/90 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AI-Powered Idea Generator</span>
            <span className="text-white/30">•</span>
            <span className="text-indigo-300">iOS Glass Edition</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3">
            <span className="bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent">
              AI/ML Project Idea
            </span>{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>

          <p className="text-white/65 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Dapatkan ide proyek AI & Machine Learning yang komprehensif, roadmap bertahap, dataset siap pakai, dan estimasi resource sesuai level Anda.
          </p>
        </header>

        {/* Selection Area */}
        <div className="ios-glass rounded-[28px] p-6 sm:p-9 mb-8 no-print">
          <DropdownSelectors onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>

        {/* Simple loading state — no bingo animation */}
        {isGenerating && (
          <div className="ios-glass rounded-2xl p-8 mb-8 no-print text-center">
            <div className="flex items-center justify-center gap-3 text-white/80">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="text-base font-medium">Menghubungi Groq AI dan meracik blueprint proyek...</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="ios-glass rounded-2xl p-5 mb-8 no-print border-red-500/30 bg-red-950/20">
            <div className="flex items-center gap-3">
              <span className="text-red-400 text-xl">⚠️</span>
              <p className="text-red-200 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Generated Idea */}
        {generatedIdea && !isGenerating && (
          <div className="space-y-6">
            <IdeaCard idea={generatedIdea} />

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap no-print pt-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2.5 px-6 py-3 rounded-2xl ios-glass-pill hover:bg-white/15 active:scale-95 text-white font-medium text-sm sm:text-base transition-all duration-150"
                title="Cetak atau simpan sebagai PDF"
              >
                <Printer className="w-4 h-4 text-indigo-300" />
                Print / Save as PDF
              </button>

              <button
                onClick={() => setGeneratedIdea(null)}
                className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 active:scale-95 text-white font-medium text-sm sm:text-base transition-all duration-150 shadow-lg shadow-indigo-500/25"
              >
                <RefreshCw className="w-4 h-4" />
                Generate New Idea
              </button>
            </div>

            {/* Detailed Roadmap */}
            <DetailedRoadmap roadmap={generatedIdea.roadmap} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-white/40 text-xs sm:text-sm no-print">
          <p className="flex items-center justify-center gap-2">
            <span>Designed with iOS Glassmorphism</span>
            <span>•</span>
            <span>Powered by Groq AI</span>
          </p>
          <p className="mt-1 text-white/30 text-xs">Fast • Structured • Free</p>
        </footer>
      </div>
    </main>
  );
}
