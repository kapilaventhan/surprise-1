import { defaultBirthdayConfig } from './defaultContent';

// Easy configuration area as specified in guidelines
export const birthdayPassword = "march12";

export const birthdayVideo = {
  enabled: true,
  source: "assets/video/myvideo.mp4",
  title: "A Special Message Just For You",
  thumbnail: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80"
};

export const birthdayMusic = {
  enabled: true,
  file: "assets/music/song.mp3"
};

export const birthdayConfig = {
  ...defaultBirthdayConfig,
  password: birthdayPassword,
  birthdayVideo,
  birthdayMusic
};

export default birthdayConfig;
