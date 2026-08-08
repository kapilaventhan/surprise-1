import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Flame, Flower2, Gift, Stars } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

interface BirthdayCakeProps {
  herName?: string;
}

export const BirthdayCake: React.FC<BirthdayCakeProps> = ({ herName = "My Love" }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blown, setBlown] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);

  const handleMakeAWish = () => {
    if (!candlesLit) return;

    // Step 1: Candles flicker
    setIsFlickering(true);

    setTimeout(() => {
      // Step 2: Flames disappear & candles blow out
      setIsFlickering(false);
      setCandlesLit(false);
      setBlown(true);

      // Step 3, 4, 5: Golden particles, Confetti & Fireworks explosion
      try {
        // Gold explosion burst
        canvasConfetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#ffd700', '#ffb700', '#ffffff', '#ff6fae', '#ff4d6d']
        });

        // Grand Fireworks sequence
        const duration = 3.5 * 1000;
        const animationEnd = Date.now() + duration;

        const interval: any = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          // Left side firework
          canvasConfetti({
            particleCount: 50,
            angle: 60,
            spread: 70,
            origin: { x: 0.1, y: 0.65 },
            colors: ['#ff4d6d', '#ff758f', '#ffd166', '#ffffff', '#c084fc']
          });

          // Right side firework
          canvasConfetti({
            particleCount: 50,
            angle: 120,
            spread: 70,
            origin: { x: 0.9, y: 0.65 },
            colors: ['#ff4d6d', '#ff758f', '#ffd166', '#ffffff', '#c084fc']
          });

          // Center golden sparkles
          canvasConfetti({
            particleCount: 30,
            spread: 120,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ffd700', '#ffffff', '#ff6fae']
          });
        }, 300);
      } catch (err) {
        console.error("Confetti launch error:", err);
      }
    }, 600);
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setBlown(false);
    setIsFlickering(false);
  };

  return (
    <section id="birthday-cake" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Luxury Birthday Ceremony</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white text-glow">
          Romantic Birthday Cake 🎂
        </h2>
        <p className="text-rose-200/80 text-sm sm:text-base max-w-md mx-auto font-light leading-relaxed">
          Close your eyes, hold your wish in your heart, and tap the button below!
        </p>
      </motion.div>

      {/* 3D Glass Showcase & Luxury Cake Enclosure */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-xl mx-auto p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-b from-rose-950/70 via-purple-950/80 to-slate-950/95 border-2 border-rose-300/40 shadow-[0_20px_60px_rgba(255,111,174,0.25)] backdrop-blur-2xl flex flex-col items-center justify-center overflow-hidden group"
      >
        {/* Glass Shine Reflection Across Showcase */}
        <div className="absolute -top-24 -left-24 w-64 h-96 bg-gradient-to-br from-white/15 via-transparent to-transparent rotate-45 pointer-events-none" />

        {/* Floating Sparkles in Background */}
        <div className="absolute top-6 left-6 text-amber-300/60 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute bottom-6 right-6 text-pink-300/60 animate-pulse" style={{ animationDelay: '1.2s' }}>
          <Stars className="w-6 h-6" />
        </div>
        <div className="absolute top-1/2 right-6 text-rose-400/40 animate-pulse" style={{ animationDelay: '0.6s' }}>
          <Flower2 className="w-6 h-6" />
        </div>
        <div className="absolute top-1/3 left-6 text-amber-400/40 animate-pulse" style={{ animationDelay: '1.8s' }}>
          <Flower2 className="w-6 h-6" />
        </div>

        {/* Ambient Candle Glow */}
        <AnimatePresence>
          {candlesLit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="absolute top-8 w-60 h-60 bg-amber-400/25 rounded-full blur-3xl pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* 3D Multi-Tier Cake Visual Assembly */}
        <div className="relative my-6 w-64 sm:w-72 flex flex-col items-center z-10">
          
          {/* Glowing Candles Row */}
          <div className="flex justify-center items-end gap-5 sm:gap-7 mb-1 z-30">
            {[0, 1, 2, 3, 4].map((idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Candle Flame */}
                <AnimatePresence>
                  {candlesLit && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: isFlickering ? [1, 1.4, 0.7, 1.2, 0.9] : [1, 1.2, 1],
                        opacity: 1,
                        y: [0, -3, 0],
                        x: isFlickering ? [-2, 2, -1, 1] : 0
                      }}
                      exit={{ scale: 0, opacity: 0, y: -16 }}
                      transition={{ duration: isFlickering ? 0.2 : 0.4, repeat: Infinity, repeatType: "reverse" }}
                      className="relative w-4 h-6 sm:w-5 sm:h-7 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full shadow-[0_0_15px_rgba(255,215,0,0.9)] -mb-1"
                    >
                      <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xs opacity-80 animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Wisps of Smoke when blown out */}
                {!candlesLit && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0.9, 0], y: -30, x: [0, 6, -6, 2] }}
                    transition={{ duration: 1.5 }}
                    className="w-2 h-7 bg-slate-300/70 rounded-full blur-xs -mb-1"
                  />
                )}

                {/* Candle Body */}
                <div className="w-2.5 sm:w-3 h-10 sm:h-12 bg-gradient-to-b from-amber-100 via-rose-200 to-pink-300 rounded-t-md border-t border-white/90 shadow-md relative overflow-hidden">
                  <div className="absolute inset-x-0 top-2 h-0.5 bg-amber-400/40" />
                  <div className="absolute inset-x-0 top-5 h-0.5 bg-amber-400/40" />
                </div>
              </div>
            ))}
          </div>

          {/* Tier 1: Top Cake Layer */}
          <div className="w-36 sm:w-44 h-12 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 rounded-t-2xl shadow-lg border-b border-amber-300/50 flex items-center justify-center relative overflow-hidden">
            {/* White Cream Dripping Frosting */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/95 rounded-b-full shadow-sm flex justify-around px-2">
              <span className="w-2.5 h-3.5 bg-white rounded-b-full shadow-xs" />
              <span className="w-3 h-4 bg-white rounded-b-full shadow-xs" />
              <span className="w-2.5 h-3.5 bg-white rounded-b-full shadow-xs" />
            </div>
            {/* Rose Flowers & Gold Details */}
            <div className="flex gap-2 z-10 text-rose-500 pt-2">
              <Flower2 className="w-4 h-4 fill-rose-400" />
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-xs" />
              <Flower2 className="w-4 h-4 fill-rose-500" />
            </div>
          </div>

          {/* Tier 2: Middle Cake Layer */}
          <div className="w-48 sm:w-56 h-14 bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 shadow-xl flex items-center justify-center relative overflow-hidden border-t-2 border-amber-300/60 border-b border-amber-300/40">
            {/* Cream Swirls */}
            <div className="absolute top-0 inset-x-0 h-3 bg-rose-100/90 rounded-b-full flex justify-around px-3">
              <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
              <div className="w-2 h-2 rounded-full bg-amber-200 shadow-xs" />
              <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
              <div className="w-2 h-2 rounded-full bg-amber-200 shadow-xs" />
            </div>
            {/* Gold Ribbon Center Line */}
            <div className="w-full h-1.5 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 shadow-sm" />
            <span className="absolute z-10 font-serif text-xs font-bold tracking-widest text-white drop-shadow-md">
              HAPPY BIRTHDAY
            </span>
          </div>

          {/* Tier 3: Base Cake Layer */}
          <div className="w-60 sm:w-68 h-18 bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 rounded-b-3xl shadow-2xl flex flex-col items-center justify-center relative overflow-hidden border-t-2 border-amber-300/70">
            {/* Gold Pearl Trim Line */}
            <div className="absolute top-1 inset-x-0 flex justify-around px-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-sm" />
              ))}
            </div>

            {/* Side Sugar Roses */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-200">
              <Flower2 className="w-5 h-5 fill-rose-300 opacity-90" />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-200">
              <Flower2 className="w-5 h-5 fill-rose-300 opacity-90" />
            </div>

            <span className="font-great-vibes text-2xl sm:text-3xl text-amber-200 text-glow z-10">
              {herName}
            </span>
          </div>

          {/* 3D Gold Platter Plate */}
          <div className="w-68 sm:w-76 h-6 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.6)] mt-1 border-t-2 border-white/80 flex items-center justify-center">
            <div className="w-64 sm:w-72 h-1 bg-amber-400/40 rounded-full" />
          </div>
          {/* Soft Cake Shadow */}
          <div className="w-56 sm:w-64 h-3 bg-black/60 blur-md rounded-full mt-1" />
        </div>

        {/* Revealed Wish Message Banner */}
        <AnimatePresence>
          {blown && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="my-4 p-6 rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white shadow-2xl shadow-rose-500/50 border-2 border-white/40 max-w-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-transparent to-amber-400/20 animate-pulse" />
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-center gap-2 text-amber-300">
                  <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white text-glow">
                    Happy Birthday My Love ❤️
                  </h3>
                  <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <p className="text-sm font-light text-rose-100 leading-relaxed font-poppins">
                  May all your dreams, laughter, and deepest desires come true today, <span className="font-semibold text-white">{herName}</span>! You deserve all the joy and magic in the entire universe. 🌟
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Make A Birthday Wish Button */}
        {candlesLit ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMakeAWish}
            className="mt-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-serif font-semibold text-base sm:text-lg shadow-2xl shadow-rose-500/50 hover:shadow-rose-500/80 transition-all flex items-center gap-3 cursor-pointer group border border-white/30"
          >
            <Heart className="w-5 h-5 text-rose-200 fill-rose-200 group-hover:scale-125 transition-transform" />
            <span>Make A Birthday Wish ❤️</span>
            <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
          </motion.button>
        ) : (
          <button
            onClick={handleRelight}
            className="mt-4 px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 font-medium text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 border border-white/20"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Relight Candles 🕯️</span>
          </button>
        )}
      </motion.div>
    </section>
  );
};


