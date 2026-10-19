import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import YouTube from './components/YouTube';
import Gallery from './components/Gallery';
import Marquee from './components/Marquee';
import Team from './components/Team';
import Footer from './components/Footer';
import EventsPage from './components/EventsPage';
import GalleryPage from './components/GalleryPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'events' | 'gallery'

  const handleNavigate = (target, isSection = true) => {
    if (target === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'events' || target === 'gallery' || target === 'team') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="app-container">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {currentPage === 'home' && (
        <main>
          <Hero />
          <Events onOpenEventsPage={() => setCurrentPage('events')} />
          {/* <YouTube /> */}
          <Gallery onOpenGalleryPage={() => setCurrentPage('gallery')} />
          <Marquee />
          <Team />
        </main>
      )}

      {currentPage === 'events' && (
        <main>
          <EventsPage onBackToHome={() => setCurrentPage('home')} />
        </main>
      )}

      {currentPage === 'gallery' && (
        <main>
          <GalleryPage onBackToHome={() => setCurrentPage('home')} />
        </main>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
