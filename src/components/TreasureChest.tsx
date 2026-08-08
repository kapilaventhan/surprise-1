import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Key, Lock, Unlock, X, Heart, Eye, Stars, Mail, Flower2, Crown, ChevronDown } from 'lucide-react';
import { TreasureItem } from '../types';
import canvasConfetti from 'canvas-confetti';

interface TreasureChestProps {
  items?: TreasureItem[];
}

// 30 Love Notes Array
const LOVE_NOTES_ARRAY = [
  "You make every single day beautiful.",
  "I will always choose you, in every lifetime.",
  "You are my favorite person in the whole universe.",
  "Thank you for every smile you bring to my face.",
  "My heart beats only for you.",
  "With you, every simple moment feels like magic.",
  "You are my sun, my moon, and all my starlight.",
  "Every love story is special, but ours is my favorite.",
  "I love you more today than yesterday, and less than tomorrow.",
  "In your warm eyes, I found my true home.",
  "You are my sweetest dream come true.",
  "Holding your hand is my absolute favorite place to be.",
  "You bring vibrant colors to my darkest days.",
  "I fall deeper in love with you every single day.",
  "You are my forever and my always.",
  "My favorite place in the world is right next to you.",
  "You are the peaceful calm in my chaotic world.",
  "Your laughter is my favorite melody.",
  "Thank you for loving me as wholehearted as you do.",
  "You are the absolute best part of my life.",
  "Forever wouldn't be long enough with you.",
  "You are my living paradise.",
  "Life with you is a wonderful romantic adventure.",
  "My soul recognized yours the moment we met.",
  "You make my heart skip a beat every time you smile.",
  "I am so blessed and thankful to be yours.",
  "You are my greatest gift and favorite surprise.",
  "Every memory with you is a priceless treasure.",
  "You are the light that guides my life.",
  "I love you beyond what words can ever measure."
];

// Memory Timeline Nodes
const TIMELINE_EVENTS = [
  { icon: "❤️", label: "We Met", date: "The Spark" },
  { icon: "💬", label: "First Conversation", date: "Late Night Sparks" },
  { icon: "📸", label: "First Selfie", date: "Picture Perfect" },
  { icon: "🌹", label: "Favorite Date", date: "Magic Evening" },
  { icon: "🎂", label: "Today", date: "Happy Birthday!" }
];

// Rich Fallback Memory Items
const DEFAULT_TREASURE_ITEMS: (TreasureItem & { icon?: string; date?: string })[] = [
  {
    id: '1',
    title: 'First Selfie 📸',
    caption: 'The day we took our very first picture together, capturing a shy yet radiant smile.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    secretNote: 'I remember feeling my heart race when you stood right next to me!',
    icon: '📸',
    date: 'Day One'
  },
  {
    id: '2',
    title: 'Our Favorite Date 🌹',
    caption: 'An unforgettable romantic evening under the starlit sky filled with laughter and warmth.',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    secretNote: 'That was the night I knew you were the one for me.',
    icon: '🌹',
    date: 'Magic Night'
  },
  {
    id: '3',
    title: 'First Sweet Message 💌',
    caption: 'The text message that started a thousand smiles and kept us chatting until morning.',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    secretNote: 'I re-read that text at least fifty times that night!',
    icon: '💌',
    date: 'The First Spark'
  },
  {
    id: '4',
    title: 'Birthday Celebration 🎂',
    caption: 'Celebrating your special day with endless love, sweet wishes, and joyous smiles.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    secretNote: 'Seeing you happy is my ultimate gift every single year.',
    icon: '🎂',
    date: 'Your Birthday'
  },
  {
    id: '5',
    title: 'Our Favorite Song 🎵',
    caption: 'The melody that always plays in my mind whenever I think of your beautiful face.',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    secretNote: 'Every lyric seems to be written just for our love story.',
    icon: '🎵',
    date: 'Our Theme'
  },
  {
    id: '6',
    title: 'Funniest Memory 😂',
    caption: 'That hilarious moment when we could not stop laughing until our stomachs hurt.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    secretNote: 'Your laugh is the most contagious and heavenly sound in the world.',
    icon: '😂',
    date: 'Pure Joy'
  },
  {
    id: '7',
    title: 'Coffee Together ☕',
    caption: 'Quiet morning coffee sessions paired with sweet, heartwarming conversations.',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    secretNote: 'Coffee tastes ten times sweeter when shared with you.',
    icon: '☕',
    date: 'Sweet Mornings'
  },
  {
    id: '8',
    title: 'Late Night Talks 🌙',
    caption: 'Talking about everything and nothing until 3 AM, losing track of time together.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    secretNote: 'I could talk to you forever and never run out of love.',
    icon: '🌙',
    date: 'Midnight Magic'
  },
  {
    id: '9',
    title: 'First "I Love You" ❤️',
    caption: 'The golden moment time stood still and our hearts spoke their truest words.',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    secretNote: 'Saying those words to you was the easiest and truest thing ever.',
    icon: '❤️',
    date: 'Forever Locked'
  },
  {
    id: '10',
    title: 'Future Dreams Together ✨',
    caption: 'All the places we will visit, dreams we will build, and love we will grow.',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    secretNote: 'The best chapter of our story is still being written.',
    icon: '✨',
    date: 'Our Tomorrow'
  }
];

export const TreasureChest: React.FC<TreasureChestProps> = ({ items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openingStage, setOpeningStage] = useState<'closed' | 'unlocking' | 'open'>('closed');
  const [activeItem, setActiveItem] = useState<(TreasureItem & { icon?: string; date?: string }) | null>(null);
  const [selectedLoveNote, setSelectedLoveNote] = useState<string | null>(null);
  const [foundGoldenKey, setFoundGoldenKey] = useState(false);
  const [showGoldenKeyModal, setShowGoldenKeyModal] = useState(false);

  // Combine custom items with default items if empty
  const displayItems = items.length > 0 ? items : DEFAULT_TREASURE_ITEMS;

  // Handle Chest Unlock & Opening Animation Sequence
  const handleOpenChest = () => {
    if (openingStage !== 'closed') return;

    setOpeningStage('unlocking');

    // Fire Initial Sparkle Confetti & Sound Visuals
    try {
      canvasConfetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#FFD700', '#FFA500', '#ff4d6d', '#ffffff', '#c084fc']
      });
    } catch (e) {
      console.error(e);
    }

    // Sequence timing: Unlocking -> Lid Open
    setTimeout(() => {
      setOpeningStage('open');
      setIsOpen(true);

      // Gold & Heart Burst
      try {
        canvasConfetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#ff6fae', '#ffffff', '#ff4d6d']
        });
      } catch (e) {
        console.error(e);
      }
    }, 800);
  };

  const handleCloseChest = () => {
    setOpeningStage('closed');
    setIsOpen(false);
  };

  const handleOpenLoveNote = () => {
    const randomNote = LOVE_NOTES_ARRAY[Math.floor(Math.random() * LOVE_NOTES_ARRAY.length)];
    setSelectedLoveNote(randomNote);

    try {
      canvasConfetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff6fae', '#ff4d6d', '#ffffff']
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoldenKeyFound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFoundGoldenKey(true);
    setShowGoldenKeyModal(true);

    try {
      // Massive Golden Heart Particle Burst
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const interval: any = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        canvasConfetti({
          particleCount: 60,
          spread: 100,
          origin: { x: Math.random(), y: Math.random() * 0.6 },
          colors: ['#FFD700', '#ff4d6d', '#ff6fae', '#ffffff']
        });
      }, 200);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="treasure-box" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Background Dim & Soft Blur overlay when chest is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10 rounded-[3rem] pointer-events-none transition-all duration-700"
          />
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="text-center mb-12 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest shadow-lg"
        >
          <Key className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Cinematic Memory Chest</span>
        </motion.div>

        <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white text-glow">
          ✨ Our Treasure of Memories ✨
        </h2>
        <p className="text-pink-200/90 text-sm sm:text-base max-w-xl mx-auto font-light font-poppins">
          "Every memory with you is priceless."
        </p>
      </div>

      <div className="flex flex-col items-center justify-center relative">
        
        {/* Floating Polaroid Photos hovering around closed/opening chest */}
        <div className="hidden lg:block absolute inset-x-0 -top-8 bottom-0 pointer-events-none z-20">
          {/* Polaroid 1 - Top Left */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-6, -4, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => setActiveItem(displayItems[0])}
            className="absolute left-4 top-10 pointer-events-auto bg-white p-3 rounded-2xl shadow-2xl border border-amber-300/40 w-44 cursor-pointer hover:scale-110 transition-transform hover:z-30"
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-slate-900">
              <img src={displayItems[0]?.imageUrl} alt="Polaroid 1" className="w-full h-full object-cover" />
            </div>
            <p className="font-great-vibes text-lg text-slate-800 text-center">{displayItems[0]?.title}</p>
          </motion.div>

          {/* Polaroid 2 - Top Right */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [5, 3, 5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            onClick={() => setActiveItem(displayItems[1])}
            className="absolute right-4 top-10 pointer-events-auto bg-white p-3 rounded-2xl shadow-2xl border border-amber-300/40 w-44 cursor-pointer hover:scale-110 transition-transform hover:z-30"
          >
            <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-slate-900">
              <img src={displayItems[1]?.imageUrl} alt="Polaroid 2" className="w-full h-full object-cover" />
            </div>
            <p className="font-great-vibes text-lg text-slate-800 text-center">{displayItems[1]?.title}</p>
          </motion.div>
        </div>

        {/* 3D RICH WOODEN TREASURE CHEST CONTAINER */}
        <motion.div
          animate={
            openingStage === 'unlocking'
              ? { scale: [1, 1.08, 1.04], x: [-4, 4, -3, 3, 0] }
              : { y: [0, -8, 0] }
          }
          transition={
            openingStage === 'unlocking'
              ? { duration: 0.8 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          onClick={openingStage === 'closed' ? handleOpenChest : undefined}
          className={`relative cursor-pointer group z-30 transition-all ${openingStage === 'closed' ? 'hover:scale-105' : ''}`}
        >
          {/* Ambient Warm Golden Aura */}
          <div className={`absolute -inset-8 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            isOpen ? 'bg-amber-400/40 opacity-100 animate-pulse' : 'bg-amber-500/20 opacity-60 group-hover:opacity-100'
          }`} />

          {/* Golden Rays Beam (When Open) */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0.6, 0.9, 0.6], scaleY: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="absolute -top-40 inset-x-12 h-44 bg-gradient-to-t from-amber-300/30 via-yellow-200/10 to-transparent blur-xl pointer-events-none z-0"
            />
          )}

          {/* Treasure Box Body Structure */}
          <div className="relative w-72 sm:w-96 h-48 sm:h-60 bg-gradient-to-b from-amber-900 via-amber-950 to-slate-950 rounded-3xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-4 border-amber-500/80 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Wooden Texture Grain Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-800/20 via-amber-950/60 to-black/80 pointer-events-none" />

            {/* Golden Metallic Edge Bands */}
            <div className="absolute inset-x-0 top-3 h-3 bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-600 border-y border-amber-200/80 opacity-90" />
            <div className="absolute inset-x-0 bottom-3 h-3 bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-600 border-y border-amber-200/80 opacity-90" />
            <div className="absolute inset-y-0 left-4 w-3 bg-gradient-to-b from-amber-600 via-yellow-300 to-amber-600 border-x border-amber-200/80 opacity-90" />
            <div className="absolute inset-y-0 right-4 w-3 bg-gradient-to-b from-amber-600 via-yellow-300 to-amber-600 border-x border-amber-200/80 opacity-90" />

            {/* Lid Seam & Escaping Warm Light Gap */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-amber-950 border-y border-amber-400/60 shadow-inner flex items-center justify-center">
              {openingStage === 'closed' && (
                <div className="w-full h-full bg-amber-300/40 blur-xs animate-pulse" />
              )}
            </div>

            {/* Small Engraved Heart on Top Lid */}
            <div className="absolute top-2.5 z-10 text-amber-300/80">
              <Heart className="w-4 h-4 fill-amber-400/60" />
            </div>

            {/* Lock & Keyhole Centerpiece */}
            <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-400 border-2 border-amber-100 shadow-[0_0_25px_rgba(255,215,0,0.8)] flex items-center justify-center text-amber-950">
              {openingStage === 'closed' ? (
                <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-amber-950 group-hover:scale-110 transition-transform" />
              ) : openingStage === 'unlocking' ? (
                <Unlock className="w-8 h-8 sm:w-10 sm:h-10 text-rose-700 animate-bounce" />
              ) : (
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600 animate-spin" style={{ animationDuration: '6s' }} />
              )}
            </div>

            {/* Label below lock */}
            <p className="mt-4 text-xs font-serif font-bold uppercase tracking-widest text-amber-200 drop-shadow-md z-20">
              {openingStage === 'closed'
                ? "Click Chest To Unlock Memories"
                : openingStage === 'unlocking'
                ? "Unlocking Pure Love..."
                : "Treasure Chest Unlocked ✨"}
            </p>
          </div>
        </motion.div>

        {/* Hidden Golden Key Floating Element */}
        {isOpen && !foundGoldenKey && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], opacity: 1, y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={handleGoldenKeyFound}
            className="mt-6 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 text-amber-950 font-bold text-xs shadow-[0_0_20px_rgba(255,215,0,0.8)] border border-amber-100 flex items-center gap-2 cursor-pointer z-40 hover:scale-110 transition-transform"
          >
            <Key className="w-4 h-4 text-amber-950 animate-spin" style={{ animationDuration: '4s' }} />
            <span>✨ Hidden Heart Key Found! (Click Me)</span>
          </motion.button>
        )}

        {/* Floating Love Notes Launcher */}
        {isOpen && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 z-30">
            <button
              onClick={handleOpenLoveNote}
              className="px-5 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/40 border border-rose-400/40 text-pink-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all hover:scale-105 shadow-lg"
            >
              <Mail className="w-4 h-4 text-pink-400 animate-bounce" />
              <span>Unfold Floating Love Note 💌</span>
            </button>
            
            <button
              onClick={handleCloseChest}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
              <span>Close Chest</span>
            </button>
          </div>
        )}

        {/* OPENED TREASURE CONTENT GRID */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mt-12 w-full space-y-16 z-20"
            >
              {/* GLOWING MEMORY TIMELINE */}
              <div className="p-6 sm:p-8 rounded-3xl glass-card border border-amber-300/30 backdrop-blur-xl shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                    Our Glowing Story Line
                  </h3>
                  <p className="text-xs text-purple-200/80">Key milestones in our journey</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                  {TIMELINE_EVENTS.map((evt, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.12 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/30 to-pink-500/30 border border-amber-300/50 flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                          {evt.icon}
                        </div>
                        <span className="mt-2 text-xs font-semibold text-white">{evt.label}</span>
                        <span className="text-[10px] text-pink-300/80">{evt.date}</span>
                      </div>
                      {index < TIMELINE_EVENTS.length - 1 && (
                        <div className="hidden sm:block w-8 sm:w-12 h-0.5 bg-gradient-to-r from-amber-400/80 to-pink-400/80 rounded-full" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* MEMORY CARDS GRID */}
              <div>
                <div className="text-center mb-8">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white text-glow">
                    Floating Memory Cards 💖
                  </h3>
                  <p className="text-xs text-pink-200/80">Click any card to open the story modal</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {displayItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => setActiveItem(item)}
                      className="glass-card rounded-3xl p-4 border border-amber-300/30 hover:border-amber-400/70 shadow-2xl backdrop-blur-xl cursor-pointer group flex flex-col justify-between transition-all"
                    >
                      <div>
                        {/* Image Preview Box */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-slate-950 border border-white/10">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-3 flex items-end justify-between">
                            <span className="text-lg">{item.icon || "📸"}</span>
                            <span className="p-1.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                              <Eye className="w-4 h-4" />
                            </span>
                          </div>
                        </div>

                        {/* Title & Caption */}
                        <h4 className="font-serif font-bold text-amber-200 text-base mb-1 group-hover:text-pink-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-purple-200/80 line-clamp-2 font-poppins">
                          {item.caption}
                        </p>
                      </div>

                      {/* Secret Note Badge */}
                      {item.secretNote && (
                        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-pink-300 font-medium">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                            <span>Secret Note</span>
                          </span>
                          <span className="text-[10px] text-amber-300/80">{item.date || "Memory"}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* EMOTIONAL ENDING CARD */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-950/80 via-purple-950/80 to-slate-950/90 border-2 border-pink-400/40 text-center shadow-2xl space-y-3">
                <Heart className="w-8 h-8 text-rose-400 fill-rose-400 mx-auto animate-pulse" />
                <p className="font-serif text-lg sm:text-xl text-rose-200 italic max-w-2xl mx-auto leading-relaxed">
                  "No matter how many memories we make... My favorite one will always be the next one with you."
                </p>
                <p className="text-xs text-amber-300 font-semibold uppercase tracking-widest pt-2">
                  Forever & Always ❤️
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* MEMORY LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/50 overflow-hidden text-left space-y-4"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden aspect-video bg-black/60 relative border border-white/10">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
                {activeItem.date && (
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 text-amber-300 text-xs font-semibold backdrop-blur-md border border-amber-300/30">
                    {activeItem.date}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 mb-2">
                  {activeItem.title}
                </h3>
                <p className="text-purple-100 text-sm leading-relaxed font-poppins">
                  {activeItem.caption}
                </p>
              </div>

              {activeItem.secretNote && (
                <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-pink-200 text-xs font-serif italic flex items-start gap-3">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500 shrink-0 mt-0.5" />
                  <span>"{activeItem.secretNote}"</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOVE NOTE TOAST MODAL */}
      <AnimatePresence>
        {selectedLoveNote && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="relative max-w-md w-full p-8 rounded-3xl bg-gradient-to-br from-rose-950 via-purple-950 to-slate-950 border-2 border-pink-400/50 shadow-2xl text-center space-y-4"
            >
              <button
                onClick={() => setSelectedLoveNote(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center text-rose-400 mx-auto">
                <Mail className="w-8 h-8 animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-pink-200">
                A Sweet Love Note 💌
              </h3>

              <p className="text-base sm:text-lg font-serif italic text-white leading-relaxed p-4 rounded-2xl bg-white/5 border border-white/10">
                "{selectedLoveNote}"
              </p>

              <button
                onClick={() => setSelectedLoveNote(null)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-xs shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                Keep In My Heart ❤️
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECRET GOLDEN KEY MODAL */}
      <AnimatePresence>
        {showGoldenKeyModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-md w-full p-8 rounded-3xl bg-gradient-to-br from-amber-950 via-rose-950 to-slate-950 border-2 border-amber-400 shadow-2xl text-center space-y-4"
            >
              <button
                onClick={() => setShowGoldenKeyModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center text-amber-950 mx-auto shadow-2xl shadow-amber-400/50">
                <Crown className="w-10 h-10 animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 text-glow">
                You found the key to my heart ❤️
              </h3>

              <p className="text-sm font-light text-rose-100 leading-relaxed font-poppins p-4 rounded-2xl bg-white/5 border border-white/10">
                You unlocked my deepest secret: My heart has been completely, unconditionally, and endlessly yours from the very first moment we met!
              </p>

              <button
                onClick={() => setShowGoldenKeyModal(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-600 text-white font-semibold text-xs shadow-lg hover:scale-105 transition-transform cursor-pointer"
              >
                Forever Yours 💖
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
