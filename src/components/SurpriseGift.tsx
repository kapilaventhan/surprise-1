import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Sparkles, X } from 'lucide-react';
import { launchMassiveSurpriseFireworks, triggerConfettiBurst } from '../utils/fireworks';

export function SurpriseGift() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSurprise = () => {
    setIsOpen(true);
    triggerConfettiBurst();
    launchMassiveSurpriseFireworks();
  };

  return (
    <section className="py-20 px-4 relative z-10 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Glowing Gift Call-To-Action Button */}
          <button
            onClick={handleOpenSurprise}
            className="group relative inline-flex items-center gap-4 px-10 py-6 rounded-full bg-gradient-to-r from-[#FF6FAE] via-[#C084FC] to-[#FF1493] text-white font-bold text-xl sm:text-2xl shadow-[0_0_50px_rgba(255,111,174,0.7)] hover:shadow-[0_0_70px_rgba(255,111,174,1)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <Gift className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            <span>🎁 Open My Final Surprise</span>
            <Sparkles className="w-6 h-6 text-yellow-200 animate-spin" style={{ animationDuration: '3s' }} />
          </button>
        </motion.div>

        {/* Fullscreen Surprise Overlay Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            >
              {/* Floating Background Heart Rain Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-pink-500 opacity-60 animate-bounce"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      fontSize: `${Math.random() * 24 + 14}px`,
                      animationDuration: `${Math.random() * 3 + 2}s`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  >
                    ❤️
                  </div>
                ))}
              </div>

              {/* Main Surprise Card */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="glass-panel rounded-3xl p-8 sm:p-14 max-w-2xl w-full border-2 border-[#FF6FAE] shadow-[0_0_80px_rgba(255,111,174,0.9)] text-center relative z-10 space-y-6"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="heart-beat inline-block text-7xl mb-2">
                  💖
                </div>

                <h2 className="font-great-vibes text-4xl sm:text-6xl text-white text-glow leading-tight">
                  You are the best gift life has ever given me.
                </h2>

                <p className="font-great-vibes text-5xl sm:text-7xl text-[#FF6FAE] text-glow py-2">
                  Happy Birthday ❤️
                </p>

                <p className="font-poppins text-xl sm:text-2xl text-pink-200 tracking-wider uppercase font-semibold">
                  I Love You Forever.
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      triggerConfettiBurst();
                      launchMassiveSurpriseFireworks();
                    }}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#C084FC] text-white font-semibold shadow-xl hover:scale-105 transition-transform"
                  >
                    More Fireworks! 🎆
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
