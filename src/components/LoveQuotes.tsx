import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { LoveQuote } from '../types';

interface LoveQuotesProps {
  quotes: LoveQuote[];
}

export function LoveQuotes({ quotes }: LoveQuotesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (quotes.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [quotes.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  if (quotes.length === 0) return null;

  const currentQuote = quotes[currentIndex];

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#C084FC]/30 shadow-[0_0_40px_rgba(106,13,173,0.3)] relative text-center">
          
          {/* Quote Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-[#FF6FAE]/20 text-[#FF6FAE]">
              <Quote className="w-8 h-8 fill-current" />
            </div>
          </div>

          {/* Animated Quote Card */}
          <div className="min-h-[140px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="space-y-4 max-w-2xl"
              >
                <p className="font-poppins text-lg sm:text-2xl text-pink-100 font-light italic leading-relaxed">
                  "{currentQuote.quote}"
                </p>
                <p className="font-great-vibes text-2xl sm:text-3xl text-[#FF6FAE]">
                  — {currentQuote.author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls & Indicators */}
          <div className="flex items-center justify-between pt-6 border-t border-purple-500/20 mt-6">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-pink-200 transition-colors cursor-pointer"
              title="Previous Quote"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {quotes.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 bg-[#FF6FAE] shadow-[0_0_10px_#FF6FAE]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-pink-200 transition-colors cursor-pointer"
              title="Next Quote"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
