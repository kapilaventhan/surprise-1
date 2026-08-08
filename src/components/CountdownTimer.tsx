import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Clock, PartyPopper } from 'lucide-react';
import { triggerConfettiBurst, launchMassiveSurpriseFireworks } from '../utils/fireworks';

interface CountdownTimerProps {
  targetDateStr: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}

export function CountdownTimer({ targetDateStr }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
  });
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true });
        if (!celebrated) {
          setCelebrated(true);
          triggerConfettiBurst();
          launchMassiveSurpriseFireworks();
        }
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isFinished: false });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr, celebrated]);

  const handleManualCelebrate = () => {
    triggerConfettiBurst();
    launchMassiveSurpriseFireworks();
  };

  const formattedDate = new Date(targetDateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section id="countdown-section" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 text-[#FF6FAE] text-sm font-semibold tracking-widest uppercase">
            <Clock className="w-4 h-4" />
            <span>Counting Down to Your Special Day</span>
          </div>
          <h2 className="font-great-vibes text-4xl sm:text-6xl text-[#FF6FAE] text-glow">
            {timeLeft.isFinished ? "It's Celebration Time!" : `Counting Down to ${formattedDate}`}
          </h2>
        </motion.div>

        {/* Countdown Cards or Finished Celebration Banner */}
        {timeLeft.isFinished ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-[#FF6FAE] shadow-[0_0_50px_rgba(255,111,174,0.5)] max-w-2xl mx-auto"
          >
            <div className="heart-beat inline-block text-6xl mb-4">🎂</div>
            <h3 className="font-great-vibes text-5xl sm:text-6xl text-white text-glow mb-4">
              Happy Birthday My Love ❤️
            </h3>
            <p className="text-purple-200 text-lg mb-6">
              Today is all about you! Let's make every second of this birthday unforgettable.
            </p>
            <button
              onClick={handleManualCelebrate}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#C084FC] text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              <PartyPopper className="w-5 h-5" />
              <span>Launch Fireworks & Confetti!</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto"
          >
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center border border-[#FF6FAE]/30 hover:border-[#FF6FAE]/60 transition-colors shadow-xl"
              >
                <span className="font-poppins font-bold text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-purple-300 drop-shadow-[0_0_15px_rgba(255,111,174,0.6)]">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-pink-300/80 mt-2">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Quick test celebrate trigger button */}
        {!timeLeft.isFinished && (
          <div className="pt-2">
            <button
              onClick={handleManualCelebrate}
              className="inline-flex items-center gap-2 text-xs text-pink-300/70 hover:text-pink-200 transition-colors underline cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test Fireworks & Confetti Now</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
