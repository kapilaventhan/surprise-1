import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface FloatingLoveNotesProps {
  notes: string[];
}

interface ActiveNote {
  id: string;
  text: string;
}

export function FloatingLoveNotes({ notes }: FloatingLoveNotesProps) {
  const [activeNote, setActiveNote] = useState<ActiveNote | null>(null);

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    const showRandomNote = () => {
      const randomIndex = Math.floor(Math.random() * notes.length);
      const selectedText = notes[randomIndex];

      setActiveNote({
        id: Date.now().toString(),
        text: selectedText,
      });

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        setActiveNote(null);
      }, 5000);
    };

    // First note pops up after 4 seconds
    const initialTimer = setTimeout(showRandomNote, 4000);

    // Subsequent notes every 10 seconds
    const interval = setInterval(showRandomNote, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [notes]);

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-none max-w-xs sm:max-w-sm">
      <AnimatePresence>
        {activeNote && (
          <motion.div
            key={activeNote.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="glass-panel rounded-2xl px-5 py-3.5 border border-[#FF6FAE]/50 shadow-[0_0_25px_rgba(255,111,174,0.4)] flex items-center gap-3 backdrop-blur-xl bg-gradient-to-r from-[#1a0b2e]/90 to-[#2c104d]/90 text-white pointer-events-auto"
          >
            <div className="p-2 rounded-full bg-[#FF6FAE]/20 text-[#FF6FAE] shrink-0">
              <Heart className="w-4 h-4 fill-current heart-beat" />
            </div>
            <p className="text-xs sm:text-sm font-medium font-poppins text-pink-100">
              {activeNote.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
