import { motion } from 'motion/react';
import { X, Folder, Music, Video, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface ExportInfoModalProps {
  onClose: () => void;
}

export function ExportInfoModal({ onClose }: ExportInfoModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-panel rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#FF6FAE]/50 my-8 relative text-left space-y-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <h2 className="font-great-vibes text-3xl text-[#FF6FAE]">Media File Setup Guide</h2>
          <p className="text-xs text-purple-200/80">
            How to place your personal photos, music, and videos into the project folders:
          </p>
        </div>

        <div className="space-y-4 text-xs text-purple-100 font-poppins">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-pink-300 font-semibold text-sm">
              <Folder className="w-4 h-4 text-[#FF6FAE]" />
              <span>Project Folder Structure</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-purple-200 pl-2">
              <li><code className="text-pink-300 font-mono">/public/images/</code> — Place photo gallery & timeline images here</li>
              <li><code className="text-pink-300 font-mono">/public/music/</code> — Place your romantic MP3 song here (e.g. <code className="text-pink-300 font-mono">song.mp3</code>)</li>
              <li><code className="text-pink-300 font-mono">/public/video/</code> — Place your birthday video message here (e.g. <code className="text-pink-300 font-mono">birthday.mp4</code>)</li>
              <li><code className="text-pink-300 font-mono">/public/assets/</code> — Additional decorative graphics</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-pink-300 font-semibold text-sm">
              <CheckCircle className="w-4 h-4 text-[#FF6FAE]" />
              <span>Instant Interactive Options</span>
            </div>
            <p className="text-purple-200 leading-relaxed">
              You can also use the interactive buttons directly on the page! You can upload photos to the gallery and video in real-time, or edit her name and letter with the Personalize button.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#C084FC] text-white font-semibold text-xs shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            Got It, Close Guide
          </button>
        </div>
      </motion.div>
    </div>
  );
}
