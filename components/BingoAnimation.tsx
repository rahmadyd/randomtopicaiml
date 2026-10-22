'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2 } from 'lucide-react';

const sampleIdeas = [
  'Real-time Emotion Detection 😊',
  'Stock Price Prediction with LSTM 📈',
  'Medical Pill Identification with MobileNet 💊',
  'Customer Churn Prediction with XGBoost 🔍',
  'Automated Essay Scoring with Transformers 📚',
  'Autonomous Driving Lane Detection 🚗',
  'Music Recommendation with Collaborative Filtering 🎵',
  'Defect Detection in Manufacturing Lines 🏭',
  'Generative Art & Style Transfer 🎨',
  'Real-time Indonesian Speech Recognition 🎙️',
];

export default function BingoAnimation() {
  const [currentIdea, setCurrentIdea] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdea((prev) => (prev + 1) % sampleIdeas.length);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ios-glass rounded-[32px] p-8 text-center relative overflow-hidden shadow-2xl">
      {/* Background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/15 to-pink-500/10 animate-pulse pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ios-glass-pill text-xs text-indigo-300 font-medium">
          <Wand2 className="w-3.5 h-3.5 animate-spin" />
          <span>Groq AI Neural Synthesis</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Merumuskan Ide Proyek Terbaik...
        </h3>

        {/* Ticker Box */}
        <div className="ios-glass-card rounded-2xl p-6 min-h-[90px] flex items-center justify-center overflow-hidden border border-white/15">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdea}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className="text-base sm:text-xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent"
            >
              {sampleIdeas[currentIdea]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* iOS-style loading dots */}
        <div className="flex justify-center gap-2 pt-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
