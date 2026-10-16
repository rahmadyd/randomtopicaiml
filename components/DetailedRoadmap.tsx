'use client';

import { motion } from 'framer-motion';
import { MapPin, BookOpen, Lightbulb, CheckCircle } from 'lucide-react';
import type { Roadmap } from '@/types';

interface DetailedRoadmapProps {
  roadmap: Roadmap;
}

export default function DetailedRoadmap({ roadmap }: DetailedRoadmapProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
        <MapPin className="w-8 h-8 text-purple-600" />
        Detailed Roadmap
      </h2>

      {/* Phases */}
      <div className="space-y-6 mb-8">
        {roadmap.phases.map((phase, idx) => (
          <motion.div
            key={idx}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * idx }}
            className="border-l-4 border-purple-500 pl-6 py-2"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {phase.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {phase.duration}
                </p>
              </div>
            </div>

            <ul className="space-y-2 ml-11">
              {phase.tasks.map((task, taskIdx) => (
                <li
                  key={taskIdx}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Resources */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Recommended Resources:
        </h3>
        <ul className="space-y-2">
          {roadmap.resources.map((resource, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3"
            >
              <span className="text-blue-500">📚</span>
              <span>{resource}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tips */}
      <div>
        <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Pro Tips:
        </h3>
        <ul className="space-y-2">
          {roadmap.tips.map((tip, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-gray-700 dark:text-gray-300 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3"
            >
              <span className="text-yellow-500">💡</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
