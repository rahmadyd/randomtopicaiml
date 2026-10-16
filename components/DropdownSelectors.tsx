'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface DropdownSelectorsProps {
  onGenerate: (level: string, category: string, industry: string) => void;
  isGenerating: boolean;
}

const levels = [
  { value: 'beginner', label: 'Beginner (2-3 weeks)', description: 'Perfect for learning basics' },
  { value: 'intermediate', label: 'Intermediate (3-6 weeks)', description: 'Moderate complexity' },
  { value: 'advanced', label: 'Advanced (6+ weeks)', description: 'Research-level projects' },
];

const categories = [
  { value: 'computer-vision', label: 'Computer Vision', icon: '👁️' },
  { value: 'nlp', label: 'Natural Language Processing', icon: '💬' },
  { value: 'time-series', label: 'Time Series Forecasting', icon: '📈' },
  { value: 'recommendation', label: 'Recommendation Systems', icon: '⭐' },
  { value: 'reinforcement-learning', label: 'Reinforcement Learning', icon: '🎮' },
  { value: 'generative-ai', label: 'Generative AI', icon: '🎨' },
  { value: 'anomaly-detection', label: 'Anomaly Detection', icon: '🔍' },
  { value: 'speech-processing', label: 'Speech Processing', icon: '🎤' },
];

const industries = [
  { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'finance', label: 'Finance & Trading', icon: '💰' },
  { value: 'ecommerce', label: 'E-commerce & Retail', icon: '🛒' },
  { value: 'education', label: 'Education & E-learning', icon: '📚' },
  { value: 'social-media', label: 'Social Media', icon: '📱' },
  { value: 'gaming', label: 'Gaming & Entertainment', icon: '🎮' },
  { value: 'agriculture', label: 'Agriculture', icon: '🌾' },
  { value: 'transportation', label: 'Transportation', icon: '🚗' },
];

export default function DropdownSelectors({ onGenerate, isGenerating }: DropdownSelectorsProps) {
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [industry, setIndustry] = useState('');

  const handleGenerate = () => {
    if (!level || !category || !industry) {
      alert('Please select all three options!');
      return;
    }
    onGenerate(level, category, industry);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Pilih Preferensi Kamu
      </h2>

      {/* Level Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          📊 Level Kesulitan
        </label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
        >
          <option value="">-- Pilih Level --</option>
          {levels.map((lvl) => (
            <option key={lvl.value} value={lvl.value}>
              {lvl.label} - {lvl.description}
            </option>
          ))}
        </select>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          🤖 Kategori AI/ML
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
        >
          <option value="">-- Pilih Kategori --</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Industry Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          🏢 Industri
        </label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-purple-500 focus:outline-none transition-colors"
        >
          <option value="">-- Pilih Industri --</option>
          {industries.map((ind) => (
            <option key={ind.value} value={ind.value}>
              {ind.icon} {ind.label}
            </option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 ${
          isGenerating
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg'
        }`}
      >
        <Sparkles className="w-6 h-6" />
        {isGenerating ? 'Generating...' : '🎲 Generate Project Idea!'}
        <Sparkles className="w-6 h-6" />
      </button>
    </div>
  );
}
