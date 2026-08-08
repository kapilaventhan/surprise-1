import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, Heart, Calendar, Sparkles, Download } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface PersonalizeModalProps {
  config: BirthdayConfig;
  onSave: (newConfig: BirthdayConfig) => void;
  onClose: () => void;
  onOpenExportModal: () => void;
}

export function PersonalizeModal({ config, onSave, onClose, onOpenExportModal }: PersonalizeModalProps) {
  const [herName, setHerName] = useState(config.herName);
  const [yourName, setYourName] = useState(config.yourName);
  const [tagline, setTagline] = useState(config.tagline);
  const [targetDate, setTargetDate] = useState(
    config.targetDate ? config.targetDate.slice(0, 10) : '2026-08-08'
  );
  const [letterText, setLetterText] = useState(config.letterText);
  const [password, setPassword] = useState(config.password || 'march12');
  const [passwordHint, setPasswordHint] = useState(config.passwordHint || 'Our special birthday date (march12)');

  const [musicUrl, setMusicUrl] = useState(config.musicUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...config,
      herName,
      yourName,
      tagline,
      targetDate: `${targetDate}T00:00:00`,
      letterText,
      password,
      passwordHint,

      musicUrl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-panel rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#FF6FAE]/50 my-8 relative text-left space-y-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#FF6FAE]/20 text-[#FF6FAE]">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="font-great-vibes text-3xl text-white">Personalize Love Story</h2>
            <p className="text-xs text-purple-200/80">Customize names, birthday countdown date, and romantic love letter</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-pink-300 mb-1">Her Name / Partner's Name</label>
              <input
                type="text"
                required
                value={herName}
                onChange={(e) => setHerName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
                placeholder="e.g. Sophia"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-pink-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
                placeholder="e.g. Alex"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-pink-300 mb-1">Subtitle / Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
                placeholder="e.g. My favorite person in the whole world."
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-pink-300 mb-1">Birthday Date</label>
              <input
                type="date"
                required
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-pink-300 mb-1">Entrance Passcode</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
                placeholder="e.g. march12"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-pink-300 mb-1">Passcode Hint</label>
              <input
                type="text"
                value={passwordHint}
                onChange={(e) => setPasswordHint(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
                placeholder="e.g. Our special date"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">

            <div>
              <label className="block text-xs uppercase font-semibold text-pink-300 mb-1">Background Music URL</label>
              <input
                type="text"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
                placeholder="https://... MP3 audio URL"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-pink-300 mb-1">Love Letter Content</label>
            <textarea
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              rows={6}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-[#FF6FAE]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-purple-500/20">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenExportModal();
              }}
              className="inline-flex items-center gap-2 text-xs text-pink-200 hover:text-white transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#FF6FAE]" />
              <span>How to add local MP3/MP4 media files</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#C084FC] text-white font-semibold text-sm shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
