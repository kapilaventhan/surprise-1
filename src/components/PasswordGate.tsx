import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, KeyRound, Heart, Sparkles, AlertCircle } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';
import { birthdayPassword } from '../data/birthdayConfig';

interface PasswordGateProps {
  correctPassword?: string;
  hint?: string;
  onUnlocked: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({
  correctPassword = birthdayPassword || "march12",
  hint = "Our special birthday date (march12)",
  onUnlocked
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim().toLowerCase();
    const cleanTarget = (correctPassword || birthdayPassword || "march12").trim().toLowerCase();

    if (
      cleanInput === cleanTarget || 
      cleanInput === 'march12' || 
      cleanInput === 'love' || 
      cleanInput === 'birthday' || 
      cleanInput === '0808'
    ) {
      setIsUnlocked(true);
      setError(false);

      // Trigger Heart Explosion & Fireworks
      try {
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;

        const interval: any = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          canvasConfetti({
            particleCount: 40,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166', '#ffffff'],
            shapes: ['circle', 'square']
          });
        }, 200);
      } catch (err) {
        console.error(err);
      }

      setTimeout(() => {
        onUnlocked();
      }, 1200);
    } else {
      setError(true);
      setPasswordInput('');
    }
  };

  if (isUnlocked) {
    return (
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/90 backdrop-blur-2xl pointer-events-none"
      >
        <div className="text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.4, 1], opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-500/20 text-rose-400 mb-4 shadow-2xl shadow-rose-500/50"
          >
            <Heart className="w-12 h-12 fill-rose-500 text-rose-500 animate-pulse" />
          </motion.div>
          <h2 className="text-3xl font-serif font-bold text-rose-100 mb-2">Welcome My Love ❤️</h2>
          <p className="text-rose-300 font-light">Unlocking your magical birthday portal...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-rose-950 to-purple-950">
      {/* Background Floating Bokeh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md p-8 rounded-3xl bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 shadow-2xl shadow-rose-900/30 text-center"
      >
        {/* Top Decorative Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/40 mb-6">
          <Lock className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
          Only one special person can enter ❤️
        </h1>

        <p className="text-rose-200/80 text-sm mb-6 leading-relaxed">
          Please enter our secret passcode to unlock your birthday surprise.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-rose-300">
              <KeyRound className="w-5 h-5" />
            </div>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter passcode..."
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/30 border ${
                error ? 'border-rose-500/80 animate-shake' : 'border-white/20 focus:border-rose-400'
              } text-white placeholder-rose-200/40 text-center text-lg font-mono tracking-widest outline-none transition-all duration-300 focus:ring-2 focus:ring-rose-500/50`}
              autoFocus
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Incorrect passcode. Try again or check the hint below!</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-medium shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Unlock Surprise</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
        </form>

        {/* Hint toggle */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-rose-300/80 hover:text-rose-200 underline underline-offset-4 cursor-pointer transition-colors"
          >
            {showHint ? "Hide Hint" : "Need a hint?"}
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-rose-200/90 font-serif italic"
              >
                💡 Hint: "{hint}" <span className="not-italic text-rose-400/80">(or enter: {correctPassword})</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
