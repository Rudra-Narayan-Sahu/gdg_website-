import React from 'react';

export default function Footer({ onNavigate }) {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* First Column: Logo */}
        <div className="footer-column logo-column">
          <img src="/gdg_logo.png" alt="GDG Logo" className="footer-logo" />
          <p>© 2026 GDG On Campus GIET University, Gunupur. All rights reserved.</p>
        </div>

        {/* Second Column: Quick Links */}
        <div className="footer-column links-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>
                &gt; About
              </a>
            </li>
            <li>
              <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>
                &gt; Chapters
              </a>
            </li>
            <li>
              <a href="#events" onClick={(e) => handleLinkClick(e, 'events')}>
                &gt; Upcoming Events
              </a>
            </li>
            <li>
              <a href="#">&gt; Participation Terms</a>
            </li>
            <li>
              <a href="#">&gt; Privacy Policy</a>
            </li>
            <li>
              <a href="#">&gt; Terms and Conditions</a>
            </li>
          </ul>
        </div>

        {/* Third Column: Social Links */}
        <div className="footer-column social-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/gdgocgietu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/gdg-gietu/home/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/GDG-On-Campus-GIET-University"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
