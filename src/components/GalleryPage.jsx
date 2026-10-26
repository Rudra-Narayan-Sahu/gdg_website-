import React, { useEffect, useState } from 'react';

const galleryItems = [
  {
    id: 1,
    img: 'https://ik.imagekit.io/mzqqngfdb/gallery/photo_1.jpg',
    caption: 'Workshop Session in Progress - Hands-on Lab',
    isLarge: true,
  },
  {
    id: 2,
    img: 'https://ik.imagekit.io/mzqqngfdb/gallery/photo_2.jpg',
    caption: 'A Chatbot Talks. An Agent Gets Things Done.',
    isLarge: false,
  },
  {
    id: 3,
    img: 'https://ik.imagekit.io/mzqqngfdb/gallery/photo_5.jpg',
    caption: 'Architecting Intelligence: Cloud Foundations to Agentic Ecosystem',
    isLarge: false,
  },
  {
    id: 4,
    img: 'https://ik.imagekit.io/mzqqngfdb/gallery/photo_4.jpg',
    caption: 'Speaker Addressing the Participants',
    isLarge: false,
  },
  {
    id: 5,
    img: 'https://ik.imagekit.io/mzqqngfdb/gallery/photo_3.jpg',
    caption: 'Engaged Students and Hands-on Coding',
    isLarge: false,
  },
  {
    id: 6,
    img: 'https://ik.imagekit.io/mzqqngfdb/gallery/photo_6.jpg',
    caption: 'Interactive Lab Discussion and Keynote',
    isLarge: false,
  },
  {
    id: 7,
    img: 'https://ik.imagekit.io/mzqqngfdb/1792613993134.jpg',
    caption: 'Community Event Moments',
    isLarge: false,
  },
  {
    id: 8,
    img: 'https://ik.imagekit.io/mzqqngfdb/gallery/photo_7.jpg',
    caption: 'Grand Auditorium Gathering at GIET University',
    isWide: true,
  },
];

export default function GalleryPage({ onBackToHome }) {
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="standalone-page">
      <div className="page-header">
        <button type="button" onClick={onBackToHome} className="back-home-btn">
          <i className="fa-solid fa-arrow-left"></i> Back to Home
        </button>
      </div>

      <section className="gallery-section" id="gallery">
        <h2 className="section-title reveal-on-scroll">GDG Gallery</h2>
        <p className="section-subtitle reveal-on-scroll">The Wall Of Triumphs & Setbacks</p>

        <div className="grid-container">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              className={`grid-item ${item.isLarge ? 'item1' : ''} ${item.isWide ? 'wide' : ''} reveal-on-scroll reveal-delay-${(idx % 3) + 1}`}
              onClick={() => setActivePhoto(item)}
              style={{ cursor: 'pointer' }}
              title={item.caption}
            >
              <div
                className={`grid-inner-img ${item.isLarge ? 'large' : `item${idx + 1}`}`}
                style={{ backgroundImage: `url("${item.img}")` }}
              ></div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="lightbox-overlay"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo view"
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="lightbox-close-btn"
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <img
              src={activePhoto.img}
              alt={activePhoto.caption}
              className="lightbox-image"
            />
            <p className="lightbox-caption">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
