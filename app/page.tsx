'use client';

import { useState } from 'react';
import { Sparkles, RefreshCw, Printer } from 'lucide-react';
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
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12 no-print">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI/ML Project Idea Generator
            </h1>
            <Sparkles className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Temukan ide project AI/ML yang unik dan mendalam sesuai level kamu
          </p>
        </header>

        {/* Selection Area */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8 no-print">
          <DropdownSelectors onGenerate={handleGenerate} isGenerating={isGenerating} />
        </div>

        {/* Bingo Animation */}
        {isGenerating && (
          <div className="mb-8 no-print">
            <BingoAnimation />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-8 no-print">
            <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
          </div>
        )}

        {/* Generated Idea */}
        {generatedIdea && !isGenerating && (
          <div className="space-y-6">
            <IdeaCard idea={generatedIdea} />
            
            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap no-print">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/40"
                title="Buka dialog print browser untuk cetak atau pilih Simpan sebagai PDF"
              >
                <Printer className="w-5 h-5" />
                Print / Save as PDF
              </button>

              <button
                onClick={() => setGeneratedIdea(null)}
                className="flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-purple-500/40"
              >
                <RefreshCw className="w-5 h-5" />
                Generate New
              </button>
            </div>

            {/* Detailed Roadmap */}
            <DetailedRoadmap roadmap={generatedIdea.roadmap} />
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400 no-print">
          <p>Built with ❤️ using Next.js & Groq AI</p>
          <p className="text-sm mt-2">Secure • Fast • Free</p>
        </footer>
      </div>
    </main>
  );
}
