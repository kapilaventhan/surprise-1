import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Settings2, Upload, Trash2, Power, Disc, Sparkles, Check } from 'lucide-react';
import { romanticSynth } from '../utils/audioSynth';
import { MusicConfig } from '../types';

interface SongOption {
  id: string;
  name: string;
  icon: string;
  file: string;
}

const DEFAULT_SONGS: SongOption[] = [
  { id: 'synth', name: 'Romantic Piano Synthesizer', icon: '🎹', file: 'synth' },
  { id: 'love-theme', name: 'Soft Love Theme', icon: '🌙', file: 'assets/music/love-theme.mp3' },
  { id: 'dream', name: 'Dreamy Background', icon: '❤️', file: 'assets/music/dream.mp3' },
  { id: 'piano', name: 'Serene Romance Piano', icon: '💖', file: 'assets/music/piano.mp3' },
];

interface MusicPlayerProps {
  customMusicUrl?: string;
  musicConfig?: MusicConfig;
  autoPlayTriggered: boolean;
  onUpdateMusicUrl?: (url: string) => void;
}

export function MusicPlayer({
  customMusicUrl,
  musicConfig,
  autoPlayTriggered,
  onUpdateMusicUrl
}: MusicPlayerProps) {
  const initialFile = customMusicUrl || musicConfig?.file || 'synth';

  const [musicUrl, setMusicUrl] = useState(initialFile);
  const [selectedTrackId, setSelectedTrackId] = useState<string>(
    DEFAULT_SONGS.find(s => s.file === initialFile)?.id || (initialFile === 'synth' ? 'synth' : 'custom')
  );
  const [isMusicEnabled, setIsMusicEnabled] = useState(musicConfig?.enabled ?? true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(musicConfig?.volume ?? 0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (customMusicUrl) {
      setMusicUrl(customMusicUrl);
      const matched = DEFAULT_SONGS.find(s => s.file === customMusicUrl);
      setSelectedTrackId(matched ? matched.id : 'custom');
    }
  }, [customMusicUrl]);

  // Handle Master ON / OFF toggle
  const toggleMusicPower = () => {
    if (isMusicEnabled) {
      // OFF: Stop music completely, reset audio state
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      romanticSynth.pause();
      setIsPlaying(false);
      setIsMusicEnabled(false);
    } else {
      // ON: Turn back on and start playback
      setIsMusicEnabled(true);
      setTimeout(() => {
        startPlayback();
      }, 100);
    }
  };

  const startPlayback = () => {
    if (!isMusicEnabled) return;

    if (musicUrl && musicUrl !== 'synth' && audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play().then(() => setIsPlaying(true)).catch((err) => {
        console.warn("Custom audio play blocked or failed, falling back to synthesizer:", err);
        romanticSynth.setVolume(isMuted ? 0 : volume);
        romanticSynth.play();
        setIsPlaying(true);
      });
    } else {
      romanticSynth.setVolume(isMuted ? 0 : volume);
      romanticSynth.play();
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    romanticSynth.pause();
    setIsPlaying(false);
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!isMusicEnabled) {
      setIsMusicEnabled(true);
    }

    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback();
    }
  };

  // Trigger when "Begin the Journey" button is pressed
  useEffect(() => {
    if (autoPlayTriggered && isMusicEnabled && !isPlaying) {
      startPlayback();
    }
  }, [autoPlayTriggered]);

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    romanticSynth.setVolume(val);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.5;
      romanticSynth.setVolume(volume || 0.5);
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
      romanticSynth.setVolume(0);
    }
  };

  // Select Song Option
  const handleSelectSong = (song: SongOption) => {
    pausePlayback();
    setSelectedTrackId(song.id);
    setMusicUrl(song.file);
    if (onUpdateMusicUrl) onUpdateMusicUrl(song.file);

    if (isMusicEnabled) {
      setTimeout(() => {
        if (song.file === 'synth') {
          romanticSynth.setVolume(isMuted ? 0 : volume);
          romanticSynth.play();
          setIsPlaying(true);
        } else if (audioRef.current) {
          audioRef.current.src = song.file;
          audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
      }, 150);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      pausePlayback();
      const url = URL.createObjectURL(file);
      setMusicUrl(url);
      setSelectedTrackId('custom');
      if (onUpdateMusicUrl) onUpdateMusicUrl(url);
      setShowPanel(false);

      if (isMusicEnabled) {
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
          }
        }, 200);
      }
    }
  };

  const currentTrackName = DEFAULT_SONGS.find(s => s.id === selectedTrackId)?.name || 'Custom Song File';

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Audio Element for non-synth audio tracks */}
      {musicUrl && musicUrl !== 'synth' && (
        <audio
          ref={audioRef}
          src={musicUrl}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Music Selection & Options Panel */}
      {showPanel && (
        <div className="mb-3 p-4 rounded-3xl bg-slate-950/95 border border-[#FF6FAE]/40 shadow-2xl backdrop-blur-2xl text-xs space-y-4 w-72 text-rose-200 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between font-serif font-bold border-b border-white/10 pb-2 text-sm text-pink-300">
            <div className="flex items-center gap-1.5">
              <Disc className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Music Options</span>
            </div>
            <button
              onClick={() => setShowPanel(false)}
              className="text-white/60 hover:text-white text-xs px-2 py-0.5 rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Current Playing Indicator */}
          <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs flex items-center justify-between">
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase text-pink-300 font-semibold tracking-wider">Current Track</p>
              <p className="font-medium text-white truncate">{isMusicEnabled ? currentTrackName : "Music Disabled (OFF)"}</p>
            </div>
            <span className={`w-2 h-2 rounded-full ${isMusicEnabled && isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
          </div>

          {/* Preset Songs List */}
          <div className="space-y-1.5">
            <p className="text-[10px] uppercase text-purple-300/80 font-bold tracking-wider px-1">Select Romantic Music:</p>
            {DEFAULT_SONGS.map((song) => {
              const isSelected = selectedTrackId === song.id;
              return (
                <button
                  key={song.id}
                  onClick={() => handleSelectSong(song)}
                  className={`w-full p-2 rounded-xl flex items-center justify-between transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50 text-white font-semibold shadow-md'
                      : 'hover:bg-white/5 border border-transparent text-purple-200/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{song.icon}</span>
                    <span className="text-xs">{song.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-pink-400" />}
                </button>
              );
            })}
          </div>

          {/* Upload Custom Music */}
          <div className="pt-2 border-t border-white/10">
            <label className="w-full py-2 px-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-white font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-pink-300" />
              <span>{selectedTrackId === 'custom' ? "Replace Custom MP3" : "Upload Custom MP3"}</span>
              <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      )}

      {/* Floating Control Bar */}
      <div className="glass-panel rounded-full px-4 py-2.5 flex items-center gap-3 border border-[#FF6FAE]/40 shadow-2xl backdrop-blur-md">
        {/* Power Button ON/OFF */}
        <button
          onClick={toggleMusicPower}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            isMusicEnabled
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
          }`}
          title={isMusicEnabled ? "Turn Music OFF" : "Turn Music ON"}
        >
          <Power className="w-4 h-4" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`p-2.5 rounded-full bg-gradient-to-r from-[#FF6FAE] to-[#C084FC] text-white hover:scale-105 active:scale-95 transition-transform shadow-md cursor-pointer ${
            !isMusicEnabled ? 'opacity-50' : ''
          }`}
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="text-purple-200 hover:text-pink-300 transition-colors cursor-pointer">
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-14 sm:w-20 accent-[#FF6FAE] h-1.5 bg-white/20 rounded-lg cursor-pointer"
          />
        </div>

        {/* Track Selection Panel Gear */}
        <button
          onClick={() => setShowPanel(!showPanel)}
          className={`p-1.5 rounded-full hover:bg-white/10 text-rose-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1 ${
            showPanel ? 'bg-pink-500/30 text-white' : ''
          }`}
          title="Select Music Option"
        >
          <Music className="w-4 h-4" />
          <Settings2 className="w-3 h-3 text-pink-300" />
        </button>
      </div>
    </div>
  );
}

