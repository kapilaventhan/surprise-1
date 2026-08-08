import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Moon, Sparkles, PartyPopper, Film } from 'lucide-react';
import { triggerConfettiBurst, launchMassiveSurpriseFireworks } from '../utils/fireworks';
import { CinemaMode } from './CinemaMode';

interface FinalEndingProps {
  endingLines?: string[];
}

export function FinalEnding({ endingLines }: FinalEndingProps) {
  const [celebrated, setCelebrated] = useState(false);
  const [cinemaActive, setCinemaActive] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  const lines = endingLines || [
    "No matter where life takes us...",
    "No matter how many birthdays we celebrate...",
    "No matter what happens...",
    "I will always choose you.",
    "Happy Birthday, My Love ❤️"
  ];

  // Upward floating hearts state
  const floatingHeartsArray = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.floor(Math.random() * 90) + 5}%`,
    duration: `${Math.floor(Math.random() * 5) + 6}s`,
    delay: `${(Math.random() * 3).toFixed(1)}s`,
    size: Math.floor(Math.random() * 16) + 16,
  }));

  useEffect(() => {
    // Automatically launch fireworks when entering viewport
    const timer = setTimeout(() => {
      triggerConfettiBurst();
      launchMassiveSurpriseFireworks();
      setCelebrated(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleFinalReplay = () => {
    triggerConfettiBurst();
    launchMassiveSurpriseFireworks();
    setCelebrated(true);
  };

  return (
    <section 
      id="final-ending" 
      className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#0b0518] via-[#05020c] to-[#000000]"
    >
      <CinemaMode isActive={cinemaActive} />

      {/* Upward Floating Hearts Animation */}
      {floatingHeartsArray.map((h) => (
        <div
          key={h.id}
          style={{
            left: h.left,
            animationDuration: h.duration,
            animationDelay: h.delay,
            fontSize: `${h.size}px`,
          }}
          className="absolute -bottom-10 opacity-70 text-rose-500 animate-float-up pointer-events-none"
        >
          ❤️
        </div>
      ))}

      {/* Night Sky Atmosphere & Glowing Moon */}
      <div className="absolute top-12 right-12 sm:right-24 w-28 h-28 rounded-full bg-gradient-to-tr from-purple-100 via-pink-100 to-amber-100 opacity-90 shadow-[0_0_80px_rgba(255,255,255,0.9)] flex items-center justify-center pointer-events-none">
        <Moon className="w-16 h-16 text-purple-900/30 fill-current" />
      </div>

      {/* Brighter Stars Backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        
        {/* Cinema Mode Toggle Header */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setCinemaActive(!cinemaActive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              cinemaActive
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50'
                : 'bg-white/10 text-rose-300 hover:bg-white/20 border border-white/20'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{cinemaActive ? 'Exit Cinema Mode' : 'Enter Cinema Mode'}</span>
          </button>
        </div>

        {/* Glowing Heart Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <div className="relative p-6 rounded-full glass-panel border border-[#FF6FAE]/50 shadow-[0_0_50px_rgba(255,111,174,0.8)]">
            <Heart className="w-16 h-16 fill-[#FF6FAE] text-[#FF6FAE] animate-pulse" />
          </div>
        </motion.div>

        {/* Animated Message Lines with Typewriter Fade */}
        <div className="space-y-6 pt-4">
          {lines.map((line, idx) => {
            const isLast = idx === lines.length - 1;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.6, duration: 0.9 }}
              >
                {isLast ? (
                  <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#FF6FAE] text-glow pt-4 leading-tight">
                    {line}
                  </h2>
                ) : (
                  <p className="font-serif text-xl sm:text-3xl text-purple-100 font-light tracking-wide italic">
                    "{line}"
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Ending Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: lines.length * 0.6 + 0.5 }}
          className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleFinalReplay}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6FAE] via-[#C084FC] to-[#FF6FAE] text-white font-semibold text-lg shadow-[0_0_40px_rgba(255,111,174,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <PartyPopper className="w-5 h-5" />
            <span>Celebrate One More Time! 🎉</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3.5 rounded-full glass-panel text-pink-200 text-sm font-medium hover:bg-white/10 transition-colors border border-purple-400/30 cursor-pointer"
          >
            ⬆️ Back to Top
          </button>
        </motion.div>

      </div>
    </section>
  );
}
