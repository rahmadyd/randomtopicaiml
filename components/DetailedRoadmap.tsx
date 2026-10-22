'use client';

import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, CheckCircle2, Milestone } from 'lucide-react';
import type { Roadmap } from '@/types';

interface DetailedRoadmapProps {
  roadmap: Roadmap;
}

export default function DetailedRoadmap({ roadmap }: DetailedRoadmapProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="ios-glass rounded-[32px] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-8 pb-5 border-b border-white/10">
        <div className="p-2.5 rounded-2xl ios-glass-pill text-indigo-400">
          <Milestone className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Roadmap Eksekusi Langkah-demi-Langkah
          </h2>
          <p className="text-xs sm:text-sm text-white/50">
            Panduan fase pengerjaan proyek dari tahap setup hingga deployment
          </p>
        </div>
      </div>

      {/* Timeline Phases */}
      <div className="space-y-6 mb-10">
        {roadmap.phases.map((phase, idx) => (
          <motion.div
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * idx }}
            className="ios-glass-card rounded-2xl p-5 sm:p-6 transition-colors"
          >
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {phase.name}
                </h3>
                <span className="text-xs text-indigo-300 font-medium">
                  ⏳ {phase.duration}
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 pl-2 sm:pl-11">
              {phase.tasks.map((task, taskIdx) => (
                <li
                  key={taskIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Resources & Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resources */}
        <div className="ios-glass-card rounded-2xl p-5 sm:p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm sm:text-base">
            <BookOpen className="w-4 h-4 text-sky-400" />
            Rujukan & Sumber Belajar:
          </h3>
          <ul className="space-y-2.5">
            {roadmap.resources.map((resource, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 ios-glass-subtle rounded-xl p-3"
              >
                <span className="text-sky-400">📖</span>
                <span>{resource}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tips */}
        <div className="ios-glass-card rounded-2xl p-5 sm:p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm sm:text-base">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Tips Sukses Pengembangan:
          </h3>
          <ul className="space-y-2.5">
            {roadmap.tips.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 ios-glass-subtle rounded-xl p-3"
              >
                <span className="text-amber-400">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
