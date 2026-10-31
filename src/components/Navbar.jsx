import React, { useState } from 'react';

export default function Navbar({ onNavigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (target, isSection = true) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(target, isSection);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <a
            onClick={() => handleNavClick('home')}
            href="#home"
            title="Google Developer Group"
          >
            <img src="/gdglogo.png" alt="GDG Logo" className="logo" />
          </a>
        </div>

        <div className="nav-middle">
          <a
            href="#home"
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            Home
          </a>
          <a
            href="#events"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('events');
            }}
          >
            Event
          </a>
          <a
            href="#gallery"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('gallery');
            }}
          >
            Gallery
          </a>
          <a
            href="#team"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('team');
            }}
          >
            Team
          </a>
        </div>

        <div className="nav-right">
          <a
            href="https://chat.whatsapp.com/JQLDqn3r9iYKKl5vH9yCNQ"
            className="connect"
          >
            Join Community
          </a>
        </div>

        {/* Hamburger for mobile */}
        <div
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div id="mobileMenu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="close-btn" onClick={toggleMenu}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          Home
        </a>
        <a
          href="#events"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('events');
          }}
        >
          Event
        </a>
        <a
          href="#team"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('team');
          }}
        >
          Team
        </a>
        <a
          href="#gallery"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('gallery');
          }}
        >
          Gallery
        </a>
        <a
          href="mailto:example@example.com"
          onClick={() => setMenuOpen(false)}
        >
          Contact Us
        </a>
      </div>
    </>
  );
}
