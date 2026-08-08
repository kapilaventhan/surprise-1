import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 800); // Allow fade animation to finish
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0b0518] text-white select-none px-4"
        >
          {/* Subtle glowing dark background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b2e] via-[#0b0518] to-[#120422] pointer-events-none" />

          {/* Glowing heart pulse container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center mb-8"
          >
            {/* Glowing aura ring */}
            <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#C084FC] blur-2xl opacity-60 animate-pulse" />
            
            {/* Beating Heart Icon */}
            <div className="heart-beat relative z-10 text-[#FF6FAE]">
              <Heart className="w-20 h-20 fill-[#FF6FAE] stroke-rose-300 drop-shadow-[0_0_20px_rgba(255,111,174,0.9)]" />
            </div>
          </motion.div>

          {/* Loading message */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-great-vibes text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-100 to-rose-200 text-center tracking-wide text-glow"
          >
            A little surprise is waiting...
          </motion.h2>

          {/* Soft loading bar indicator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "160px" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-[#FF6FAE] via-[#C084FC] to-[#FF6FAE] rounded-full mt-6 shadow-[0_0_12px_rgba(255,111,174,0.8)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
