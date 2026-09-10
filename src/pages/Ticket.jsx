import React from "react";

export default function Ticket({ train, search, passenger, pnr, onHome }) {
  return (
    <main className="ticket-page">
      <div className="success-icon">✓</div>
      <span className="eyebrow">BOOKING CONFIRMED</span>
      <h1>Your ticket is ready!</h1>
      <p className="ticket-sub">Your RailEase booking has been successfully confirmed.</p>
      <section className="ticket">
        <div className="ticket-brand"><strong>Rail<span>Ease</span></strong><span>e-Ticket</span></div>
        <div className="pnr"><small>BOOKING ID / PNR</small><strong>{pnr}</strong></div>
        <div className="ticket-train"><div><small>TRAIN</small><strong>{train.number} · {train.name}</strong></div><div><small>DATE</small><strong>{search.date || "Selected date"}</strong></div></div>
        <div className="ticket-route"><div><small>FROM</small><strong>{train.departure}</strong><span>{train.from}</span></div><div>→</div><div><small>TO</small><strong>{train.arrival}</strong><span>{train.to}</span></div></div>
        <div className="ticket-passenger"><div><small>PASSENGER</small><strong>{passenger.name}</strong><span>{passenger.age} years · {passenger.gender} · {passenger.preference}</span></div><div><small>STATUS</small><strong className="confirmed">CONFIRMED</strong></div></div>
        <div className="ticket-footer"><span>₹{(train.fare+20).toLocaleString("en-IN")} paid</span><button className="btn btn-primary" onClick={() => window.print()}>Print Ticket</button></div>
      </section>
      <button className="btn btn-outline" onClick={onHome}>← Back to Home</button>
    </main>
  );
}