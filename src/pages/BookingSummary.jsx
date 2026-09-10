import React from "react";

export default function BookingSummary({ train, search, passenger, onBook, onBack }) {
  const pnr = "RE" + Math.floor(1000000000 + Math.random()*8999999999);
  return (
    <main className="form-page">
      <div className="page-title"><span className="eyebrow">STEP 2 OF 2</span><h1>Review Booking</h1><p>Check your journey and passenger details before confirming.</p></div>
      <section className="review-card">
        <div className="review-head"><div><span className="train-number">{train.number}</span><h2>{train.name}</h2></div><span className="date-pill">📅 {search.date || "Selected date"}</span></div>
        <div className="review-route"><div><small>DEPARTS</small><strong>{train.departure}</strong><span>{train.from}</span></div><div className="review-line">● ───────── ●<small>{train.duration}</small></div><div><small>ARRIVES</small><strong>{train.arrival}</strong><span>{train.to}</span></div></div>
        <div className="review-person"><h3>Passenger</h3><p><strong>{passenger.name}</strong> · {passenger.age} years · {passenger.gender}</p><span>Seat preference: {passenger.preference}</span></div>
        <div className="price-box"><div><span>Base fare</span><b>₹{train.fare.toLocaleString("en-IN")}</b></div><div><span>Convenience fee</span><b>₹20</b></div><hr /><div className="total"><span>Total amount</span><strong>₹{(train.fare+20).toLocaleString("en-IN")}</strong></div></div>
        <div className="form-actions"><button className="btn btn-outline" onClick={onBack}>← Back</button><button className="btn btn-primary" onClick={() => onBook(pnr)}>Confirm Booking</button></div>
      </section>
    </main>
  );
}