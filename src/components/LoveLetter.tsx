import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, RefreshCw } from 'lucide-react';

interface LoveLetterProps {
  letterText: string;
  yourName: string;
}

export function LoveLetter({ letterText, yourName }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Default letter text if not customized
  const fullText = letterText || `Happy Birthday, My Love ❤️

Every day with you becomes one of my favorite memories.

Your smile makes ordinary moments feel extraordinary.

Thank you for your kindness, your laughter, your support, and for simply being you.

I hope this small surprise reminds you how deeply you are loved and appreciated.

May this birthday bring you happiness, success, good health, and countless beautiful moments.

I look forward to making many more memories together.

Happy Birthday once again.

With all my love,`;

  useEffect(() => {
    if (isOpen) {
      setIsTyping(true);
      setDisplayedText("");
      let i = 0;
      const speed = 25; // Smooth handwriting typing speed

      const timer = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, speed);

      return () => clearInterval(timer);
    } else {
      setDisplayedText("");
      setIsTyping(false);
    }
  }, [isOpen, fullText]);

  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 text-[#FF6FAE] text-sm font-semibold tracking-widest uppercase">
            <Mail className="w-4 h-4" />
            <span>A Secret Message For You</span>
          </div>
          <h2 className="font-great-vibes text-5xl sm:text-6xl text-white text-glow">
            Love Letter
          </h2>
          <p className="text-purple-200/80 text-sm">
            Tap the envelope to unlock what's inside my heart
          </p>
        </motion.div>

        {/* Envelope Container */}
        <div className="flex justify-center pt-4">
          {!isOpen ? (
            /* Closed Envelope Card */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, translateY: -8 }}
              onClick={() => setIsOpen(true)}
              className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-[#FF6FAE]/40 hover:border-[#FF6FAE] shadow-[0_0_40px_rgba(255,111,174,0.3)] cursor-pointer relative group max-w-lg w-full flex flex-col items-center justify-center min-h-[260px] transition-all duration-300"
            >
              {/* Glowing Heart Seal */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF6FAE] to-[#C084FC] flex items-center justify-center shadow-[0_0_25px_rgba(255,111,174,0.8)] group-hover:scale-110 transition-transform mb-4">
                <Heart className="w-10 h-10 fill-white text-white heart-beat" />
              </div>

              <span className="font-great-vibes text-3xl text-pink-200 group-hover:text-white transition-colors">
                Open My Love Letter
              </span>
              <span className="text-xs text-pink-300/70 mt-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6FAE]" /> Click to unfold
              </span>
            </motion.div>
          ) : (
            /* Open Letter Display */
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#FF6FAE]/50 shadow-[0_0_50px_rgba(106,13,173,0.5)] max-w-2xl w-full text-left relative bg-gradient-to-b from-[#1a0b2e]/80 to-[#120422]/90 backdrop-blur-xl"
              >
                {/* Decorative Heart Accent */}
                <div className="flex justify-between items-center pb-6 border-b border-pink-500/20 mb-6">
                  <div className="flex items-center gap-2">
                    <Heart className="w-6 h-6 fill-[#FF6FAE] text-[#FF6FAE]" />
                    <span className="font-great-vibes text-2xl text-pink-300">To My Dearest</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Fold Letter
                  </button>
                </div>

                {/* Animated Handwritten Letter Body */}
                <div className="font-handwriting text-2xl sm:text-3xl text-pink-100 leading-relaxed whitespace-pre-line tracking-wide min-h-[280px]">
                  {displayedText}
                  {isTyping && <span className="inline-block w-2 h-6 ml-1 bg-[#FF6FAE] animate-pulse" />}
                </div>

                {/* Handwritten Signature */}
                <div className="mt-8 pt-4 border-t border-pink-500/20 text-right font-handwriting text-3xl text-[#FF6FAE]">
                  {yourName} ❤️
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
