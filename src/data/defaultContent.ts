import { BirthdayConfig } from '../types';

export const defaultBirthdayConfig: BirthdayConfig = {
  herName: "My Sweetheart",
  yourName: "Forever Yours",
  tagline: "My favorite person in the whole world.",
  targetDate: "2026-08-08T00:00:00",
  letterText: `Happy Birthday, My Love ❤️

Every day with you becomes one of my favorite memories.

Your smile makes ordinary moments feel extraordinary.

Thank you for your kindness, your laughter, your support, and for simply being you.

I hope this small surprise reminds you how deeply you are loved and appreciated.

May this birthday bring you happiness, success, good health, and countless beautiful moments.

I look forward to making many more memories together.

Happy Birthday once again.

With all my love,`,
  endingText: [
    "No matter where life takes us...",
    "No matter how many birthdays we celebrate...",
    "No matter what happens...",
    "I will always choose you.",
    "Happy Birthday, My Love ❤️"
  ],
  musicUrl: "", // Defaults to Web Audio Romantic Synth or custom upload
  videoUrl: "assets/videos/birthday.mp4",
  birthdayVideo: {
    enabled: true,
    source: "assets/videos/birthday.mp4",
    title: "Recorded With Love ❤️",
    thumbnail: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80"
  },
  memories: [
    {
      id: "1",
      date: "The First Spark",
      title: "The Day We Met",
      description: "The universe aligned and my whole life changed in a single instant. I still remember what you were wearing and the way your laugh lit up the entire room.",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      tag: "First Sight"
    },
    {
      id: "2",
      date: "Hours Felt Like Minutes",
      title: "Our First Conversation",
      description: "We started talking and couldn't stop. From deep dreams to silly jokes, I knew right then that I had found my soulmate.",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      tag: "Connection"
    },
    {
      id: "3",
      date: "Captured Memories",
      title: "Our First Selfie",
      description: "Both of us smiling nervously, trying to look cute. That photo is still my absolute favorite wallpaper.",
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      tag: "Smile"
    },
    {
      id: "4",
      date: "Tears of Joy",
      title: "Our Funniest Memory",
      description: "The spontaneous midnight adventure where everything went wrong, yet we couldn't stop laughing till our stomachs hurt.",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      tag: "Laughter"
    },
    {
      id: "5",
      date: "Pure Magic",
      title: "Our Favorite Day",
      description: "Sunset walk by the water, hand in hand, with nowhere else in the world we'd rather be.",
      imageUrl: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80",
      tag: "Unforgettable"
    },
    {
      id: "6",
      date: "Special Birthday",
      title: "Today ❤️",
      description: "Celebrating another year of your incredible life, your beauty, and the pure joy you bring into my world every single day.",
      imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
      tag: "Celebration"
    }
  ],
  galleryPhotos: [
    {
      id: "p1",
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
      title: "Sweet Moments",
      caption: "Your smile brightens even the cloudiest days."
    },
    {
      id: "p2",
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
      title: "Golden Hour Walk",
      caption: "Hand in hand, strolling through golden light."
    },
    {
      id: "p3",
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
      title: "Laughter & Joy",
      caption: "My favorite sound is the sound of your laughter."
    },
    {
      id: "p4",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
      title: "Unforgettable Date",
      caption: "Making memories that will last a lifetime."
    },
    {
      id: "p5",
      url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=1000&q=80",
      title: "Sunset Magic",
      caption: "Watching the sun go down with my favorite person."
    },
    {
      id: "p6",
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=80",
      title: "Birthday Wishes",
      caption: "May all your dreams come true today and always."
    }
  ],
  reasons: [
    { id: "r1", title: "Your Smile", description: "It lights up every room and instantly puts a smile on my face.", icon: "Sparkles" },
    { id: "r2", title: "Your Caring Heart", description: "You care so deeply about everyone around you with selfless empathy.", icon: "Heart" },
    { id: "r3", title: "Your Kindness", description: "Your gentle soul and thoughtful words bring warmth to every day.", icon: "Sun" },
    { id: "r4", title: "Your Beautiful Eyes", description: "I can look into your eyes forever and see my entire future.", icon: "Eye" },
    { id: "r5", title: "Your Laugh", description: "The sweetest melody in the world that brings pure happiness to my heart.", icon: "Music" },
    { id: "r6", title: "Your Patience", description: "How gentle and understanding you are, even in challenging moments.", icon: "Shield" },
    { id: "r7", title: "Your Support", description: "You are my biggest cheerleader and my safest anchor through everything.", icon: "Compass" },
    { id: "r8", title: "Your Honesty", description: "The genuine truth, openness, and trust we share together.", icon: "Key" },
    { id: "r9", title: "Your Intelligence", description: "Your sharp mind, witty insights, and fascinating perspectives.", icon: "Brain" },
    { id: "r10", title: "Your Cute Expressions", description: "The adorable faces you make when you are excited, thinking, or happy.", icon: "Smile" },
    { id: "r11", title: "Your Positivity", description: "How you find light in every situation and inspire me to be better.", icon: "Zap" },
    { id: "r12", title: "Everything About You", description: "Simply put, I love every single detail of who you are, inside and out.", icon: "Crown" }
  ],
  loveQuotes: [
    { id: "q1", quote: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", author: "Maya Angelou" },
    { id: "q2", quote: "If I had a flower for every time I thought of you, I could walk through my garden forever.", author: "Alfred Lord Tennyson" },
    { id: "q3", quote: "You are my sun, my moon, and all my stars.", author: "E.E. Cummings" },
    { id: "q4", quote: "I love you not only for what you are, but for what I am when I am with you.", author: "Roy Croft" },
    { id: "q5", quote: "Grow old along with me! The best is yet to be.", author: "Robert Browning" }
  ],
  password: "march12",
  passwordHint: "Our special birthday date (march12)",
  birthdayMusic: {
    enabled: true,
    file: "assets/music/song.mp3"
  },
  floatingNotes: [
    "❤️ You make my world brighter.",
    "❤️ Thank you for being you.",
    "❤️ You are my favorite notification.",
    "❤️ Forever starts with you.",
    "❤️ You are my happiest place.",
    "❤️ Every moment with you is special.",
    "❤️ My heart is forever yours.",
    "❤️ Wishing you the happiest birthday!",
    "❤️ You make every day brighter.",
    "❤️ I love your smile."
  ],
  storybookPages: [
    {
      id: "sb1",
      title: "First Meeting",
      subtitle: "When time stood still",
      content: "The moment our eyes met, the world faded into soft focus. I didn't know it yet, but my life was about to become infinitely sweeter.",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      date: "Chapter 1"
    },
    {
      id: "sb2",
      title: "First Chat",
      subtitle: "Hours felt like seconds",
      content: "We talked about everything and nothing. Sparks flew through every word, and I couldn't stop smiling at my phone.",
      imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      date: "Chapter 2"
    },
    {
      id: "sb3",
      title: "First Smile",
      subtitle: "The light in your eyes",
      content: "The first time you laughed truly from your heart, I was completely captivated. Your laugh remains my absolute favorite sound in the world.",
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      date: "Chapter 3"
    },
    {
      id: "sb4",
      title: "Favorite Memory",
      subtitle: "Our sunset escape",
      content: "Walking along the shore, listening to the gentle ocean breeze, realizing that home isn't a place—it's a person, and you are mine.",
      imageUrl: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80",
      date: "Chapter 4"
    },
    {
      id: "sb5",
      title: "Today",
      subtitle: "A day to celebrate you",
      content: "Another year around the sun for the most gorgeous, kind-hearted soul. Celebrating you is the greatest joy of my life.",
      imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
      date: "Chapter 5"
    },
    {
      id: "sb6",
      title: "Happy Birthday",
      subtitle: "Forever & Always",
      content: "Here is to unlimited adventures, endless giggles, warm hugs, and a lifetime of love. Happy Birthday, my love! ❤️",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      date: "Chapter 6"
    }
  ],
  treasureItems: [
    {
      id: "t1",
      title: "Golden Hour Memory",
      caption: "The evening light painted the sky in rose gold, but you were still the brightest sight.",
      imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
      secretNote: "You make every golden hour feel magical."
    },
    {
      id: "t2",
      title: "Our Unfiltered Laughter",
      caption: "A candid moment caught when we were belly-laughing over inside jokes.",
      imageUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
      secretNote: "Your smile is my favorite drug."
    },
    {
      id: "t3",
      title: "Midnight Walk",
      caption: "Late night strolls under starry skies with quiet whispers and held hands.",
      imageUrl: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=800&q=80",
      secretNote: "I'll walk with you through any night."
    },
    {
      id: "t4",
      title: "Birthday Wish Polaroid",
      caption: "Capturing your birthday glow to hold onto forever.",
      imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
      secretNote: "May all your birthday wishes come true!"
    }
  ],
  hiddenHeartsNotes: [
    "Secret Heart #1: Your smile brightens up my darkest days! ✨",
    "Secret Heart #2: You are my safest comfort and my happiest place. ❤️",
    "Secret Heart #3: I fall in love with you more and more every morning. 🌅",
    "Secret Heart #4: Your kindness makes this world a softer, warmer place. 🌸",
    "Secret Heart #5: I love the way your eyes sparkle when you laugh. 👀💖",
    "Secret Heart #6: Holding your hand is my absolute favorite thing. 🤝",
    "Secret Heart #7: Thank you for being my soulmate and best friend. 👯‍♂️",
    "Secret Heart #8: Life with you is a dream come true. 🌙✨",
    "Secret Heart #9: Every love song finally makes sense because of you. 🎵",
    "Secret Heart #10: You found all 10 secret hearts! You unlocked my whole heart forever! 👑💖🎉"
  ],
  hundredReasons: [
    "The way your eyes light up when you speak about things you love.",
    "Your beautiful, heart-melting smile.",
    "How kind and compassionate you are to everyone.",
    "The cute sound of your laugh.",
    "How comfortable I feel whenever I am with you.",
    "Your warm, reassuring hugs.",
    "The way you remember small details about me.",
    "Your endless patience and understanding.",
    "Your brilliant, sharp sense of humor.",
    "How you make ordinary days feel like extraordinary adventures.",
    "Your soft touch that instantly calms my soul.",
    "The way you look at me when you think I'm not noticing.",
    "Your unyielding loyalty and honesty.",
    "How gentle you are with animals and nature.",
    "Your passionate drive to follow your dreams.",
    "The way you cheer me up whenever I feel down.",
    "Your adorable morning voice.",
    "How beautiful you look even in simple cozy clothes.",
    "Your thoughtful surprises and gestures.",
    "The way you hold my hand in public.",
    "Your silly dances when you are happy.",
    "How intelligent and perceptive you are.",
    "The way you smell so heavenly.",
    "How safe I feel in your arms.",
    "Your unwavering support in everything I do.",
    "How you listen to me with genuine care.",
    "Your adorable reactions when you get excited.",
    "The way you say my name.",
    "Your infectious enthusiasm.",
    "How you inspire me to be a better person every day.",
    "Your sweet bedtime messages.",
    "The way you care for your family and friends.",
    "Your cute sleepy eyes.",
    "How you make me feel like the luckiest person alive.",
    "Your spontaneous ideas and fun spirit.",
    "The way you make any place feel like home.",
    "Your love for good food and cozy treats.",
    "How forgiving and understanding you are.",
    "Your grace and elegance in everything you do.",
    "The way we can communicate with just a glance.",
    "Your soft lips and sweet kisses.",
    "How you make even sitting in silence feel romantic.",
    "Your bravery in facing life's challenges.",
    "The cute way you pout when pretending to be mad.",
    "Your optimistic outlook on the future.",
    "How deeply you love and protect those you care for.",
    "Your artistic and creative mind.",
    "The way you make my heart skip a beat every time I see you.",
    "Your wonderful taste in music and movies.",
    "How you make me laugh until my stomach hurts.",
    "Your open-mindedness and kindness.",
    "The way you snuggle close when it's chilly.",
    "Your radiant energy that brightens any room.",
    "How you make every holiday feel like magic.",
    "Your sweet, reassuring words when I worry.",
    "The way your cheek dimples when you grin.",
    "Your playful teasings and witty banter.",
    "How you always know how to make me feel special.",
    "Your love for starry nights and sunsets.",
    "The way you make time for us no matter how busy life gets.",
    "Your respect and honor for our relationship.",
    "How you bring peace into my chaotic mind.",
    "Your cute, expressionful face when concentrating.",
    "The way you tilt your head when listening intently.",
    "Your belief in me even when I doubt myself.",
    "How effortlessly gorgeous you are inside and out.",
    "Your genuine modesty and humility.",
    "The way you celebrate my victories like your own.",
    "Your generous spirit and big heart.",
    "How you turn simple walks into unforgettable dates.",
    "Your cute sleepy sighs.",
    "The way you love taking photos to capture our memories.",
    "Your warm heart that accepts me completely as I am.",
    "How you make me feel understood without explaining.",
    "Your love for cozy rainy days.",
    "The way you look in golden hour sunlight.",
    "Your unique perspective on the world.",
    "How you notice when something is bothering me before I say it.",
    "Your cute habit of humming or singing softly.",
    "The way you make every birthday feel like a royal celebration.",
    "Your deep emotional maturity.",
    "How you bring out the happiest version of me.",
    "Your adorable sleepy morning hair.",
    "The way you make my home feel filled with love.",
    "Your comforting presence during difficult times.",
    "How you make me look forward to growing old together.",
    "Your sweet text messages out of nowhere.",
    "The way you make my heart race with just a smile.",
    "Your ability to find beauty in the simplest things.",
    "How you make me feel valued and treasured every single day.",
    "Your hilarious expressions during funny moments.",
    "The way you wrap your arms around me.",
    "Your gentle soul that spreads joy everywhere you go.",
    "How you remember our anniversaries and special milestones.",
    "Your dedication to our future together.",
    "The way you shine like a bright star in my universe.",
    "Your love for romantic gestures and handwritten notes.",
    "Because life without you is unimaginable.",
    "Because you are my soulmate, my best friend, and my whole world.",
    "Because I will love you today, tomorrow, and forever! ❤️"
  ]
};
