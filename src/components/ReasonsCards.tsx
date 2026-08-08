import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Sun, Eye, Music, Shield, Compass, Key, Brain, Smile, Zap, Crown } from 'lucide-react';
import { ReasonCard } from '../types';

interface ReasonsCardsProps {
  reasons: ReasonCard[];
}

const iconMap: Record<string, ReactNode> = {
  Sparkles: <Sparkles className="w-8 h-8 text-[#FF6FAE]" />,
  Heart: <Heart className="w-8 h-8 text-[#FF6FAE] fill-[#FF6FAE]" />,
  Sun: <Sun className="w-8 h-8 text-amber-300" />,
  Eye: <Eye className="w-8 h-8 text-pink-300" />,
  Music: <Music className="w-8 h-8 text-purple-300" />,
  Shield: <Shield className="w-8 h-8 text-[#C084FC]" />,
  Compass: <Compass className="w-8 h-8 text-rose-300" />,
  Key: <Key className="w-8 h-8 text-amber-200" />,
  Brain: <Brain className="w-8 h-8 text-pink-200" />,
  Smile: <Smile className="w-8 h-8 text-[#FF6FAE]" />,
  Zap: <Zap className="w-8 h-8 text-yellow-300" />,
  Crown: <Crown className="w-8 h-8 text-amber-400" />,
};

export function ReasonsCards({ reasons }: ReasonsCardsProps) {
  const [flippedMap, setFlippedMap] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-[#FF6FAE] text-sm font-semibold tracking-widest uppercase">
            <Heart className="w-4 h-4 fill-[#FF6FAE]" />
            <span>Counting the Ways</span>
          </div>
          <h2 className="font-great-vibes text-5xl sm:text-6xl text-white text-glow">
            Reasons Why I Love You
          </h2>
          <p className="text-purple-200/80 text-sm max-w-md mx-auto">
            Tap or hover over each card to reveal what makes you so endlessly special
          </p>
        </motion.div>

        {/* 12 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reasons.map((card, idx) => {
            const isFlipped = flippedMap[card.id];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="perspective-1000 h-64 cursor-pointer"
                onClick={() => toggleFlip(card.id)}
              >
                <div
                  className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl glass-card border border-[#FF6FAE]/30 p-6 flex flex-col items-center justify-center text-center backface-hidden shadow-xl hover:border-[#FF6FAE] transition-colors group">
                    <div className="p-4 rounded-full bg-white/5 border border-pink-500/20 mb-4 group-hover:scale-110 transition-transform">
                      {iconMap[card.icon] || <Heart className="w-8 h-8 text-[#FF6FAE]" />}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-pink-300/80 mb-1">
                      Reason #{idx + 1}
                    </span>
                    <h3 className="font-great-vibes text-3xl text-white text-glow">
                      {card.title}
                    </h3>
                    <span className="text-[10px] text-pink-300/60 uppercase tracking-widest mt-4">
                      Tap to flip ➔
                    </span>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl glass-panel border-2 border-[#FF6FAE] p-6 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 shadow-2xl bg-gradient-to-b from-[#1a0b2e] to-[#0b0518]">
                    <Heart className="w-6 h-6 fill-[#FF6FAE] text-[#FF6FAE] mb-2" />
                    <h4 className="font-great-vibes text-2xl text-pink-200 mb-2">
                      {card.title}
                    </h4>
                    <p className="text-xs text-purple-100 leading-relaxed font-light">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
