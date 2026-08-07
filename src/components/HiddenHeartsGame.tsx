import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trophy, Sparkles, X, Gift } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

interface HiddenHeartsGameProps {
  notes?: string[];
}

export const HiddenHeartsGame: React.FC<HiddenHeartsGameProps> = ({ notes = [] }) => {
  const [collected, setCollected] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [showBonusUnlocked, setShowBonusUnlocked] = useState(false);

  // Position coordinates for 10 hearts placed randomly across relative screen zones
  const heartPositions = [
    { top: '15%', left: '8%' },
    { top: '28%', right: '10%' },
    { top: '42%', left: '12%' },
    { top: '55%', right: '14%' },
    { top: '68%', left: '6%' },
    { top: '78%', right: '8%' },
    { top: '88%', left: '15%' },
    { top: '35%', left: '88%' },
    { top: '62%', left: '85%' },
    { top: '95%', right: '12%' },
  ];

  const handleCollect = (index: number) => {
    if (!collected.includes(index)) {
      const nextCollected = [...collected, index];
      setCollected(nextCollected);

      const noteText = notes[index] || `Secret Love Note #${index + 1}: You are deeply loved! ❤️`;
      setActiveMessage(noteText);

      // Trigger sparkle burst
      try {
        canvasConfetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.5 },
          colors: ['#ff4d6d', '#ff758f', '#ffffff']
        });
      } catch (e) {
        console.error(e);
      }

      // Check if all 10 are collected
      if (nextCollected.length === 10) {
        setTimeout(() => {
          setShowBonusUnlocked(true);
          try {
            canvasConfetti({
              particleCount: 100,
              spread: 100,
              origin: { y: 0.5 },
              colors: ['#ff4d6d', '#FFD700', '#ffffff', '#ff758f']
            });
          } catch (e) {
            console.error(e);
          }
        }, 1500);
      }
    }
  };

  return (
    <>
      {/* Sticky Top-Right Badge Tracker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-20 right-4 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-full shadow-xl border border-rose-500/30 flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400"
      >
        <Heart className={`w-4 h-4 fill-rose-500 text-rose-500 ${collected.length === 10 ? 'animate-bounce' : 'animate-pulse'}`} />
        <span>Hearts Found: {collected.length} / 10</span>
      </motion.div>

      {/* 10 Hidden Tiny Glowing Hearts Scatter */}
      {heartPositions.map((pos, idx) => {
        const isFound = collected.includes(idx);
        return (
          <button
            key={idx}
            onClick={() => handleCollect(idx)}
            style={{ position: 'absolute', ...pos }}
            className={`z-30 p-2 rounded-full transition-all duration-300 cursor-pointer ${
              isFound
                ? 'opacity-30 scale-75 bg-slate-500/20 text-slate-400'
                : 'opacity-80 hover:opacity-100 hover:scale-125 text-rose-500 animate-pulse hover:shadow-lg hover:shadow-rose-500/50'
            }`}
            title={isFound ? "Heart already collected" : "Click to collect hidden heart!"}
          >
            <Heart className={`w-5 h-5 ${isFound ? 'fill-slate-400' : 'fill-rose-500 text-rose-500'}`} />
          </button>
        );
      })}

      {/* Message Modal when a Heart is Found */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-6 text-center shadow-2xl border border-rose-500/40"
            >
              <button
                onClick={() => setActiveMessage(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
                <Heart className="w-7 h-7 fill-rose-500" />
              </div>

              <h4 className="text-lg font-serif font-bold text-slate-800 dark:text-slate-100 mb-2">
                Hidden Love Heart Revealed! 💖
              </h4>
              <p className="text-sm font-serif italic text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-500/20 leading-relaxed">
                "{activeMessage}"
              </p>

              <button
                onClick={() => setActiveMessage(null)}
                className="mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Keep Searching! ({collected.length}/10)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bonus Reward Modal when all 10 are unlocked */}
      <AnimatePresence>
        {showBonusUnlocked && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-lg w-full bg-gradient-to-br from-rose-950 via-slate-900 to-purple-950 rounded-3xl p-8 text-center shadow-2xl border-2 border-amber-400 text-white"
            >
              <button
                onClick={() => setShowBonusUnlocked(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/30">
                <Trophy className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-amber-300 mb-2">
                👑 Secret Love Vault Unlocked!
              </h3>
              <p className="text-sm text-rose-200/90 mb-6 leading-relaxed">
                You found all 10 hidden glowing hearts! You hold the master key to my entire heart forever.
              </p>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-left space-y-2 mb-6">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Special VIP Reward: Lifetime Love Guarantee</span>
                </div>
                <p className="text-xs text-rose-100 italic font-serif">
                  "This official certificate grants you infinite kisses, unlimited warm hugs, priority response to every text, and a lifetime of happiness."
                </p>
              </div>

              <button
                onClick={() => setShowBonusUnlocked(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-lg hover:shadow-amber-400/40 transition-all cursor-pointer"
              >
                Claim My Lifetime Love ❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
