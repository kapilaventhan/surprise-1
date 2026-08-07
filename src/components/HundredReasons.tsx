import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft, ChevronRight, Pause, Play, RefreshCw, Sparkles, List } from 'lucide-react';

interface HundredReasonsProps {
  reasons?: string[];
}

export const HundredReasons: React.FC<HundredReasonsProps> = ({ reasons = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showGridModal, setShowGridModal] = useState(false);

  useEffect(() => {
    if (!isPlaying || !reasons || reasons.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reasons.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying, reasons]);

  if (!reasons || reasons.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setCurrentIndex(randomIndex);
  };

  return (
    <section id="hundred-reasons" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20 mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-500" />
          <span>100 Reasons I Love You</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100">
          Why You Are My Whole World ❤️
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto">
          Updating every 3 seconds with endless ways you light up my life.
        </p>
      </div>

      {/* Main Carousel Card */}
      <div className="relative bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-500/10 dark:from-rose-950/40 dark:to-purple-950/40 rounded-3xl p-8 sm:p-12 border border-rose-500/20 shadow-2xl backdrop-blur-md text-center">
        {/* Top Counter Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-rose-500/10 text-xs font-bold uppercase tracking-wider text-rose-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Reason #{currentIndex + 1}</span>
          </div>
          <div>
            <span>{currentIndex + 1} of {reasons.length}</span>
          </div>
        </div>

        {/* Fading Reason Text */}
        <div className="min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <p className="text-xl sm:text-2xl font-serif font-medium text-slate-800 dark:text-slate-100 leading-relaxed italic">
                "{reasons[currentIndex]}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="mt-8 pt-6 border-t border-rose-500/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white shadow-md transition-all cursor-pointer"
            title="Previous Reason"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-500 text-white font-medium text-xs shadow-md hover:bg-rose-600 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Auto' : 'Play Auto'}</span>
            </button>

            <button
              onClick={handleRandom}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white shadow-md transition-all cursor-pointer"
              title="Random Reason"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowGridModal(true)}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white shadow-md transition-all cursor-pointer"
              title="View All 100 Reasons"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white shadow-md transition-all cursor-pointer"
            title="Next Reason"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid Modal to browse all 100 reasons */}
      <AnimatePresence>
        {showGridModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full max-h-[80vh] bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-rose-500/30 flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <span>All 100 Reasons I Love You</span>
                </h3>
                <button
                  onClick={() => setShowGridModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="overflow-y-auto p-2 my-4 space-y-3 pr-2">
                {reasons.map((reason, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowGridModal(false);
                    }}
                    className={`p-3.5 rounded-2xl border text-sm font-serif cursor-pointer transition-all ${
                      idx === currentIndex
                        ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-rose-400'
                    }`}
                  >
                    <span className="font-bold mr-2">#{idx + 1}.</span>
                    <span>"{reason}"</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
