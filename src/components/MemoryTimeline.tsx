import { motion } from 'motion/react';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import { MemoryItem } from '../types';

interface MemoryTimelineProps {
  memories: MemoryItem[];
}

export function MemoryTimeline({ memories }: MemoryTimelineProps) {
  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[#FF6FAE] text-sm font-semibold tracking-widest uppercase">
            <Calendar className="w-4 h-4" />
            <span>Our Precious Journey</span>
          </div>
          <h2 className="font-great-vibes text-5xl sm:text-6xl text-white text-glow">
            Memory Timeline
          </h2>
          <p className="text-purple-200/80 text-sm max-w-md mx-auto">
            A walkthrough of the milestones that brought us closer every single day
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6FAE] via-[#C084FC] to-[#6A0DAD] -translate-x-1/2 shadow-[0_0_12px_rgba(255,111,174,0.8)]" />

          {/* Timeline Memory Cards */}
          <div className="space-y-12">
            {memories.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF6FAE] to-[#C084FC] flex items-center justify-center border-4 border-[#0b0518] shadow-[0_0_15px_rgba(255,111,174,0.9)] z-20">
                    <Heart className="w-4 h-4 fill-white text-white" />
                  </div>

                  {/* Card Content Block */}
                  <div className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${
                    isEven ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'
                  }`}>
                    <div className="glass-card rounded-2xl p-6 border border-[#FF6FAE]/30 hover:border-[#FF6FAE]/60 transition-all duration-300 shadow-xl group">
                      
                      {/* Optional Photo Thumbnail */}
                      {item.imageUrl && (
                        <div className="overflow-hidden rounded-xl mb-4 max-h-48">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Tag & Date */}
                      <div className={`flex items-center gap-2 mb-2 ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                        {item.tag && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FF6FAE]/20 text-[#FF6FAE] border border-[#FF6FAE]/30">
                            {item.tag}
                          </span>
                        )}
                        <span className="text-xs font-semibold tracking-wider text-pink-300/80 uppercase">
                          {item.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-great-vibes text-3xl sm:text-4xl text-white group-hover:text-[#FF6FAE] transition-colors mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-purple-200/90 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
