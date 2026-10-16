'use client';

import { motion } from 'framer-motion';
import { Trophy, Clock, Brain, Database, HardDrive, Cpu, Link2, MonitorSmartphone, Laptop, Cloud } from 'lucide-react';
import type { ProjectIdea } from '@/types';

interface IdeaCardProps {
  idea: ProjectIdea;
}

const sourceColors: Record<string, string> = {
  kaggle:      'bg-blue-500',
  huggingface: 'bg-yellow-500',
  uci:         'bg-green-500',
  github:      'bg-gray-700',
  official:    'bg-purple-500',
  other:       'bg-gray-500',
};

const sourceLabels: Record<string, string> = {
  kaggle:      'Kaggle',
  huggingface: '🤗 HuggingFace',
  uci:         'UCI ML',
  github:      'GitHub',
  official:    'Official',
  other:       'Other',
};

const complexityBadge: Record<string, string> = {
  simple:   'bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-300',
  moderate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/60 dark:text-yellow-300',
  complex:  'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300',
};

export default function IdeaCard({ idea }: IdeaCardProps) {
  const levelColors = {
    beginner:     'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced:     'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const platformIcon = idea.recommendedPlatform === 'local'
    ? <Laptop className="w-5 h-5 text-green-500" />
    : idea.recommendedPlatform === 'colab'
    ? <Cloud className="w-5 h-5 text-blue-500" />
    : <MonitorSmartphone className="w-5 h-5 text-purple-500" />;

  const platformLabel = {
    local: '💻 Jalankan Lokal',
    colab: '☁️ Google Colab (Gratis)',
    both:  '🔀 Local + Colab',
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-4 border-purple-200 dark:border-purple-700"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="inline-block"
        >
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          {idea.title}
        </h2>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${levelColors[idea.level]}`}>
            📊 {idea.level.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            🤖 {idea.category.replace('-', ' ').toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            🏢 {idea.industry.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 text-lg text-center mb-6 leading-relaxed">
        {idea.description}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
          <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
          <p className="font-bold text-gray-800 dark:text-white">{idea.estimatedTime}</p>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
          <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Techniques</p>
          <p className="font-bold text-gray-800 dark:text-white">{idea.techniques.length} skills</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
          <Database className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Datasets</p>
          <p className="font-bold text-gray-800 dark:text-white">{idea.datasetLinks?.length ?? idea.datasets.length} sources</p>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-xl p-4 text-center">
          <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Outcomes</p>
          <p className="font-bold text-gray-800 dark:text-white">{idea.learningOutcomes.length} skills</p>
        </div>
      </div>

      {/* ── NEW: Project Size Estimate ── */}
      {idea.projectSize && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6 bg-gradient-to-r from-slate-50 to-gray-100 dark:from-gray-700 dark:to-gray-700/60 rounded-xl p-5 border border-gray-200 dark:border-gray-600"
        >
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            Estimasi Ukuran Project
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">📦 Dataset</p>
              <p className="font-bold text-sm text-blue-600 dark:text-blue-400">{idea.projectSize.datasetSize}</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">🧠 Model</p>
              <p className="font-bold text-sm text-purple-600 dark:text-purple-400">{idea.projectSize.modelSize}</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">💾 Total Storage</p>
              <p className="font-bold text-sm text-green-600 dark:text-green-400">{idea.projectSize.totalStorage}</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">⏱️ Training</p>
              <p className="font-bold text-sm text-orange-600 dark:text-orange-400">{idea.projectSize.trainingTime}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── NEW: Platform Recommendation ── */}
      {idea.recommendedPlatform && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-6 rounded-xl p-5 border-2 ${
            idea.recommendedPlatform === 'colab'
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
              : idea.recommendedPlatform === 'local'
              ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
              : 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            {platformIcon}
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Platform Rekomendasi:{' '}
              <span className={`font-bold ${
                idea.recommendedPlatform === 'colab' ? 'text-blue-600 dark:text-blue-400'
                : idea.recommendedPlatform === 'local' ? 'text-green-600 dark:text-green-400'
                : 'text-purple-600 dark:text-purple-400'
              }`}>
                {platformLabel[idea.recommendedPlatform]}
              </span>
            </h3>
          </div>
          {idea.platformReason && (
            <p className="text-sm text-gray-600 dark:text-gray-300 ml-8">{idea.platformReason}</p>
          )}
          {idea.recommendedPlatform !== 'local' && (
            <a
              href="https://colab.research.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 ml-8 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Link2 className="w-3 h-3" />
              Buka Google Colab →
            </a>
          )}
        </motion.div>
      )}

      {/* ── NEW: Algorithm Recommendations ── */}
      {idea.algorithms && idea.algorithms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Algoritma yang Direkomendasikan
          </h3>
          <div className="space-y-3">
            {idea.algorithms.map((algo, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-4 border ${
                  idx === 0
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700'
                    : 'bg-gray-50 dark:bg-gray-700/40 border-gray-200 dark:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {idx === 0 && (
                    <span className="text-xs font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                      ⭐ PRIMARY
                    </span>
                  )}
                  <span className="font-bold text-gray-800 dark:text-white text-sm">{algo.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${complexityBadge[algo.complexity]}`}>
                    {algo.complexity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{algo.reason}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Techniques */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Key Techniques:
        </h3>
        <div className="flex flex-wrap gap-2">
          {idea.techniques.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-lg text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── NEW: Dataset Links (clickable) ── */}
      {idea.datasetLinks && idea.datasetLinks.length > 0 ? (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-green-600" />
            Dataset (Link Langsung):
          </h3>
          <div className="space-y-2">
            {idea.datasetLinks.map((ds, idx) => (
              <a
                key={idx}
                href={ds.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-700 rounded-xl p-3 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${sourceColors[ds.source] ?? 'bg-gray-500'}`}>
                    {sourceLabels[ds.source] ?? ds.source}
                  </span>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-green-700 dark:group-hover:text-green-300">
                    {ds.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{ds.size}</span>
                  <Link2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        /* Fallback: show plain dataset names if no links */
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Datasets:
          </h3>
          <div className="flex flex-wrap gap-2">
            {idea.datasets.map((ds, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-lg text-sm"
              >
                {ds}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Learning Outcomes */}
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          What You&apos;ll Learn:
        </h3>
        <ul className="space-y-2">
          {idea.learningOutcomes.map((outcome, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-green-500 mt-1">✓</span>
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
