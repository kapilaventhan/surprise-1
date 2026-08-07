import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  herName: string;
  tagline: string;
  onBeginJourney: () => void;
  onOpenSettings: () => void;
}

export function HeroSection({ herName, tagline, onBeginJourney, onOpenSettings }: HeroSectionProps) {
  const [typedText, setTypedText] = useState("");
  const fullText = tagline || "My favorite person in the whole world.";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    setTypedText("");
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [fullText]);

  const handleBegin = () => {
    onBeginJourney();
    // Scroll to Countdown timer section
    const countdownSec = document.getElementById('countdown-section');
    if (countdownSec) {
      countdownSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-12 pb-20 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FF6FAE]/20 to-[#6A0DAD]/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto z-10 space-y-6"
      >
        {/* Floating Tag */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#FF6FAE]/40 text-pink-200 text-sm font-medium tracking-wider shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-[#FF6FAE] animate-spin" style={{ animationDuration: '4s' }} />
          <span>A Special Love Story</span>
          <Heart className="w-4 h-4 fill-[#FF6FAE] text-[#FF6FAE] animate-bounce" />
        </motion.div>

        {/* Main Animated Heading */}
        <h1 className="font-great-vibes text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-100 to-purple-300 text-glow py-2">
          Happy Birthday <span className="inline-block text-[#FF6FAE] animate-pulse">❤️</span>
          <br />
          <span className="block mt-2 text-white drop-shadow-[0_0_35px_rgba(255,111,174,0.8)]">
            {herName}
          </span>
        </h1>

        {/* Typewriter Subtitle */}
        <div className="min-h-[2.5rem] flex items-center justify-center">
          <p className="text-xl sm:text-2xl md:text-3xl text-purple-200/90 font-light tracking-wide italic font-poppins">
            "{typedText}"
            <span className="inline-block w-0.5 h-6 ml-1 bg-[#FF6FAE] animate-pulse" />
          </p>
        </div>

        {/* Glowing "Begin the Journey" Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleBegin}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6FAE] via-[#C084FC] to-[#FF6FAE] text-white font-semibold text-lg shadow-[0_0_30px_rgba(255,111,174,0.6)] hover:shadow-[0_0_45px_rgba(255,111,174,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <span>Begin the Journey</span>
            <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform duration-300" />
          </button>

          <button
            onClick={onOpenSettings}
            className="px-6 py-3.5 rounded-full glass-panel hover:bg-white/10 text-pink-200/90 text-sm font-medium transition-all duration-300 border border-purple-400/30 cursor-pointer"
          >
            ✨ Personalize Site
          </button>
        </motion.div>
      </motion.div>

      {/* Downward Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer text-pink-200/70 hover:text-pink-100 transition-colors"
        onClick={handleBegin}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs uppercase tracking-widest text-pink-300/80">Scroll Down</span>
          <ChevronDown className="w-6 h-6 text-[#FF6FAE]" />
        </div>
      </motion.div>
    </section>
  );
}
