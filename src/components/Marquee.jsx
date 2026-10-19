import React from 'react';

export default function Marquee() {
  const items = [
    { text: 'DESIGN', icon: 'fa-solid fa-wand-magic-sparkles' },
    { text: 'CODE', icon: 'fa-solid fa-laptop-code' },
    { text: 'BUILD', icon: 'fa-regular fa-hand-peace' },
    { text: 'SLEEP', icon: 'fa-solid fa-bed' },
  ];

  // Repeat for continuous seamless loop
  return (
    <section className="marq">
      <div className="sep">
        {[1, 2, 3, 4].map((blockIndex) => (
          <div key={blockIndex} className="sep-marquee">
            {items.map((it, idx) => (
              <div key={idx} className="sep-marquee-item">
                {it.text} <i className={it.icon}></i>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
