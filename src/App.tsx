import { useState, useEffect } from 'react';
import { defaultBirthdayConfig } from './data/defaultContent';
import { BirthdayConfig, GalleryPhoto } from './types';
import { LoadingScreen } from './components/LoadingScreen';
import { AnimatedBackground } from './components/AnimatedBackground';
import { CursorTrail } from './components/CursorTrail';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { LoveLetter } from './components/LoveLetter';
import { MemoryTimeline } from './components/MemoryTimeline';
import { PhotoGallery } from './components/PhotoGallery';
import { ReasonsCards } from './components/ReasonsCards';
import { LoveQuotes } from './components/LoveQuotes';
import { SurpriseGift } from './components/SurpriseGift';
import { VideoSection } from './components/VideoSection';
import { FloatingLoveNotes } from './components/FloatingLoveNotes';
import { FinalEnding } from './components/FinalEnding';
import { PersonalizeModal } from './components/PersonalizeModal';
import { ExportInfoModal } from './components/ExportInfoModal';

// Premium Feature Imports
import { PasswordGate } from './components/PasswordGate';
import { StoryBook } from './components/StoryBook';
import { TreasureChest } from './components/TreasureChest';
import { HiddenHeartsGame } from './components/HiddenHeartsGame';
import { HundredReasons } from './components/HundredReasons';
import { BirthdayCake } from './components/BirthdayCake';
import { InteractiveNightSky } from './components/InteractiveNightSky';
import { FinalGiftBox } from './components/FinalGiftBox';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [autoPlayMusicTriggered, setAutoPlayMusicTriggered] = useState(false);
  const [showPersonalizeModal, setShowPersonalizeModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Load config from localStorage or fallback to default
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    try {
      const saved = localStorage.getItem('romantic_birthday_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to read localStorage config:", e);
    }
    return defaultBirthdayConfig;
  });

  // Save config changes to localStorage
  const handleSaveConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('romantic_birthday_config', JSON.stringify(newConfig));
    } catch (e) {
      console.warn("Failed to save config to localStorage:", e);
    }
  };

  // Add new photo to gallery
  const handleAddPhoto = (newPhoto: GalleryPhoto) => {
    const updated = {
      ...config,
      galleryPhotos: [newPhoto, ...config.galleryPhotos]
    };
    handleSaveConfig(updated);
  };

  // Remove photo from gallery
  const handleRemovePhoto = (photoId: string) => {
    const updated = {
      ...config,
      galleryPhotos: config.galleryPhotos.filter((p) => p.id !== photoId)
    };
    handleSaveConfig(updated);
  };

  // Update photo details
  const handleUpdatePhoto = (updatedPhoto: GalleryPhoto) => {
    const updated = {
      ...config,
      galleryPhotos: config.galleryPhotos.map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p))
    };
    handleSaveConfig(updated);
  };



  // Update custom music URL
  const handleUpdateMusicUrl = (url: string) => {
    const updated = {
      ...config,
      musicUrl: url
    };
    handleSaveConfig(updated);
  };

  return (
    <div className="relative min-h-screen text-white bg-[#0b0518] selection:bg-[#FF6FAE] selection:text-white font-poppins overflow-x-hidden">
      
      {/* Feature 1: Secret Password Entrance Gate */}
      {!isUnlocked && (
        <PasswordGate
          correctPassword={config.password || "march12"}
          hint={config.passwordHint || "Our special birthday date (march12)"}
          onUnlocked={() => {
            setIsUnlocked(true);
            setAutoPlayMusicTriggered(true);
          }}
        />
      )}

      {/* 3-Second Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Animated Glowing Canvas Background (60 FPS) */}
      <AnimatedBackground />

      {/* Custom Glowing Heart Cursor Trail */}
      <CursorTrail />

      {/* Feature 4: Hidden Hearts Game Overlay & Counter */}
      <HiddenHeartsGame notes={config.hiddenHeartsNotes} />

      {/* Music Control Bar */}
      <MusicPlayer
        customMusicUrl={config.musicUrl}
        musicConfig={config.birthdayMusic}
        autoPlayTriggered={autoPlayMusicTriggered}
        onUpdateMusicUrl={handleUpdateMusicUrl}
      />

      {/* Feature 8: Floating Love Notes Toast */}
      <FloatingLoveNotes notes={config.floatingNotes} />

      {/* Main Content Area */}
      <main className="relative z-10 space-y-12">
        {/* Hero Section */}
        <HeroSection
          herName={config.herName}
          tagline={config.tagline}
          onBeginJourney={() => setAutoPlayMusicTriggered(true)}
          onOpenSettings={() => setShowPersonalizeModal(true)}
        />

        {/* Countdown Timer */}
        <CountdownTimer targetDateStr={config.targetDate} />

        {/* Feature 7: Birthday Cake Candle Ceremony */}
        <BirthdayCake herName={config.herName} />

        {/* Love Letter */}
        <LoveLetter
          letterText={config.letterText}
          yourName={config.yourName}
        />

        {/* Feature 2: Story Book */}
        <StoryBook pages={config.storybookPages} />

        {/* Memory Timeline */}
        <MemoryTimeline memories={config.memories} />

        {/* Feature 3: Memory Treasure Box */}
        <TreasureChest items={config.treasureItems} />

        {/* Photo Gallery */}
        <PhotoGallery
          photos={config.galleryPhotos}
          onAddPhoto={handleAddPhoto}
          onRemovePhoto={handleRemovePhoto}
          onUpdatePhoto={handleUpdatePhoto}
        />

        {/* 12 Reasons Why I Love You Flip Cards */}
        <ReasonsCards reasons={config.reasons} />

        {/* Feature 5: 100 Reasons I Love You Carousel */}
        <HundredReasons reasons={config.hundredReasons} />

        {/* Love Quotes Carousel */}
        <LoveQuotes quotes={config.loveQuotes} />

        {/* Feature 9: Interactive Night Sky Constellation */}
        <InteractiveNightSky />

        {/* Video Message Section */}
        <VideoSection
          videoConfig={config.birthdayVideo}
        />

        {/* Feature 10: Final Gift Box */}
        <FinalGiftBox
          letterText={config.letterText}
          herName={config.herName}
          yourName={config.yourName}
        />

        {/* Surprise Gift Button */}
        <SurpriseGift />

        {/* Feature 6 & 11: Final Ending Scene with Cinema Mode */}
        <FinalEnding endingLines={config.endingText} />
      </main>

      {/* Personalize Modal */}
      {showPersonalizeModal && (
        <PersonalizeModal
          config={config}
          onSave={handleSaveConfig}
          onClose={() => setShowPersonalizeModal(false)}
          onOpenExportModal={() => setShowExportModal(true)}
        />
      )}

      {/* Export & Media Folder Guide Modal */}
      {showExportModal && (
        <ExportInfoModal onClose={() => setShowExportModal(false)} />
      )}

    </div>
  );
}
