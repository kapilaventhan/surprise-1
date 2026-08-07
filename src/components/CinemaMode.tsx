import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Sparkles } from 'lucide-react';

interface CinemaModeProps {
  isActive: boolean;
  onFinished?: () => void;
}

export const CinemaMode: React.FC<CinemaModeProps> = ({ isActive }) => {
  const [showTitleCard, setShowTitleCard] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowTitleCard(true);
      const timer = setTimeout(() => {
        setShowTitleCard(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      {/* Top Black Cinematic Letterbox Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 1 }}
        className="fixed inset-x-0 top-0 h-12 sm:h-16 bg-black z-40 border-b border-white/10 flex items-center justify-between px-6 text-white/60 text-xs font-mono tracking-widest pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-rose-500 animate-pulse" />
          <span className="hidden sm:inline">CINEMA MODE ENABLED</span>
        </div>
        <div>SCENE: FOREVER & ALWAYS</div>
      </motion.div>

      {/* Bottom Black Cinematic Letterbox Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ duration: 1 }}
        className="fixed inset-x-0 bottom-0 h-12 sm:h-16 bg-black z-40 border-t border-white/10 flex items-center justify-between px-6 text-white/60 text-xs font-mono tracking-widest pointer-events-none"
      >
        <div>DIRECTOR: FOREVER YOURS</div>
        <div className="text-rose-400 font-bold">4K HDR • SURROUND LOVE</div>
      </motion.div>

      {/* Intro Title Card Banner */}
      <AnimatePresence>
        {showTitleCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl pointer-events-none"
          >
            <div className="text-center space-y-4 max-w-xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30">
                <Sparkles className="w-4 h-4" />
                <span>Feature Presentation</span>
              </span>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-wide leading-tight">
                A Film Dedicated To My Favorite Person ❤️
              </h1>
              <p className="text-xs sm:text-sm font-mono text-rose-300 tracking-widest uppercase">
                Original Motion Picture • Special Birthday Edition
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
