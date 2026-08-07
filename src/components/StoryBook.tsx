import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Heart, Bookmark } from 'lucide-react';
import { StorybookPage } from '../types';

interface StoryBookProps {
  pages?: StorybookPage[];
}

export const StoryBook: React.FC<StoryBookProps> = ({ pages = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);

  if (!pages || pages.length === 0) return null;

  const page = pages[currentPage];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <section id="storybook" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Interactive Story Book</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100">
          Our Love Story Chapters ❤️
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Turn the pages of our favorite moments together.
        </p>
      </div>

      {/* Book Frame */}
      <div className="relative max-w-3xl mx-auto bg-amber-50/90 dark:bg-slate-900/90 rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-200/50 dark:border-rose-500/20 backdrop-blur-md">
        {/* Book Spine Center Marker */}
        <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 w-px bg-amber-200/60 dark:bg-slate-800/80 shadow-sm pointer-events-none" />

        {/* Page Header Counter */}
        <div className="flex items-center justify-between border-b border-amber-200/60 dark:border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2 text-rose-500 text-xs font-serif italic">
            <Bookmark className="w-4 h-4 fill-rose-500" />
            <span>{page.date || `Chapter ${currentPage + 1}`}</span>
          </div>
          <div className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400">
            Page {currentPage + 1} of {pages.length}
          </div>
        </div>

        {/* Page Content Animated Flip */}
        <div className="relative min-h-[360px] sm:min-h-[320px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, rotateY: -20, scale: 0.98 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              {/* Image side */}
              {page.imageUrl && (
                <div className="md:col-span-5 relative group overflow-hidden rounded-2xl shadow-lg border border-white/40 dark:border-slate-800">
                  <img
                    src={page.imageUrl}
                    alt={page.title}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 text-white text-xs font-serif flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Special Memory</span>
                  </div>
                </div>
              )}

              {/* Text content side */}
              <div className={page.imageUrl ? "md:col-span-7" : "md:col-span-12"}>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1 block">
                  {page.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">
                  {page.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-serif italic border-l-2 border-rose-400/50 pl-4 py-1">
                  "{page.content}"
                </p>

                <div className="mt-6 flex items-center gap-2 text-rose-500/80 text-xs font-medium">
                  <Heart className="w-4 h-4 fill-rose-500/30 text-rose-500" />
                  <span>Always in my heart</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between border-t border-amber-200/60 dark:border-slate-800 pt-6 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              currentPage === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white shadow-sm cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Chapter</span>
          </button>

          {/* Dots Indicator */}
          <div className="hidden sm:flex items-center gap-1.5">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentPage
                    ? 'w-6 bg-rose-500'
                    : 'bg-slate-300 dark:bg-slate-700 hover:bg-rose-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              currentPage === pages.length - 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-500/30 cursor-pointer'
            }`}
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
