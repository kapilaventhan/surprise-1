import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  type: 'heart' | 'star' | 'bokeh' | 'particle';
  color: string;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const colors = ['#FF6FAE', '#C084FC', '#FFB6C1', '#FFD700', '#E0A96D'];

    // Generate balanced mix of glowing elements
    const count = Math.min(Math.floor((width * height) / 18000), 75);

    for (let i = 0; i < count; i++) {
      const typeRand = Math.random();
      const type: Particle['type'] = 
        typeRand < 0.25 ? 'heart' :
        typeRand < 0.55 ? 'star' :
        typeRand < 0.8 ? 'bokeh' : 'particle';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'heart' ? Math.random() * 14 + 10 :
              type === 'bokeh' ? Math.random() * 40 + 20 :
              type === 'star' ? Math.random() * 3 + 1.5 : Math.random() * 3 + 1,
        speedY: (Math.random() * 0.4 + 0.1) * (type === 'heart' ? -1 : 1),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        maxOpacity: Math.random() * 0.5 + 0.4,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        type,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Helper to draw heart shape on canvas
    const drawHeart = (x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        -size / 2, -topCurveHeight,
        -size, size / 3,
        0, size
      );
      // top right curve
      ctx.bezierCurveTo(
        size, size / 3,
        size / 2, -topCurveHeight,
        0, topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Helper to draw star shape on canvas
    const drawStar = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#C084FC';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Star flare lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x - size * 2.5, y);
      ctx.lineTo(x + size * 2.5, y);
      ctx.moveTo(x, y - size * 2.5);
      ctx.lineTo(x, y + size * 2.5);
      ctx.stroke();
      ctx.restore();
    };

    let gradientOffset = 0;

    const render = () => {
      gradientOffset += 0.002;
      
      // Animated gradient background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      const colorShift1 = Math.sin(gradientOffset) * 20;
      grad.addColorStop(0, `rgb(${15 + colorShift1}, 5, 30)`);
      grad.addColorStop(0.5, '#0b0518');
      grad.addColorStop(1, `rgb(20, ${10 + colorShift1}, 35)`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render each particle
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around boundaries
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;

        // Pulse opacity
        p.opacity += p.pulseSpeed;
        if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === 'star') {
          drawStar(p.x, p.y, p.size, p.opacity);
        } else if (p.type === 'bokeh') {
          ctx.save();
          ctx.globalAlpha = p.opacity * 0.25;
          const bgGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          bgGrad.addColorStop(0, p.color);
          bgGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = bgGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
