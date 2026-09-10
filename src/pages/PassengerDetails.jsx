import React, { useState } from "react";

export default function PassengerDetails({ train, search, onConfirm, onBack }) {
  const [passenger, setPassenger] = useState({name:"", age:"", gender:"Male", preference:"No Preference"});
  const update = (k,v) => setPassenger({...passenger,[k]:v});

  return (
    <main className="form-page">
      <div className="page-title"><span className="eyebrow">STEP 1 OF 2</span><h1>Passenger Details</h1><p>Enter the details exactly as they appear on your ID.</p></div>
      <div className="booking-layout">
        <section className="form-card">
          <div className="form-card-head"><h2>Passenger 1</h2><span>Adult</span></div>
          <div className="form-grid">
            <label>Full Name<input value={passenger.name} onChange={e=>update("name",e.target.value)} placeholder="Enter passenger name" /></label>
            <label>Age<input type="number" value={passenger.age} onChange={e=>update("age",e.target.value)} placeholder="Age" /></label>
            <label>Gender<select value={passenger.gender} onChange={e=>update("gender",e.target.value)}><option>Male</option><option>Female</option><option>Other</option></select></label>
            <label>Seat Preference<select value={passenger.preference} onChange={e=>update("preference",e.target.value)}><option>No Preference</option><option>Window</option><option>Lower</option><option>Middle</option><option>Upper</option></select></label>
          </div>
          <div className="secure-note">🔒 Your information is secure and will only be used for ticket booking.</div>
          <div className="form-actions"><button className="btn btn-outline" onClick={onBack}>Back</button><button className="btn btn-primary" onClick={() => {if(!passenger.name || !passenger.age) return alert("Please enter passenger name and age."); onConfirm(passenger)}}>Continue →</button></div>
        </section>
        <aside className="summary-mini"><span className="eyebrow">YOUR TRAIN</span><h2>{train.name}</h2><b>{train.departure} — {train.arrival}</b><p>{train.from} → {train.to}</p><hr /><div><span>Ticket fare</span><strong>₹{train.fare.toLocaleString("en-IN")}</strong></div><div><span>Convenience fee</span><strong>₹20</strong></div><hr /><div className="total"><span>Total</span><strong>₹{(train.fare+20).toLocaleString("en-IN")}</strong></div></aside>
      </div>
    </main>
  );
}