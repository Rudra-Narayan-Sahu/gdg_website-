import React from 'react';

function getYouTubeVideoID(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

const videosData = [
  {
    id: 1,
    url: 'https://youtu.be/mJvjk68QKeA?si=JJoNLpYWxqJhWrgG',
    heading: 'Rebase01 GDG IIIT Kalyani',
    description:
      'Join us for an in-depth discussion on the latest trends in web development. Learn about modern tools and technologies that are transforming the way developers work, and get insights from industry experts.',
  },
  {
    id: 2,
    url: 'https://youtu.be/DVLodCvqfzM?si=w8ZLpKxNomStqTCE',
    heading: 'AIML Session',
    description:
      'Join us for an in-depth discussion on the latest trends in web development. Learn about modern tools and technologies that are transforming the way developers work, and get insights from industry experts.',
  },
  {
    id: 3,
    url: 'https://youtu.be/UjWyAlKDQfg?si=ChOqXubfBtPuyx4a',
    heading: 'Flutter Session ',
    description:
      'Join us for an in-depth discussion on the latest trends in web development. Learn about modern tools and technologies that are transforming the way developers work, and get insights from industry experts.',
  },
];

export default function YouTube() {
  return (
    <section className="youtube-section">
      <h2 className="ytsection-title">GDG YouTube</h2>
      <p className="ytsection-subtitle">
        Join us for exciting upcoming events that bring the community together!
      </p>

      <div className="videos-cards">
        {videosData.map((vid, index) => {
          const videoId = getYouTubeVideoID(vid.url);
          const thumbnailSrc = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : '';

          return (
            <div key={vid.id} className={`video-card ytcr${index + 1}`}>
              <div className="yttmb">
                <img
                  id={`thumbnail${index + 1}`}
                  src={thumbnailSrc}
                  alt={vid.heading}
                  loading="lazy"
                />
              </div>
              <div className="card-content ytdic">
                <div className="top">
                  <h2 className="card-heading">{vid.heading}</h2>
                  <p className="card-description">{vid.description}</p>
                </div>
                <div className="btm">
                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yttbn"
                  >
                    Watch on youtube
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="more-event">
        <a
          href="https://www.youtube.com/@gdsciiitkalyani/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="visit-btn ytvisit"
        >
          <span>
            <i className="fa-brands fa-youtube"></i>
          </span>
          Visit Our YouTube Page
        </a>
      </div>
    </section>
  );
}
