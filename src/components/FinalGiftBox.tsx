import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Sparkles, X, Play, Pause, Volume2, VolumeX, Maximize, FileText, Video, AlertCircle } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

interface FinalGiftBoxProps {
  letterText?: string;
  herName?: string;
  yourName?: string;
}

const VIDEO_PATH = "/videos/birthday.mp4";

export const FinalGiftBox: React.FC<FinalGiftBoxProps> = ({
  letterText = "Happy Birthday my love!",
  herName = "My Sweetheart",
  yourName = "Forever Yours"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'letter' | 'video'>('letter');

  const activeVideoSource = VIDEO_PATH;

  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasError(false);
    setIsPlaying(false);
  }, [activeVideoSource, activeTab]);

  const handleOpenGift = () => {
    setIsOpen(true);

    // Launch celebratory fireworks confetti
    try {
      const end = Date.now() + 3 * 1000;
      const colors = ['#ff4d6d', '#ff758f', '#FFD700', '#ffffff'];

      (function frame() {
        canvasConfetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        canvasConfetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch (e) {
      console.error(e);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Video play error:", err);
            setHasError(true);
          });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch((err) => console.error(err));
      } else {
        document.exitFullscreen().catch((err) => console.error(err));
      }
    }
  };

  return (
    <section id="final-gift-box" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20 mb-3">
          <Gift className="w-3.5 h-3.5" />
          <span>Final Birthday Surprise</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 dark:text-slate-100">
          Your Special Birthday Gift Box 🎁
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto">
          Tap the glowing silk gift box below to unwrap your final birthday treasure.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        {/* Animated Gift Box */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenGift}
          className="relative cursor-pointer group"
        >
          {/* Glowing Aura */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-rose-500/30 to-amber-400/30 blur-2xl animate-pulse" />

          {/* 3D Box Visual */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 p-6 shadow-2xl border-2 border-white/40 flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Silk Ribbon Cross */}
            <div className="absolute inset-y-0 w-12 bg-amber-300/80 shadow-md" />
            <div className="absolute inset-x-0 h-12 bg-amber-300/80 shadow-md" />

            {/* Gift Icon Center */}
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-amber-300 text-slate-900 flex items-center justify-center shadow-xl border-2 border-amber-100 group-hover:scale-110 transition-transform">
              <Gift className="w-10 h-10 text-rose-600" />
            </div>

            <p className="relative z-10 mt-4 text-xs font-serif font-bold uppercase tracking-widest text-amber-100 drop-shadow">
              Tap To Unwrap Gift ❤️
            </p>
          </div>
        </motion.div>
      </div>

      {/* Gift Contents Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              className="relative max-w-2xl w-full max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-500/40 flex flex-col overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1 block">
                  Unwrapped With Love
                </span>
                <h3 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-100">
                  Happy Birthday, {herName}! 🎉
                </h3>
              </div>

              {/* Tabs */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <button
                  onClick={() => setActiveTab('letter')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'letter'
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-100'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Final Love Letter</span>
                </button>

                <button
                  onClick={() => setActiveTab('video')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'video'
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-100'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>Birthday Video</span>
                </button>
              </div>

              {/* Content Body */}
              <div className="overflow-y-auto pr-2 flex-1 my-2">
                {activeTab === 'letter' ? (
                  <div className="p-6 rounded-2xl bg-rose-50/60 dark:bg-slate-800/60 border border-rose-200/50 dark:border-slate-700 font-serif leading-relaxed text-slate-800 dark:text-slate-200 text-sm whitespace-pre-line text-left">
                    {letterText}
                    <div className="mt-6 pt-4 border-t border-rose-200 dark:border-slate-700 text-right font-bold italic text-rose-600 dark:text-rose-400">
                      — {yourName}
                    </div>
                  </div>
                ) : (
                  <div ref={containerRef} className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-rose-500/30 shadow-inner flex items-center justify-center">
                    {hasError ? (
                      /* Placeholder if video does not exist or fails to load */
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3">
                        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 shadow-md">
                          <Video className="w-7 h-7 animate-bounce" />
                        </div>
                        <div className="space-y-1.5 max-w-sm">
                          <h4 className="font-serif text-lg sm:text-xl font-bold text-rose-200">
                            🎥 Birthday video not added yet.
                          </h4>
                          <p className="text-xs text-slate-300/90 font-light">
                            Place your file inside:
                          </p>
                          <div className="inline-block px-3 py-1.5 rounded-xl bg-black/60 border border-rose-500/40 text-amber-300 font-mono text-xs font-semibold">
                            public/videos/birthday.mp4
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center bg-black group">
                        <video
                          ref={videoRef}
                          src={activeVideoSource}
                          controls
                          preload="metadata"
                          playsInline
                          className="w-full h-full object-contain"
                          onError={() => setHasError(true)}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                          onEnded={() => setIsPlaying(false)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
