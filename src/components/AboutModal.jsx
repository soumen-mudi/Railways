import React from "react";

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="info-modal-header">
          <div className="auth-brand">
            <span className="logo-mark">🚆</span>
            <span className="logo-name">Rail<span>Ease</span></span>
          </div>
          <h2>About RailEase</h2>
          <p>Next-Generation Indian Railway Booking Experience</p>
        </div>

        <div className="info-modal-content">
          <section className="info-block">
            <h3>Our Mission</h3>
            <p>
              RailEase is engineered to eliminate the stress of railway travel in India. We provide blazing-fast train discovery, instant seat availability checks, transparent live PNR tracking, and an intuitive booking process designed for everyday travelers.
            </p>
          </section>

          <div className="features-highlight-grid">
            <div className="feature-item">
              <span className="feat-icon">⚡</span>
              <strong>Instant PNR Tracking</strong>
              <p>Real-time chart status & coach verification in seconds.</p>
            </div>
            <div className="feature-item">
              <span className="feat-icon">💳</span>
              <strong>Multi-Rail Pass Checkout</strong>
              <p>UPI, Instant NetBanking & Zero-friction Card processing.</p>
            </div>
            <div className="feature-item">
              <span className="feat-icon">📱</span>
              <strong>Downloadable e-Tickets</strong>
              <p>Offline-ready digital passes with quick scan QR codes.</p>
            </div>
            <div className="feature-item">
              <span className="feat-icon">🛡️</span>
              <strong>IRCTC Grade Security</strong>
              <p>256-bit encryption ensuring your personal journey is safe.</p>
            </div>
          </div>

          <section className="tech-badge-row">
            <span>Built with React 19</span>
            <span>Vite</span>
            <span>Modern Responsive CSS</span>
            <span>HTML5</span>
          </section>
        </div>

        <div className="info-modal-footer">
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
