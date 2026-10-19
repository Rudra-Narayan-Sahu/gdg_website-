import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [positions, setPositions] = useState([0, 1, 2]); // Slot indices for [card1, card2, card3]
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Compute CSS left and transform based on current slot (0 = left, 1 = center, 2 = right)
  const getCardStyle = (slot) => {
    if (!isMobile) {
      if (slot === 0) {
        return {
          left: '17.5%',
          transform: 'rotate(-5deg) scale(0.9)',
          zIndex: 1,
        };
      }
      if (slot === 1) {
        return {
          left: '37.5%',
          transform: 'rotate(0deg) scale(1) translateY(-20px)',
          zIndex: 3,
        };
      }
      return {
        left: '57.5%',
        transform: 'rotate(5deg) scale(0.9)',
        zIndex: 2,
      };
    } else {
      // Mobile
      if (slot === 0) {
        return {
          left: '-12.5%',
          transform: 'rotate(-5deg) scale(0.9)',
          zIndex: 1,
        };
      }
      if (slot === 1) {
        return {
          left: '20%',
          transform: 'rotate(0deg) scale(1) translateY(-20px)',
          zIndex: 3,
        };
      }
      return {
        left: '52.5%',
        transform: 'rotate(5deg) scale(0.9)',
        zIndex: 2,
      };
    }
  };

  return (
    <section className="hero-section" id="home">
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
