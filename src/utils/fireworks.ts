import confetti from 'canvas-confetti';

export function triggerConfettiBurst() {
  // Fire multiple bursts of colorful hearts & stars confetti
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;

  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#FF6FAE', '#C084FC', '#FFD700', '#FF1493', '#FFFFFF']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#FF6FAE', '#C084FC', '#FFD700', '#FF1493', '#FFFFFF']
    });
  }, 250);
}

export function launchMassiveSurpriseFireworks() {
  // Hearts burst
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#FF6FAE', '#FF1493', '#FFB6C1', '#C084FC', '#FFD700'],
    scalar: 1.2
  });

  // Cannon left
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: ['#FF6FAE', '#FFD700', '#FFFFFF']
    });
  }, 300);

  // Cannon right
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: ['#C084FC', '#FF1493', '#FFD700']
    });
  }, 600);
}
