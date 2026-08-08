import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Play, Pause, Maximize, Upload, Gift, Sparkles, Heart, Trash2, RefreshCw, AlertCircle, Loader2, Plus, Check } from 'lucide-react';
import { VideoConfig } from '../types';

interface VideoSectionProps {
  videoConfig?: VideoConfig;
}

const VIDEO_PATH = "/videos/birthday.mp4";

export function VideoSection({ videoConfig }: VideoSectionProps) {
  const isEnabled = videoConfig?.enabled ?? true;
  const videoTitle = videoConfig?.title || "Recorded With Love ❤️";
  const thumbnail = videoConfig?.thumbnail || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80";

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showUploadGuide, setShowUploadGuide] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isEnabled) {
    return null;
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch((err) => {
          console.error("Play error:", err);
          setHasError(true);
        });
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
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-3 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6FAE]/10 border border-[#FF6FAE]/30 text-[#FF6FAE] text-xs font-semibold tracking-widest uppercase">
          <Video className="w-4 h-4" />
          <span>Recorded With Love</span>
        </div>
        <h2 className="font-great-vibes text-4xl sm:text-6xl text-white text-glow">
          {videoTitle}
        </h2>
        
        <div className="pt-2">
          <button 
            onClick={() => setShowUploadGuide(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel hover:bg-white/10 text-pink-200 text-xs font-semibold uppercase tracking-wider border border-[#FF6FAE]/40 transition-colors cursor-pointer shadow-lg hover:scale-105"
          >
            <Upload className="w-4 h-4 text-[#FF6FAE]" />
            <span>Add / Upload Video</span>
          </button>
        </div>
      </motion.div>

      {/* Upload Guide Modal */}
      <AnimatePresence>
        {showUploadGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#FF6FAE]/50 space-y-4 relative text-left">
              <button
                onClick={() => setShowUploadGuide(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                 <AlertCircle className="w-5 h-5" />
              </button>
              <h3 className="font-great-vibes text-3xl text-pink-200">Video Upload Setup</h3>
              <p className="text-sm text-purple-200 font-light leading-relaxed">
                Since this website has no backend/cloud storage, a runtime video upload cannot be permanently shared between devices using only browser storage.
              </p>
              <p className="text-sm text-purple-200 font-light leading-relaxed">
                For the current birthday website, to make your video work as a permanent public asset across all devices, please manually place your video file at:
              </p>
              <div className="px-4 py-3 rounded-xl bg-black/60 border border-pink-500/40 text-amber-300 font-mono text-xs sm:text-sm font-semibold shadow-inner text-center">
                public/videos/birthday.mp4
              </div>
              <div className="pt-2 text-center">
                 <label className="block w-full py-3 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#C084FC] text-white font-semibold text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer">
                   <span>Select Local Video (Preview Only)</span>
                   <input 
                     type="file" 
                     accept="video/*" 
                     className="hidden" 
                     onChange={(e) => {
                       setShowUploadGuide(false);
                     }}
                   />
                 </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Closed Gift Box State */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(true)}
              className="group relative w-full max-w-xl p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-rose-950/80 via-purple-900/60 to-slate-950/80 border-2 border-[#FF6FAE]/40 shadow-2xl backdrop-blur-xl text-center cursor-pointer overflow-hidden flex flex-col items-center justify-center space-y-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-4 left-4 text-pink-300/40 animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute bottom-4 right-4 text-rose-300/40 animate-pulse" style={{ animationDelay: '1s' }}>
                <Heart className="w-6 h-6" />
              </div>

              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#FF6FAE] via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-rose-500/50 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
                  <Gift className="w-12 h-12 sm:w-14 sm:h-14 animate-bounce" />
                </div>
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-md">
                  Secret
                </div>
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-pink-200 transition-colors">
                  🎁 Recorded With Love
                </h3>
                <p className="text-pink-200/80 text-sm sm:text-base max-w-sm mx-auto font-light">
                  A Special Message Just For You. Tap to unlock and reveal your personal video gift!
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-medium text-sm shadow-lg shadow-rose-500/40 group-hover:shadow-rose-500/70 transition-all">
                <Sparkles className="w-4 h-4" />
                <span>Open Video Box ❤️</span>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* Opened Video Container */
          <motion.div
            key="open-video"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-card rounded-3xl p-4 sm:p-8 border border-[#FF6FAE]/40 shadow-2xl relative overflow-hidden"
          >
            {/* Video Player Box */}
            <div ref={containerRef} className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-white/10 shadow-2xl group flex items-center justify-center">
              {isLoading && (
                <div className="absolute inset-0 bg-black/60 z-20 flex flex-col items-center justify-center text-pink-300 gap-2">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-xs font-medium">Loading video...</span>
                </div>
              )}

              {/* Requirement: IF VIDEO IS MISSING OR FAILS TO LOAD, SHOW ELEGANT PLACEHOLDER CARD */}
              {hasError ? (
                <div className="w-full h-full bg-gradient-to-br from-[#1a0b2e] via-[#2d124d] to-[#120422] flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FF6FAE]/20 flex items-center justify-center text-[#FF6FAE] shadow-lg shadow-pink-500/20">
                    <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-pink-300 animate-bounce" />
                  </div>

                  <div className="space-y-2 max-w-md">
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold text-pink-200 text-glow">
                      🎁 A Special Message Will Be Here
                    </h4>
                    <p className="text-xs sm:text-sm text-purple-200/90 font-poppins font-light leading-relaxed">
                      Place your video file inside your project at:
                    </p>
                    <div className="inline-block px-4 py-2 rounded-2xl bg-black/70 border border-pink-500/40 text-amber-300 font-mono text-xs sm:text-sm font-semibold shadow-inner">
                      public/videos/birthday.mp4
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    src={VIDEO_PATH}
                    poster={thumbnail}
                    preload="metadata"
                    playsInline
                    controls={isPlaying}
                    className="w-full h-full object-contain"
                    onLoadStart={() => setIsLoading(true)}
                    onCanPlay={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false);
                      setHasError(true);
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />

                  {/* Controls Overlay when paused */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10">
                      <button
                        onClick={togglePlay}
                        className="p-5 rounded-full bg-gradient-to-tr from-[#FF6FAE] to-purple-600 text-white shadow-2xl shadow-rose-500/60 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                        title="Play Birthday Video"
                      >
                        <Play className="w-10 h-10 fill-current ml-1" />
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="p-3.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                        title="Fullscreen"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
