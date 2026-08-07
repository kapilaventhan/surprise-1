import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video,
  Play,
  Maximize,
  Gift,
  Sparkles,
  Heart,
  Loader2
} from 'lucide-react';
import { VideoConfig } from '../types';

interface VideoSectionProps {
  videoConfig?: VideoConfig;
}

const VIDEO_PATH = "/videos/birthday.mp4";

export function VideoSection({ videoConfig }: VideoSectionProps) {

  const isEnabled = videoConfig?.enabled ?? true;
  const videoTitle = videoConfig?.title || "Recorded With Love ❤️";
  const thumbnail =
    videoConfig?.thumbnail ||
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80";

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

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

        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Play error:", err);
            setHasError(true);
          });

      }
    }
  };


  const toggleFullscreen = () => {

    if (containerRef.current) {

      if (!document.fullscreenElement) {

        containerRef.current
          .requestFullscreen()
          .catch(console.error);

      } else {

        document.exitFullscreen()
          .catch(console.error);

      }
    }
  };


  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 max-w-5xl mx-auto">


      <motion.div
        initial={{ opacity:0, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.8 }}
        className="text-center space-y-3 mb-10"
      >

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6FAE]/10 border border-[#FF6FAE]/30 text-[#FF6FAE] text-xs font-semibold tracking-widest uppercase">

          <Video className="w-4 h-4"/>

          <span>
            Recorded With Love
          </span>

        </div>


        <h2 className="font-great-vibes text-4xl sm:text-6xl text-white text-glow">
          {videoTitle}
        </h2>


      </motion.div>



      <AnimatePresence mode="wait">

      {!isOpen ? (

        <motion.div
          key="closed-box"
          initial={{opacity:0,scale:0.9}}
          animate={{opacity:1,scale:1}}
          exit={{opacity:0,scale:1.05}}
          transition={{duration:0.5}}
          className="flex justify-center"
        >


          <motion.button

            whileHover={{scale:1.03}}
            whileTap={{scale:0.97}}

            onClick={()=>setIsOpen(true)}

            className="group relative w-full max-w-xl p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-rose-950/80 via-purple-900/60 to-slate-950/80 border-2 border-[#FF6FAE]/40 shadow-2xl backdrop-blur-xl text-center cursor-pointer overflow-hidden flex flex-col items-center justify-center space-y-6"

          >


            <div className="absolute top-4 left-4 text-pink-300/40 animate-pulse">
              <Sparkles className="w-6 h-6"/>
            </div>


            <div className="absolute bottom-4 right-4 text-rose-300/40 animate-pulse">
              <Heart className="w-6 h-6"/>
            </div>


            <div className="relative">

              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#FF6FAE] via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-2xl">

                <Gift className="w-12 h-12 animate-bounce"/>

              </div>

            </div>


            <div className="space-y-2">

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                🎁 Recorded With Love
              </h3>


              <p className="text-pink-200/80 text-sm sm:text-base">
                A Special Message Just For You. Tap to unlock and reveal your personal video gift!
              </p>

            </div>


            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white">

              <Sparkles className="w-4 h-4"/>

              <span>
                Open Video Box ❤️
              </span>

            </div>


          </motion.button>


        </motion.div>


      ) : (


        <motion.div
          key="open-video"
          initial={{opacity:0,scale:0.95,y:20}}
          animate={{opacity:1,scale:1,y:0}}
          transition={{duration:0.6}}
          className="glass-card rounded-3xl p-4 sm:p-8 border border-[#FF6FAE]/40 shadow-2xl relative overflow-hidden"
        >

          <AnimatePresence>

            <div
              ref={containerRef}
              className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-white/10 shadow-2xl group flex items-center justify-center"
            >
