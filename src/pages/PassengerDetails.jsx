import React, { useState } from "react";

export default function PassengerDetails({
  train,
  search,
  onConfirm,
  onBack,
  onShowToast
}) {
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      name: "",
      age: "",
      gender: "Male",
      preference: "No Preference",
      meal: "Veg Meal"
    }
  ]);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const selectedClass = train?.selectedClass || train?.classes?.[0] || "SL";
  const farePerPerson = train?.currentFare || train?.fareByClass?.[selectedClass] || train?.fare || 900;
  const convenienceFee = 20;
  const totalBaseFare = farePerPerson * passengers.length;
  const totalAmount = totalBaseFare + convenienceFee;

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const addPassenger = () => {
    if (passengers.length >= 6) {
      if (onShowToast) onShowToast("Maximum 6 passengers allowed per booking.", "error");
      return;
    }
    setPassengers([
      ...passengers,
      {
        id: Date.now(),
        name: "",
        age: "",
        gender: "Male",
        preference: "No Preference",
        meal: "Veg Meal"
      }
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length <= 1) {
      if (onShowToast) onShowToast("At least 1 passenger is required.", "error");
      return;
    }
    setPassengers(passengers.filter((_, idx) => idx !== index));
  };

  const handleContinue = (e) => {
    e.preventDefault();

    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name.trim()) {
        const msg = `Please enter the full name for Passenger ${i + 1}.`;
        if (onShowToast) onShowToast(msg, "error");
        else alert(msg);
        return;
      }
      if (!p.age || isNaN(p.age) || Number(p.age) <= 0 || Number(p.age) > 115) {
        const msg = `Please enter a valid age for Passenger ${i + 1}.`;
        if (onShowToast) onShowToast(msg, "error");
        else alert(msg);
        return;
      }
    }

    onConfirm({
      passengers,
      contactEmail,
      contactPhone,
      selectedClass,
      farePerPerson,
      totalBaseFare,
      convenienceFee,
      totalAmount
    });
  };

  return (
    <main className="form-page">
      <div className="page-title">
        <span className="eyebrow">STEP 1 OF 3 · TRAVELER INFORMATION</span>
        <h1>Passenger Details</h1>
        <p>Enter traveler details matching government-issued ID cards (Aadhaar, Passport, Voter ID).</p>
      </div>

      <div className="booking-layout">
        <section className="passenger-forms-column">
          {passengers.map((p, idx) => (
            <div key={p.id} className="form-card passenger-card">
              <div className="form-card-head">
                <div className="passenger-title">
                  <span className="passenger-num-pill">#{idx + 1}</span>
                  <h2>Passenger {idx + 1}</h2>
                  {p.age >= 60 && <span className="senior-badge">Senior Citizen</span>}
                </div>
                {passengers.length > 1 && (
                  <button
                    type="button"
                    className="btn-remove-passenger"
                    onClick={() => removePassenger(idx)}
                    title="Remove this passenger"
                  >
                    Remove ×
                  </button>
                )}
              </div>

              <div className="form-grid">
                <label>
                  Full Name (as per ID)*
                  <input
                    value={p.name}
                    onChange={(e) => updatePassenger(idx, "name", e.target.value)}
                    placeholder="e.g. Soumen Mudi"
                    required
                  />
                </label>

                <label>
                  Age*
                  <input
                    type="number"
                    min="1"
                    max="115"
                    value={p.age}
                    onChange={(e) => updatePassenger(idx, "age", e.target.value)}
                    placeholder="e.g. 26"
                    required
                  />
                </label>

                <label>
                  Gender
                  <select
                    value={p.gender}
                    onChange={(e) => updatePassenger(idx, "gender", e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </label>

                <label>
                  Berth / Seat Preference
                  <select
                    value={p.preference}
                    onChange={(e) => updatePassenger(idx, "preference", e.target.value)}
                  >
                    <option value="No Preference">No Preference</option>
                    <option value="Lower Berth">Lower Berth</option>
                    <option value="Middle Berth">Middle Berth</option>
                    <option value="Upper Berth">Upper Berth</option>
                    <option value="Side Lower">Side Lower</option>
                    <option value="Side Upper">Side Upper</option>
                    <option value="Window Seat">Window Seat</option>
                  </select>
                </label>

                {train?.pantry && (
                  <label className="span-two-cols">
                    Food / Meal Preference
                    <select
                      value={p.meal}
                      onChange={(e) => updatePassenger(idx, "meal", e.target.value)}
                    >
                      <option value="Veg Meal">Vegetarian Meal (Included)</option>
                      <option value="Non-Veg Meal">Non-Vegetarian Meal (Included)</option>
                      <option value="Jain Meal">Jain Meal (No Onion/Garlic)</option>
                      <option value="No Food">No Food Required</option>
                    </select>
                  </label>
                )}
              </div>
            </div>
          ))}

          {passengers.length < 6 && (
            <button
              type="button"
              className="btn-add-passenger"
              onClick={addPassenger}
            >
              + Add Another Passenger (Up to 6)
            </button>
          )}

          {/* Contact Details Card */}
          <div className="form-card contact-info-card">
            <h3>Contact Information (Ticket will be sent here)</h3>
            <div className="form-grid">
              <label>
                Email Address
                <input
                  type="email"
                  placeholder="e.g. traveler@domain.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </label>
              <label>
                Mobile Number
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </label>
            </div>
            <div className="secure-note">
              🔒 Your information is confidential and used exclusively for IRCTC ticket delivery and SMS updates.
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onBack}>
              ← Back to Trains
            </button>
            <button
              type="button"
              className="btn btn-primary btn-proceed"
              onClick={handleContinue}
            >
              Review Booking ➔
            </button>
          </div>
        </section>

        {/* Mini Summary Sidebar */}
        <aside className="summary-mini">
          <span className="eyebrow">YOUR TRAIN</span>
          <h2>{train?.name}</h2>
          <span className="train-number-pill">{train?.number}</span>
          <div className="summary-timing-box">
            <b>{train?.departure} — {train?.arrival}</b>
            <p>{train?.from} ➔ {train?.to}</p>
            <small>Class: <strong>{selectedClass}</strong> · Duration: {train?.duration}</small>
            {search?.date && <small>Date: <strong>📅 {search.date}</strong></small>}
          </div>

          <hr />

          <div className="fare-breakdown-mini">
            <div>
              <span>Ticket Fare ({passengers.length} × ₹{farePerPerson})</span>
              <strong>₹{totalBaseFare.toLocaleString("en-IN")}</strong>
            </div>
            <div>
              <span>IRCTC Convenience Fee</span>
              <strong>₹{convenienceFee}</strong>
            </div>
            <div>
              <span>Travel Insurance</span>
              <strong className="text-green">FREE</strong>
            </div>
          </div>

          <hr />

          <div className="total">
            <span>Total Payable</span>
            <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}