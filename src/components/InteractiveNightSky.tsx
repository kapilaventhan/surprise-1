import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Moon, X, Heart } from 'lucide-react';

export const InteractiveNightSky: React.FC = () => {
  const [showSpecialStarModal, setShowSpecialStarModal] = useState(false);

  // Generate 25 twinkling background stars with random offsets
  const backgroundStars = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    top: `${Math.floor(Math.random() * 80) + 10}%`,
    left: `${Math.floor(Math.random() * 90) + 5}%`,
    size: Math.floor(Math.random() * 3) + 2,
    delay: `${(Math.random() * 3).toFixed(1)}s`,
  }));

  return (
    <section id="night-sky" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-rose-950/80 text-white overflow-hidden rounded-3xl my-12 max-w-6xl mx-auto shadow-2xl border border-white/10">
      {/* Background Twinkling Stars */}
      {backgroundStars.map((s) => (
        <div
          key={s.id}
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
          }}
          className="absolute rounded-full bg-white opacity-60 animate-ping pointer-events-none"
        />
      ))}

      {/* Crescent Moon Visual */}
      <div className="absolute top-8 right-12 text-amber-200/40 pointer-events-none">
        <Moon className="w-16 h-16 stroke-1 fill-amber-100/10" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Constellation</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-100 mb-3">
          The Magical Night Sky ✨
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-light mb-12">
          Look closely at the celestial sky below. Find the brightest star and click on it.
        </p>

        {/* The Special Bright Star Button */}
        <div className="relative my-12 flex justify-center items-center">
          {/* Glowing Ring Aura */}
          <div className="absolute w-24 h-24 rounded-full bg-amber-400/20 blur-xl animate-pulse" />

          <motion.button
            whileHover={{ scale: 1.3, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSpecialStarModal(true)}
            className="relative z-20 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-white text-slate-950 shadow-2xl shadow-amber-300/80 flex items-center justify-center cursor-pointer border-2 border-amber-200"
            title="Click the brightest star!"
          >
            <Star className="w-9 h-9 fill-amber-400 text-amber-600 animate-spin" style={{ animationDuration: '10s' }} />
          </motion.button>
        </div>

        <p className="text-xs text-amber-200/70 font-serif italic">
          ✨ "Click the golden glowing star above to reveal its secret whisper..."
        </p>
      </div>

      {/* Special Star Modal */}
      <AnimatePresence>
        {showSpecialStarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              className="relative max-w-md w-full bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-8 text-center shadow-2xl border-2 border-amber-400/60 text-white"
            >
              <button
                onClick={() => setShowSpecialStarModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                <Star className="w-8 h-8 fill-amber-300" />
              </div>

              <h3 className="text-xl font-serif font-bold text-amber-300 mb-4">
                A Secret From The Universe ✨
              </h3>

              <blockquote className="text-lg sm:text-xl font-serif italic text-rose-100 leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10 mb-6">
                "Among billions of stars in the universe, you will always be my favorite. ❤️"
              </blockquote>

              <button
                onClick={() => setShowSpecialStarModal(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-400/40 transition-all cursor-pointer"
              >
                Close & Keep Star Shining
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
