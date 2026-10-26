import React, { useEffect } from 'react';

const allEvents = [
  {
    id: 1,
    image: '/intro_gdg.png',
    date: 'October 6, 2026',
    type: ' • Panel',
    heading: 'From Experience to Expertise',
    description:
      'What better way to understand the journey than to hear it directly from those who have lived it? We brought together a panel of accomplished individuals who have transformed their initial experiences into inspiring success stories. Through their real-life experiences and valuable insights, we explored the key milestones, challenges, and turning points that paved their way to expertise.',
  },
  {
    id: 2,
    image: '/keploy.png',
    date: 'October 13, 2023',
    type: ' • Webinar',
    heading: 'Web Development Trends',
    description:
      'Join us for an in-depth discussion on the latest trends in web development. Learn about modern tools and technologies that are transforming the way developers work, and get insights from industry experts.',
  },
  {
    id: 3,
    image: '/keploy.png',
    date: 'October 20, 2026',
    type: ' • Workshop',
    heading: 'Build with AI',
    description:
      'Join us for an interactive session on building with AI. Learn about the latest tools and technologies in the field of artificial intelligence and get insights from industry experts.',
  },
];

export default function EventsPage({ onBackToHome }) {
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

      <section className="events-section" id="events">
        <h2 className="section-title reveal-on-scroll">GDG Events</h2>
        <p className="section-subtitle reveal-on-scroll">Past Events Of Our Community</p>

        <div className="events-cards">
          {allEvents.map((ev, index) => (
            <div key={ev.id} className={`event-card reveal-on-scroll reveal-delay-${(index % 3) + 1}`}>
              <div className="card-image">
                <img src={ev.image} alt={ev.heading} />
              </div>
              <div className="card-content">
                <div className="top">
                  <div className="card-date-type">
                    <span className="event-date">{ev.date}</span>
                    <span className="event-type">{ev.type}</span>
                  </div>
                  <h2 className="card-heading">{ev.heading}</h2>
                  <p className="card-description">{ev.description}</p>
                </div>
                <div className="btm">
                  <button
                    type="button"
                    onClick={() => alert(`Event details for: ${ev.heading}`)}
                    className="visit-btn"
                  >
                    Visit Event Page
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
