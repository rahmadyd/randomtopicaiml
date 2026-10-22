'use client';

import { useState } from 'react';
import { Sparkles, Gauge, Cpu, Building2, ChevronDown, Wand2 } from 'lucide-react';

interface DropdownSelectorsProps {
  onGenerate: (level: string, category: string, industry: string) => void;
  isGenerating: boolean;
}

const levels = [
  { value: 'beginner', label: 'Beginner', time: '2-3 weeks', desc: 'Cocok untuk mempelajari dasar & fundamental ML' },
  { value: 'intermediate', label: 'Intermediate', time: '3-6 weeks', desc: 'Kompleksitas menengah & pipeline komprehensif' },
  { value: 'advanced', label: 'Advanced', time: '6+ weeks', desc: 'Arsitektur deep learning & standar riset/industri' },
];

const categories = [
  { value: 'computer-vision', label: 'Computer Vision', icon: '👁️', desc: 'Klasifikasi gambar, deteksi objek, segmentasi' },
  { value: 'nlp', label: 'Natural Language Processing', icon: '💬', desc: 'LLMs, sentimen analisis, ringkasan teks' },
  { value: 'time-series', label: 'Time Series Forecasting', icon: '📈', desc: 'Prediksi saham, tren masa depan, sensor data' },
  { value: 'recommendation', label: 'Recommendation Systems', icon: '⭐', desc: 'Collaborative filtering & personalized engines' },
  { value: 'reinforcement-learning', label: 'Reinforcement Learning', icon: '🎮', desc: 'Q-Learning, game agents, robotika' },
  { value: 'generative-ai', label: 'Generative AI', icon: '🎨', desc: 'Diffusion models, GANs, generative text/audio' },
  { value: 'anomaly-detection', label: 'Anomaly Detection', icon: '🔍', desc: 'Deteksi penipuan, cybersecurity, log audit' },
  { value: 'speech-processing', label: 'Speech Processing', icon: '🎤', desc: 'Speech-to-text, audio analysis, voice clone' },
];

const industries = [
  { value: 'healthcare', label: 'Healthcare & Medis', icon: '🏥' },
  { value: 'finance', label: 'Finance & Trading', icon: '💰' },
  { value: 'ecommerce', label: 'E-commerce & Retail', icon: '🛒' },
  { value: 'education', label: 'Education & EdTech', icon: '📚' },
  { value: 'social-media', label: 'Social Media & Content', icon: '📱' },
  { value: 'gaming', label: 'Gaming & Entertainment', icon: '🎮' },
  { value: 'agriculture', label: 'Agriculture & AgTech', icon: '🌾' },
  { value: 'transportation', label: 'Transportation & Logistics', icon: '🚗' },
];

export default function DropdownSelectors({ onGenerate, isGenerating }: DropdownSelectorsProps) {
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [industry, setIndustry] = useState('');

  const handleGenerate = () => {
    if (!level || !category || !industry) {
      alert('Silakan pilih Level, Kategori, dan Industri terlebih dahulu!');
      return;
    }
    onGenerate(level, category, industry);
  };

  const isFormComplete = Boolean(level && category && industry);

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl ios-glass-pill text-indigo-400">
              <Wand2 className="w-5 h-5" />
            </span>
            Konfigurasi Preferensi Proyek
          </h2>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Pilih parameter di bawah untuk memicu AI merancang blueprint proyek Anda
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-white/40 ios-glass-pill px-3 py-1 rounded-full">
          <span>3 parameter wajib</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Level Selection */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-indigo-300">
            <Gauge className="w-4 h-4" />
            Level Pengalaman
          </label>
          <div className="relative">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full appearance-none ios-glass-input rounded-2xl px-4 py-3.5 pr-10 text-white font-medium text-sm focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-[#101226] text-white/60">-- Pilih Level --</option>
              {levels.map((lvl) => (
                <option key={lvl.value} value={lvl.value} className="bg-[#101226] text-white">
                  {lvl.label} ({lvl.time})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          {level && (
            <p className="text-xs text-white/50 pl-1 animate-in fade-in duration-200">
              {levels.find((l) => l.value === level)?.desc}
            </p>
          )}
        </div>

        {/* 2. Category Selection */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-purple-300">
            <Cpu className="w-4 h-4" />
            Kategori Domain AI/ML
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none ios-glass-input rounded-2xl px-4 py-3.5 pr-10 text-white font-medium text-sm focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-[#101226] text-white/60">-- Pilih Domain AI --</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-[#101226] text-white">
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          {category && (
            <p className="text-xs text-white/50 pl-1 animate-in fade-in duration-200">
              {categories.find((c) => c.value === category)?.desc}
            </p>
          )}
        </div>

        {/* 3. Industry Selection */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-pink-300">
            <Building2 className="w-4 h-4" />
            Target Industri
          </label>
          <div className="relative">
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full appearance-none ios-glass-input rounded-2xl px-4 py-3.5 pr-10 text-white font-medium text-sm focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-[#101226] text-white/60">-- Pilih Industri --</option>
              {industries.map((ind) => (
                <option key={ind.value} value={ind.value} className="bg-[#101226] text-white">
                  {ind.icon} {ind.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          {industry && (
            <p className="text-xs text-white/50 pl-1 animate-in fade-in duration-200">
              Aplikasi nyata di sektor {industries.find((i) => i.value === industry)?.label}
            </p>
          )}
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="pt-2">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`w-full group relative overflow-hidden py-4 px-6 rounded-2xl font-semibold text-base transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${
            isGenerating
              ? 'opacity-70 cursor-not-allowed bg-indigo-600/50'
              : isFormComplete
              ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30 hover:shadow-indigo-500/50 active:scale-[0.99]'
              : 'ios-glass-pill hover:bg-white/10 text-white/90 active:scale-[0.99]'
          }`}
          style={{
            boxShadow: isFormComplete && !isGenerating
              ? '0 10px 25px -5px rgba(99, 102, 241, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4)'
              : undefined,
          }}
        >
          {/* Subtle specular sheen */}
          <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Menghubungi AI Groq & Meracik Blueprint...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-yellow-300 group-hover:rotate-12 transition-transform duration-300" />
              <span>Generate Blueprint Proyek AI</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
