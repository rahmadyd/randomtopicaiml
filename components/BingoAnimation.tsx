'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sampleIdeas = [
  'Real-time Emotion Detection 😊',
  'Stock Price Prediction 📈',
  'Sentiment Analysis Tool 💬',
  'Object Detection System 👁️',
  'Recommendation Engine ⭐',
  'Speech Recognition App 🎤',
  'Image Classification 🖼️',
  'Chatbot Development 🤖',
  'Fraud Detection System 🔍',
  'Time Series Forecasting ⏰',
];

export default function BingoAnimation() {
  const [currentIdea, setCurrentIdea] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdea((prev) => (prev + 1) % sampleIdeas.length);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl p-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">
          🎰 Generating Your Perfect Project... 🎰
        </h3>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 min-h-[80px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdea}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="text-3xl font-bold text-white"
            >
              {sampleIdeas[currentIdea]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
