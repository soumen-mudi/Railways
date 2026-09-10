import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import RouteCard from "../components/RouteCard";
import { popularRoutes } from "../data/trains";

export default function Home({
  search,
  setSearch,
  onSearch,
  onOpenPnr,
  onNavigateBookings,
  onShowToast
}) {
  const [activeFaq, setActiveFaq] = useState(null);

  const handleRouteSelect = (route) => {
    setSearch((prev) => ({
      ...prev,
      from: route.from,
      to: route.to
    }));
    if (onShowToast) {
      onShowToast(`Selected route: ${route.from} to ${route.to}`, "info");
    }
    onSearch();
  };

  const faqs = [
    {
      q: "How does RailEase ensure confirmed train tickets?",
      a: "RailEase utilizes algorithmic availability prediction to recommend the best train options, coach classes, and alternate routes to maximize your chances of getting confirmed berths."
    },
    {
      q: "Can I cancel my ticket and get an instant refund?",
      a: "Yes! Navigate to 'My Bookings', select your confirmed booking, and click 'Cancel Ticket'. Your refund amount is calculated transparently and credited back within 2 to 4 hours."
    },
    {
      q: "How do I check my 10-digit PNR status?",
      a: "Click on 'Check PNR Status' in the top search bar or navigation bar, enter your 10-digit PNR, and instantly get live chart status, coach, and berth details."
    },
    {
      q: "What payment methods are supported on RailEase?",
      a: "We support Instant UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit/Debit cards (Visa, MasterCard, RuPay), and NetBanking across 40+ Indian banks."
    }
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-badge">🚆 INDIA'S SMARTEST RAILWAY PORTAL</div>
            <h1>Your Journey<br />Made <span>Remarkable</span></h1>
            <p>
              Book express train tickets, track live PNR, choose comfortable berths, and travel across India with 100% confidence.
            </p>
            <div className="trust-row">
              <span>🛡️ <b>Safe & Encrypted</b><small>IRCTC Standards</small></span>
              <span>⚡ <b>Instant Confirmation</b><small>Digital e-Ticket</small></span>
              <span>👥 <b>10M+ Happy Users</b><small>Across 28 States</small></span>
            </div>
          </div>

          <SearchBox
            search={search}
            setSearch={setSearch}
            onSearch={onSearch}
            onOpenPnr={onOpenPnr}
            onNavigateBookings={onNavigateBookings}
            onShowToast={onShowToast}
          />
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner-section">
        <div className="promo-banner">
          <div className="promo-left">
            <span className="promo-tag">SPECIAL OFFER</span>
            <h3>Get Flat ₹150 OFF on Your First Train Booking!</h3>
            <p>Use promo code <strong>RAILFIRST</strong> at checkout. Valid on all Rajdhani, Shatabdi & Vande Bharat trains.</p>
          </div>
          <button className="btn btn-primary promo-btn" onClick={onSearch}>
            Book Now ➔
          </button>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="routes section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">POPULAR TRAVEL CORRIDORS</span>
            <h2>Top Train Routes in India</h2>
            <p>Select any route below to view available schedules and fares</p>
          </div>
          <button type="button" className="btn-link" onClick={onSearch}>
            Explore All Trains →
          </button>
        </div>
        <div className="route-grid">
          {popularRoutes.map((r, i) => (
            <RouteCard key={i} route={r} onSelect={handleRouteSelect} />
          ))}
        </div>
      </section>

      {/* Why Choose RailEase */}
      <section className="features-showcase section">
        <div className="section-heading text-center">
          <span className="eyebrow">EXPERIENCE THE DIFFERENCE</span>
          <h2>Why Millions Travel with RailEase</h2>
          <p>Designed from the ground up for speed, transparency, and peace of mind</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feat-icon-box">⚡</div>
            <h3>Lightning Fast Search</h3>
            <p>Discover direct and connecting trains with real-time seat counts in less than 300ms.</p>
          </div>
          <div className="feature-card">
            <div className="feat-icon-box">💺</div>
            <h3>Berth Preference Engine</h3>
            <p>Customize Lower, Middle, Upper, or Window seats for each family member with ease.</p>
          </div>
          <div className="feature-card">
            <div className="feat-icon-box">📱</div>
            <h3>Digital Smart Pass</h3>
            <p>Download verifiable e-Tickets with QR codes directly to your device without printing.</p>
          </div>
          <div className="feature-card">
            <div className="feat-icon-box">💸</div>
            <h3>Instant Auto-Refunds</h3>
            <p>Cancel any booking in one click with zero hidden penalties and rapid UPI reversals.</p>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="stats">
        <div>
          <b>🚆</b>
          <span>
            <strong>5,000+ Trains</strong>
            <small>Covering all Indian states</small>
          </span>
        </div>
        <div>
          <b>👥</b>
          <span>
            <strong>10M+ Travelers</strong>
            <small>Booked successfully</small>
          </span>
        </div>
        <div>
          <b>🎧</b>
          <span>
            <strong>24×7 Rail Support</strong>
            <small>Dedicated traveler helpline</small>
          </span>
        </div>
        <div>
          <b>🛡️</b>
          <span>
            <strong>100% Safe Payments</strong>
            <small>PCI-DSS & SSL certified</small>
          </span>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faq-section section">
        <div className="section-heading text-center">
          <span className="eyebrow">HELP & CLARITY</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about booking tickets with RailEase</p>
        </div>
        <div className="faq-accordion">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? "open" : ""}`}
                onClick={() => setActiveFaq(isOpen ? null : index)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
                </div>
                {isOpen && <div className="faq-answer"><p>{faq.a}</p></div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Closing Banner */}
      <section className="closing">
        <div className="closing-content">
          <div className="train-art">〰🚆〰</div>
          <div>
            <h3>Ready to experience seamless rail travel?</h3>
            <p>Start your booking today and enjoy comfortable journeys across the nation.</p>
          </div>
        </div>
        <button className="btn btn-primary closing-cta" onClick={onSearch}>
          Search Available Trains →
        </button>
      </section>
    </>
  );
}