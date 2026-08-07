import { useEffect } from 'react';

export function CursorTrail() {
  useEffect(() => {
    // Only execute on devices with mouse/pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let throttleTimeout: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimeout) return;

      throttleTimeout = window.setTimeout(() => {
        throttleTimeout = null;
      }, 40);

      // Create glowing heart or sparkle particle
      const spark = document.createElement('div');
      spark.className = 'sparkle-particle';
      
      const isHeart = Math.random() < 0.4;
      if (isHeart) {
        spark.innerHTML = '❤️';
        spark.style.fontSize = `${Math.random() * 12 + 10}px`;
      } else {
        spark.style.width = `${Math.random() * 6 + 4}px`;
        spark.style.height = spark.style.width;
        spark.style.backgroundColor = Math.random() < 0.5 ? '#FF6FAE' : '#FFD700';
        spark.style.boxShadow = '0 0 10px #FF6FAE, 0 0 20px #C084FC';
      }

      spark.style.left = `${e.clientX - 8}px`;
      spark.style.top = `${e.clientY - 8}px`;

      document.body.appendChild(spark);

      setTimeout(() => {
        spark.remove();
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}
