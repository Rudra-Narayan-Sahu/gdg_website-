import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ConcentricCircles, BottomLeftShapes } from './HeroShapes';

// Useful GDG & tech words scattered across the hero underneath the white grid mask
const USEFUL_WORDS = [
  // Left gutter zone (clear of center cards, heading, and bottom-left shapes matrix)
  { id: 1, text: 'Minds', x: '5%', y: '20%', rot: -2, tag: 'COMMUNITY' },
  { id: 2, text: '< learn & build />', x: '18%', y: '16%', rot: 1, tag: 'WORKSHOPS' },
  { id: 9, text: 'creative tech', x: '6%', y: '48%', rot: -2, tag: 'DESIGN' },
  { id: 7, text: 'peer learning', x: '18%', y: '84%', rot: -1, tag: 'GROWTH' },

  // Right gutter zone (clear of center cards, heading, and top-right concentric circles)
  { id: 3, text: 'hackathons', x: '70%', y: '16%', rot: -2, tag: 'COMPETE' },
  { id: 4, text: 'tech talks', x: '74%', y: '28%', rot: 1, tag: 'EVENTS' },
  { id: 10, text: 'developers first', x: '81%', y: '48%', rot: 2, tag: 'CULTURE' },
  { id: 5, text: 'open source', x: '82%', y: '64%', rot: 2, tag: 'CONTRIBUTE' },
  { id: 6, text: 'solution challenge', x: '77%', y: '78%', rot: -1, tag: 'IMPACT' },
  { id: 8, text: 'code & coffee', x: '75%', y: '90%', rot: -2, tag: 'MEETUPS' },
];

// Master toggle for the scratch hover effect (set to true when you want to activate it)
const ENABLE_HOVER_SCRATCH = false;

export default function Hero() {
  const [positions, setPositions] = useState([0, 1, 2]); // Slot indices for [card1, card2, card3]
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const lastPosRef = useRef(null);
  const idleTimerRef = useRef(null);
  const particlesRef = useRef([]);

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
      const t1 = setTimeout(() => {
        setPositions((prev) => [prev[1], prev[0], prev[2]]);
      }, 1000);

      const t2 = setTimeout(() => {
        setPositions((prev) => [prev[0], prev[2], prev[1]]);
      }, 2000);

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

  // Chunky pixel erase stamping with quantized block grid (matching Image 2)
  const erasePixelBlock = useCallback((ctx, cx, cy, radius = 52) => {
    const CHUNK = 8; // 8px chunky blocks for authentic retro pixelated edge
    const r2 = radius * radius;

    for (let dx = -radius; dx <= radius; dx += CHUNK) {
      for (let dy = -radius; dy <= radius; dy += CHUNK) {
        if (dx * dx + dy * dy <= r2) {
          const px = Math.floor((cx + dx) / CHUNK) * CHUNK;
          const py = Math.floor((cy + dy) / CHUNK) * CHUNK;
          ctx.fillRect(px, py, CHUNK, CHUNK);
        }
      }
    }
  }, []);

  // Interpolated line of erase stamps for silky smooth brush strokes
  const eraseBetween = useCallback((ctx, x0, y0, x1, y1, radius = 52) => {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(1, Math.floor(dist / 10));

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x0 + (x1 - x0) * t;
      const y = y0 + (y1 - y0) * t;
      erasePixelBlock(ctx, x, y, radius);
    }
    ctx.restore();
  }, [erasePixelBlock]);

  // Paint the white grid mask (matching reference image thickness and color exactly)
  const drawWhiteGridMask = useCallback(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // 1. Fill solid crisp white
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // 2. Draw clean 1px engineering grid lines with wider gap and reduced opacity
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.045)'; // Reduced opacity, ultra-clean and subtle
    ctx.lineWidth = 1 / dpr; // 1 physical pixel width
    const gridSize = 58; // Wider gap between grid lines

    ctx.beginPath();
    for (let x = 0; x <= rect.width; x += gridSize) {
      const lineX = Math.round(x * dpr) / dpr + (0.5 / dpr);
      ctx.moveTo(lineX, 0);
      ctx.lineTo(lineX, rect.height);
    }
    for (let y = 0; y <= rect.height; y += gridSize) {
      const lineY = Math.round(y * dpr) / dpr + (0.5 / dpr);
      ctx.moveTo(0, lineY);
      ctx.lineTo(rect.width, lineY);
    }
    ctx.stroke();

    // Re-seed autonomous idle bouncing particles
    particlesRef.current = [
      { x: Math.min(180, rect.width * 0.15), y: 160, vx: 2.2, vy: 1.6, r: 44 },
      { x: Math.max(rect.width - 200, rect.width * 0.85), y: 220, vx: -2.0, vy: 2.0, r: 48 },
    ];
  }, []);

  // Initialize canvas on mount and window resize
  useEffect(() => {
    if (!ENABLE_HOVER_SCRATCH) return;
    drawWhiteGridMask();

    const handleResize = () => {
      drawWhiteGridMask();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawWhiteGridMask]);

  // Autonomous idle bouncing brush (from Google Creative Fellowship reverse engineered engine)
  useEffect(() => {
    if (!ENABLE_HOVER_SCRATCH) return;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (idleTimerRef.current) clearInterval(idleTimerRef.current);

    idleTimerRef.current = setInterval(() => {
      const rect = hero.getBoundingClientRect();
      const parts = particlesRef.current;
      if (!parts || parts.length === 0) return;

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';

      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x - p.r < 0) {
          p.x = p.r;
          p.vx = Math.abs(p.vx);
        } else if (p.x + p.r > rect.width) {
          p.x = rect.width - p.r;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y - p.r < 0) {
          p.y = p.r;
          p.vy = Math.abs(p.vy);
        } else if (p.y + p.r > rect.height) {
          p.y = rect.height - p.r;
          p.vy = -Math.abs(p.vy);
        }

        erasePixelBlock(ctx, p.x, p.y, p.r);
      });

      ctx.restore();
    }, 45);

    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
  }, [erasePixelBlock]);

  // User Hover Scratch Handler (Desktop Mouse & Mobile Touch)
  const handleHeroHover = (e) => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = hero.getBoundingClientRect();
    const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : null);
    const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : null);

    if (clientX === null || clientY === null) return;

    const curX = clientX - rect.left;
    const curY = clientY - rect.top;

    if (lastPosRef.current) {
      eraseBetween(ctx, lastPosRef.current.x, lastPosRef.current.y, curX, curY, isMobile ? 42 : 55);
    } else {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      erasePixelBlock(ctx, curX, curY, isMobile ? 42 : 55);
      ctx.restore();
    }

    lastPosRef.current = { x: curX, y: curY };
  };

  const handlePointerLeave = () => {
    lastPosRef.current = null;
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
      // Mobile - nicely proportioned stacked fan
      if (slot === 0) {
        return {
          left: '50%',
          transform: 'translate3d(calc(-50% - clamp(60px, 24vw, 100px)), 4px, 0) rotate(-7deg) scale(0.9)',
          zIndex: 1,
        };
      }
      if (slot === 1) {
        return {
          left: '50%',
          transform: 'translate3d(-50%, -14px, 0) rotate(0deg) scale(1.02)',
          zIndex: 3,
        };
      }
      return {
        left: '50%',
        transform: 'translate3d(calc(-50% + clamp(60px, 24vw, 100px)), 4px, 0) rotate(7deg) scale(0.9)',
        zIndex: 2,
      };
    }
  };

  return (
    <section
      className="hero-section"
      id="home"
      ref={heroRef}
      onMouseMove={ENABLE_HOVER_SCRATCH ? handleHeroHover : undefined}
      onTouchMove={ENABLE_HOVER_SCRATCH ? handleHeroHover : undefined}
      onMouseLeave={ENABLE_HOVER_SCRATCH ? handlePointerLeave : undefined}
      onTouchEnd={ENABLE_HOVER_SCRATCH ? handlePointerLeave : undefined}
    >
      {/* Scratch Reveal Layers (Disabled for now until activated) */}
      {ENABLE_HOVER_SCRATCH && (
        <>
          {/* Layer 1: Vibrant Conic Gradient underneath */}
          <div className="hero-conic-bg" aria-hidden="true" />

          {/* Layer 2: Scattered Useful GDG Words */}
          <div className="hero-words-layer" aria-hidden="true">
            {USEFUL_WORDS.map((item) => (
              <div
                key={item.id}
                className="hero-word-pill"
                style={{
                  left: item.x,
                  top: item.y,
                  transform: `rotate(${item.rot}deg)`,
                }}
              >
                <span className="hero-word-text">{item.text}</span>
                <span className="hero-word-tag">{item.tag}</span>
              </div>
            ))}
          </div>

          {/* Layer 3: Opaque White Grid Mask Canvas */}
          <canvas className="hero-scratch-canvas" ref={canvasRef} aria-hidden="true" />
        </>
      )}

      {/* Layer 3.5: Reverse-Engineered Animated Elements (gdsc-nitr.netlify.app) */}
      {/* Top-Right Rotating Concentric Circles */}
      <ConcentricCircles />

      {/* Bottom-Left Animated Pill & Dot Matrix */}
      <BottomLeftShapes />

      {/* Layer 4: Hero Branding Text */}
      <div className="hero-text">
        <div className="brand-logo">
          <h1>WE ARE</h1>
        </div>
        <div className="brand-quote">
          <h2>
            GDG<span> On Campus </span> GIET University, Gunupur
          </h2>
        </div>
      </div>

      {/* Layer 5: Rotating Community Cards */}
      <div className="cards-container">
        <div
          className="card hero-card"
          id="card1"
          style={getCardStyle(positions[0])}
          aria-label="Community card 1"
        ></div>
        <div
          className="card hero-card"
          id="card2"
          style={getCardStyle(positions[1])}
          aria-label="Community card 2"
        ></div>
        <div
          className="card hero-card"
          id="card3"
          style={getCardStyle(positions[2])}
          aria-label="Community card 3"
        ></div>
      </div>

      {/* Layer 6: Subtle Interactive Badge / Reset Mask Action (Only when active) */}
      {ENABLE_HOVER_SCRATCH && (
        <div
          className="hero-scratch-badge"
          onClick={drawWhiteGridMask}
          title="Click to reset canvas mask"
          role="button"
          tabIndex={0}
        >
          <span className="badge-icon">✦</span>
          <span>Hover to reveal</span>
          <span className="badge-reset-hint">Reset</span>
        </div>
      )}
    </section>
  );
}
