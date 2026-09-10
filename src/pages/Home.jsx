import React from "react";
import SearchBox from "../components/SearchBox";
import RouteCard from "../components/RouteCard";
import { popularRoutes } from "../data/trains";

export default function Home({ search, setSearch, onSearch }) {
  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-copy">
            <h1>Your Journey<br />Made <span>Easier</span></h1>
            <p>Book train tickets with RailEase and travel across India with comfort, convenience and confidence.</p>
            <div className="trust-row">
              <span>🛡️ <b>Safe & Secure</b><small>Booking</small></span>
              <span>ϟ <b>Fast & Easy</b><small>Process</small></span>
              <span>♙ <b>Trusted by</b><small>Millions</small></span>
            </div>
          </div>
          <SearchBox search={search} setSearch={setSearch} onSearch={onSearch} />
        </div>
      </section>

      <section className="routes section">
        <div className="section-heading">
          <div><h2>Popular Routes</h2><p>Explore the most loved journeys across India</p></div>
          <button onClick={onSearch}>View All Routes →</button>
        </div>
        <div className="route-grid">{popularRoutes.map((r, i) => <RouteCard key={i} route={r} />)}</div>
      </section>

      <section className="stats">
        <div><b>🚆</b><span><strong>5000+ Trains</strong><small>Across India</small></span></div>
        <div><b>👥</b><span><strong>10M+ Happy Travelers</strong><small>Trust RailEase</small></span></div>
        <div><b>🎧</b><span><strong>24×7 Support</strong><small>We're always here</small></span></div>
        <div><b>🛡️</b><span><strong>Secure Payments</strong><small>Your data is safe</small></span></div>
      </section>

      <section className="closing">
        <div className="train-art">〰🚆〰</div>
        <div>“Different destinations. A better tomorrow.”<small>– RailEase</small></div>
        <button onClick={onSearch}>Start Your Journey →</button>
      </section>
    </>
  );
}