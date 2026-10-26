import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Marquee from './components/Marquee';
import Team from './components/Team';
import Footer from './components/Footer';
import EventsPage from './components/EventsPage';
import GalleryPage from './components/GalleryPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'events' | 'gallery'

  // Initialize Lenis smooth inertia scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Smooth scroll reveal observer for animated elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPage]);

  const handleNavigate = (target, _isSection = true) => {
    if (target === 'home') {
      setCurrentPage('home');
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (target === 'events' || target === 'gallery' || target === 'team') {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) {
            if (window.__lenis) {
              window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 120);
      } else {
        const el = document.getElementById(target);
        if (el) {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  return (
    <div className="app-container">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {currentPage === 'home' && (
        <main key="home" className="page-view">
          <Hero />
          <Events onOpenEventsPage={() => {
            setCurrentPage('events');
            window.__lenis?.scrollTo(0, { immediate: true });
          }} />
          {/* <YouTube /> */}
          <Gallery onOpenGalleryPage={() => {
            setCurrentPage('gallery');
            window.__lenis?.scrollTo(0, { immediate: true });
          }} />
          <Marquee />
          <Team />
        </main>
      )}

      {currentPage === 'events' && (
        <main key="events" className="page-view">
          <EventsPage onBackToHome={() => {
            setCurrentPage('home');
            window.__lenis?.scrollTo(0, { immediate: true });
          }} />
        </main>
      )}

      {currentPage === 'gallery' && (
        <main key="gallery" className="page-view">
          <GalleryPage onBackToHome={() => {
            setCurrentPage('home');
            window.__lenis?.scrollTo(0, { immediate: true });
          }} />
        </main>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
