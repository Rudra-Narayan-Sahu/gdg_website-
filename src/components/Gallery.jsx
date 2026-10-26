import React, { useState } from 'react';

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

export default function Gallery({ onOpenGalleryPage }) {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="section-title reveal-on-scroll">Gallery</h2>
      <p className="section-subtitle reveal-on-scroll">
        Take a look at some of our recent events and activities.
      </p>

      <div className="grid-container">
        {galleryItems.map((item, idx) => (
          <div
            key={item.id}
            className={`grid-item ${item.isLarge ? 'item1' : ''} ${item.isWide ? 'wide' : ''} gal${idx + 1} reveal-on-scroll reveal-delay-${(idx % 3) + 1}`}
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

      <div className="more-event reveal-on-scroll">
        <button
          type="button"
          onClick={onOpenGalleryPage}
          className="visit-btn gallery-btn"
        >
          <span>
            <i className="fa-regular fa-image"></i>
          </span>
          Visit Gallery Section
        </button>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="lightbox-overlay"
          onClick={() => setActivePhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '88vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              style={{
                position: 'absolute',
                top: '-45px',
                right: '0px',
                background: 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                color: 'white',
                fontSize: '1.75rem',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={activePhoto.img}
              alt={activePhoto.caption}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '1rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                objectFit: 'contain',
              }}
            />
            <p
              style={{
                color: '#ffffff',
                marginTop: '1rem',
                fontSize: '1.15rem',
                textAlign: 'center',
                fontFamily: 'Lexend, sans-serif',
                fontWeight: '400',
              }}
            >
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
