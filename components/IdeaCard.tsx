'use client';

import { motion } from 'framer-motion';
import { 
  Trophy, 
  Clock, 
  Brain, 
  Database, 
  HardDrive, 
  Cpu, 
  MonitorSmartphone, 
  Laptop, 
  Cloud,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import type { ProjectIdea } from '@/types';

interface IdeaCardProps {
  idea: ProjectIdea;
}

const sourceColors: Record<string, string> = {
  kaggle:      'bg-sky-500/20 text-sky-300 border-sky-400/30',
  huggingface: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  uci:         'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
  github:      'bg-slate-500/20 text-slate-300 border-slate-400/30',
  official:    'bg-purple-500/20 text-purple-300 border-purple-400/30',
  other:       'bg-gray-500/20 text-gray-300 border-gray-400/30',
};

const sourceLabels: Record<string, string> = {
  kaggle:      'Kaggle',
  huggingface: '🤗 HuggingFace',
  uci:         'UCI ML',
  github:      'GitHub',
  official:    'Official',
  other:       'Source',
};

const complexityBadge: Record<string, string> = {
  simple:   'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  moderate: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  complex:  'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

export default function IdeaCard({ idea }: IdeaCardProps) {
  const levelColors = {
    beginner:     'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    intermediate: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    advanced:     'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };

  const platformIcon = idea.recommendedPlatform === 'local'
    ? <Laptop className="w-5 h-5 text-emerald-400" />
    : idea.recommendedPlatform === 'colab'
    ? <Cloud className="w-5 h-5 text-sky-400" />
    : <MonitorSmartphone className="w-5 h-5 text-purple-400" />;

  const platformLabel = {
    local: '💻 Komputer Lokal',
    colab: '☁️ Google Colab (Gratis GPU T4)',
    both:  '🔀 Hybrid (Lokal / Colab)',
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, type: 'spring', damping: 20 }}
      className="ios-glass rounded-[32px] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative top accent glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex p-3 rounded-2xl ios-glass-pill mb-4 shadow-inner"
        >
          <Sparkles className="w-8 h-8 text-amber-300" />
        </motion.div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
          {idea.title}
        </h2>

        {/* Tags */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[idea.level]}`}>
            📊 {idea.level.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold border border-purple-500/30 bg-purple-500/15 text-purple-200">
            🤖 {idea.category.replace('-', ' ').toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold border border-sky-500/30 bg-sky-500/15 text-sky-200">
            🏢 {idea.industry.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="ios-glass-card rounded-2xl p-5 sm:p-6 mb-8 text-white/80 text-base sm:text-lg leading-relaxed text-center">
        {idea.description}
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
        <div className="ios-glass-card rounded-2xl p-4 text-center">
          <Clock className="w-5 h-5 text-indigo-400 mx-auto mb-1.5" />
          <p className="text-xs text-white/50 mb-0.5">Estimasi Waktu</p>
          <p className="font-bold text-sm sm:text-base text-white">{idea.estimatedTime}</p>
        </div>
        
        <div className="ios-glass-card rounded-2xl p-4 text-center">
          <Brain className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
          <p className="text-xs text-white/50 mb-0.5">Teknik & Skill</p>
          <p className="font-bold text-sm sm:text-base text-white">{idea.techniques.length} materi</p>
        </div>
        
        <div className="ios-glass-card rounded-2xl p-4 text-center">
          <Database className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
          <p className="text-xs text-white/50 mb-0.5">Kebutuhan Dataset</p>
          <p className="font-bold text-sm sm:text-base text-white">{idea.datasetLinks?.length ?? idea.datasets.length} sumber</p>
        </div>
        
        <div className="ios-glass-card rounded-2xl p-4 text-center">
          <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
          <p className="text-xs text-white/50 mb-0.5">Target Capaian</p>
          <p className="font-bold text-sm sm:text-base text-white">{idea.learningOutcomes.length} kompetensi</p>
        </div>
      </div>

      {/* ── Estimasi Ukuran Project ── */}
      {idea.projectSize && (
        <div className="mb-8 ios-glass-card rounded-2xl p-5 sm:p-6 border border-white/10">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm sm:text-base">
            <HardDrive className="w-4 h-4 text-indigo-400" />
            Estimasi Kebutuhan Hardware & Storage
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="ios-glass-subtle rounded-xl p-3 text-center">
              <p className="text-xs text-white/50 mb-1">📦 Ukuran Dataset</p>
              <p className="font-bold text-sm text-sky-300">{idea.projectSize.datasetSize}</p>
            </div>
            <div className="ios-glass-subtle rounded-xl p-3 text-center">
              <p className="text-xs text-white/50 mb-1">🧠 Model Weight</p>
              <p className="font-bold text-sm text-purple-300">{idea.projectSize.modelSize}</p>
            </div>
            <div className="ios-glass-subtle rounded-xl p-3 text-center">
              <p className="text-xs text-white/50 mb-1">💾 Total Storage</p>
              <p className="font-bold text-sm text-emerald-300">{idea.projectSize.totalStorage}</p>
            </div>
            <div className="ios-glass-subtle rounded-xl p-3 text-center">
              <p className="text-xs text-white/50 mb-1">⏱️ Durasi Training</p>
              <p className="font-bold text-sm text-amber-300">{idea.projectSize.trainingTime}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Platform Rekomendasi ── */}
      {idea.recommendedPlatform && (
        <div className="mb-8 ios-glass-card rounded-2xl p-5 sm:p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl ios-glass-pill">
              {platformIcon}
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm sm:text-base">
                Rekomendasi Lingkungan Kerja:{' '}
                <span className="font-bold text-indigo-300">
                  {platformLabel[idea.recommendedPlatform]}
                </span>
              </h3>
            </div>
          </div>
          {idea.platformReason && (
            <p className="text-xs sm:text-sm text-white/70 mt-2 pl-1 leading-relaxed">
              {idea.platformReason}
            </p>
          )}
          {idea.recommendedPlatform !== 'local' && (
            <div className="mt-3">
              <a
                href="https://colab.research.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl ios-glass-pill text-xs text-sky-300 hover:text-white transition-colors"
              >
                <span>Buka Google Colab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* ── Rekomendasi Algoritma ── */}
      {idea.algorithms && idea.algorithms.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-white mb-3.5 flex items-center gap-2 text-sm sm:text-base">
            <Cpu className="w-4 h-4 text-indigo-400" />
            Arsitektur Algoritma yang Direkomendasikan
          </h3>
          <div className="space-y-3">
            {idea.algorithms.map((algo, idx) => (
              <div
                key={idx}
                className="ios-glass-card rounded-2xl p-4 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  {idx === 0 && (
                    <span className="text-[10px] font-bold tracking-wider bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 px-2 py-0.5 rounded-full">
                      ⭐ PRIMARY ALGORITHM
                    </span>
                  )}
                  <span className="font-bold text-white text-sm sm:text-base">{algo.name}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${complexityBadge[algo.complexity]}`}>
                    {algo.complexity.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{algo.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Key Techniques ── */}
      <div className="mb-8">
        <h3 className="font-semibold text-white mb-3.5 flex items-center gap-2 text-sm sm:text-base">
          <Brain className="w-4 h-4 text-purple-400" />
          Teknik & Library Kunci:
        </h3>
        <div className="flex flex-wrap gap-2">
          {idea.techniques.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 ios-glass-pill rounded-xl text-xs sm:text-sm text-white/90 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── Datasets (Clickable Links) ── */}
      {idea.datasetLinks && idea.datasetLinks.length > 0 ? (
        <div className="mb-8">
          <h3 className="font-semibold text-white mb-3.5 flex items-center gap-2 text-sm sm:text-base">
            <Database className="w-4 h-4 text-emerald-400" />
            Dataset Siap Pakai (Tautan Langsung):
          </h3>
          <div className="space-y-2.5">
            {idea.datasetLinks.map((ds, idx) => (
              <a
                key={idx}
                href={ds.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 ios-glass-card hover:bg-white/[0.09] rounded-2xl p-3.5 transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${sourceColors[ds.source] ?? 'bg-white/10 text-white border-white/20'}`}>
                    {sourceLabels[ds.source] ?? ds.source}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white truncate group-hover:text-indigo-300 transition-colors">
                    {ds.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-white/50 font-mono">{ds.size}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <h3 className="font-semibold text-white mb-3.5 flex items-center gap-2 text-sm sm:text-base">
            <Database className="w-4 h-4 text-emerald-400" />
            Dataset:
          </h3>
          <div className="flex flex-wrap gap-2">
            {idea.datasets.map((ds, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 ios-glass-pill rounded-xl text-xs sm:text-sm text-white/90"
              >
                {ds}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Learning Outcomes ── */}
      <div>
        <h3 className="font-semibold text-white mb-3.5 flex items-center gap-2 text-sm sm:text-base">
          <Trophy className="w-4 h-4 text-amber-400" />
          Kompetensi yang Akan Anda Kuasai:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {idea.learningOutcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-2.5 ios-glass-subtle rounded-xl p-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-white/80">{outcome}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
