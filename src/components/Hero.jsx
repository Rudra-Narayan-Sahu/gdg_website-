import React, { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [positions, setPositions] = useState([0, 1, 2]); // Slot indices for [card1, card2, card3]
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Card swapping animation loop
  useEffect(() => {
    const runCycle = () => {
      // Step 1: swap card 1 and card 2
      const t1 = setTimeout(() => {
        setPositions((prev) => [prev[1], prev[0], prev[2]]);
      }, 1000);

      // Step 2: swap card 2 and card 3
      const t2 = setTimeout(() => {
        setPositions((prev) => [prev[0], prev[2], prev[1]]);
      }, 2000);

      // Step 3: swap card 3 and card 1
      const t3 = setTimeout(() => {
        setPositions((prev) => [prev[2], prev[1], prev[0]]);
      }, 3000);

      return [t1, t2, t3];
    };

    let timers = runCycle();
    const interval = setInterval(() => {
      timers = runCycle();
    }, 4000);

    return () => {
      clearInterval(interval);
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Reverse-Engineered Creative Fellowship Canvas Scratch Hover Animation
  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const virtualPxY = 90;
    let virtualPxX = 144;

    const initCanvas = () => {
      const rect = hero.getBoundingClientRect();
      const aspect = rect.width / (rect.height || 1);
      virtualPxX = Math.round(virtualPxY * aspect) || 144;
      canvas.width = virtualPxX;
      canvas.height = virtualPxY;

      // Fill with white mask (#ffffff)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, virtualPxX, virtualPxY);
    };

    initCanvas();
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, []);

  // Hover Scratch Handler
  const handleHeroHover = (e) => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = hero.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

    const x = Math.round(((clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.round(((clientY - rect.top) / rect.height) * canvas.height);

    // Exact Bresenham Midpoint Aliased Circle Scanline
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    const size = 10;
    let c = size / 2;
    let b = c;
    let f = 0, g = 0;

    ctx.rect(x - b, y, c * 2, 1);
    while (b > f) {
      g -= --b - ++f;
      if (g < 0) g += b++;
      c = f * 2;
      const m = b * 2;
      ctx.rect(x - f, y - b, c, 1);
      ctx.rect(x - b, y - f, m, 1);
      ctx.rect(x - b, y + f, m, 1);
      ctx.rect(x - f, y + b, c, 1);
    }
    ctx.fill();
  };

  // Compute CSS GPU-accelerated translate3d based on current slot (0 = left, 1 = center, 2 = right)
  const getCardStyle = (slot) => {
    if (!isMobile) {
      if (slot === 0) {
        return {
          left: '50%',
          transform: 'translate3d(calc(-50% - clamp(210px, 22vw, 320px)), 0px, 0) rotate(-6deg) scale(0.9)',
          zIndex: 1,
        };
      }
      if (slot === 1) {
        return {
          left: '50%',
          transform: 'translate3d(-50%, -24px, 0) rotate(0deg) scale(1.04)',
          zIndex: 3,
        };
      }
      return {
        left: '50%',
        transform: 'translate3d(calc(-50% + clamp(210px, 22vw, 320px)), 0px, 0) rotate(6deg) scale(0.9)',
        zIndex: 2,
      };
    } else {
      // Mobile
      if (slot === 0) {
        return {
          left: '50%',
          transform: 'translate3d(calc(-50% - 33vw), 0px, 0) rotate(-6deg) scale(0.88)',
          zIndex: 1,
        };
      }
      if (slot === 1) {
        return {
          left: '50%',
          transform: 'translate3d(-50%, -18px, 0) rotate(0deg) scale(1.02)',
          zIndex: 3,
        };
      }
      return {
        left: '50%',
        transform: 'translate3d(calc(-50% + 33vw), 0px, 0) rotate(6deg) scale(0.88)',
        zIndex: 2,
      };
    }
  };

  return (
    <section
      className="hero-section"
      id="home"
      ref={heroRef}
      onMouseMove={handleHeroHover}
      onTouchMove={handleHeroHover}
    >
      {/* Reverse-Engineered Conic Gradient Reveal Layer */}
      <div className="hero-conic-bg" aria-hidden="true" />

      {/* Reverse-Engineered Pixelated Low-Res Scratch Canvas Mask */}
      <canvas className="hero-scratch-canvas" ref={canvasRef} aria-hidden="true" />

      <div className="hero-text">
        <div className="brand-logo">
          <h1>WE ARE</h1>
        </div>
        <div className="brand-quote">
          <h2>
            GDG<span> On Campus </span> GIET University , Gunupur
          </h2>
        </div>
      </div>

      <div className="cards-container">
        <div
          className="card hero-card"
          id="card1"
          style={getCardStyle(positions[0])}
        ></div>
        <div
          className="card hero-card"
          id="card2"
          style={getCardStyle(positions[1])}
        ></div>
        <div
          className="card hero-card"
          id="card3"
          style={getCardStyle(positions[2])}
        ></div>
      </div>
    </section>
  );
}
