import React, { useState } from "react";

export default function BookingSummary({
  train,
  search,
  bookingData,
  onProceedToPayment,
  onBack,
  onShowToast
}) {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const passengers = bookingData?.passengers || (bookingData?.name ? [bookingData] : []);
  const selectedClass = bookingData?.selectedClass || train?.selectedClass || train?.classes?.[0] || "SL";
  const farePerPerson = bookingData?.farePerPerson || train?.currentFare || train?.fare || 900;
  const baseTotal = farePerPerson * (passengers.length || 1);
  const convenienceFee = bookingData?.convenienceFee || 20;
  const finalTotal = Math.max(0, baseTotal + convenienceFee - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "RAILFIRST") {
      setDiscount(150);
      setPromoApplied(true);
      if (onShowToast) onShowToast("Promo RAILFIRST applied! You saved ₹150.", "success");
    } else if (code === "RAIL50") {
      setDiscount(50);
      setPromoApplied(true);
      if (onShowToast) onShowToast("Promo RAIL50 applied! You saved ₹50.", "success");
    } else {
      if (onShowToast) onShowToast("Invalid promo code. Try 'RAILFIRST' for ₹150 off.", "error");
    }
  };

  const handleProceed = () => {
    onProceedToPayment({
      ...bookingData,
      passengers,
      selectedClass,
      farePerPerson,
      baseTotal,
      convenienceFee,
      discount,
      finalTotal
    });
  };

  return (
    <main className="form-page">
      <div className="page-title">
        <span className="eyebrow">STEP 2 OF 3 · VERIFICATION</span>
        <h1>Review Booking Summary</h1>
        <p>Double-check your journey, passenger details, and fare breakdown before making payment.</p>
      </div>

      <section className="review-card">
        {/* Train Header */}
        <div className="review-head">
          <div>
            <span className="train-number-badge">{train?.number}</span>
            <h2>{train?.name}</h2>
            <div className="train-type-meta">
              <span>{train?.type || "Superfast"}</span> · Class: <b>{selectedClass}</b>
            </div>
          </div>
          <div className="date-pill">
            <span>📅 {search?.date || "Selected Date"}</span>
          </div>
        </div>

        {/* Route Details */}
        <div className="review-route">
          <div className="route-col dep">
            <small>DEPARTS</small>
            <strong>{train?.departure}</strong>
            <span>{train?.from}</span>
          </div>
          <div className="review-line">
            <div className="line-bar"></div>
            <small>⏱ {train?.duration} (Direct)</small>
          </div>
          <div className="route-col arr">
            <small>ARRIVES</small>
            <strong>{train?.arrival}</strong>
            <span>{train?.to}</span>
          </div>
        </div>

        {/* Passengers List */}
        <div className="review-passengers-section">
          <h3>Passengers ({passengers.length})</h3>
          <div className="passengers-review-grid">
            {passengers.map((p, idx) => (
              <div key={idx} className="passenger-badge-card">
                <div className="passenger-badge-top">
                  <span className="p-num">Passenger {idx + 1}</span>
                  <span className="p-pref">Seat: <b>{p.preference || "No Preference"}</b></span>
                </div>
                <strong>{p.name}</strong>
                <p>
                  {p.age} yrs · {p.gender}
                  {p.meal && ` · 🍽 ${p.meal}`}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Code Box */}
        <div className="promo-box">
          <form onSubmit={handleApplyPromo} className="promo-form">
            <div className="input-with-icon promo-input-wrap">
              <span>🏷️</span>
              <input
                type="text"
                placeholder="Enter Promo Code (Try RAILFIRST)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline apply-promo-btn"
              disabled={promoApplied}
            >
              {promoApplied ? "✓ Applied" : "Apply Code"}
            </button>
          </form>
          {promoApplied && (
            <div className="promo-success-msg">
              🎉 Promo coupon applied! You saved ₹{discount} on this journey.
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="price-box">
          <div className="price-row">
            <span>Ticket Fare ({passengers.length} × ₹{farePerPerson})</span>
            <b>₹{baseTotal.toLocaleString("en-IN")}</b>
          </div>
          <div className="price-row">
            <span>IRCTC Convenience Fee</span>
            <b>₹{convenienceFee}</b>
          </div>
          {discount > 0 && (
            <div className="price-row discount-row text-green">
              <span>Promotional Discount</span>
              <b>- ₹{discount}</b>
            </div>
          )}
          <hr />
          <div className="total">
            <span>Total Payable Amount</span>
            <strong>₹{finalTotal.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onBack}>
            ← Back to Passengers
          </button>
          <button
            type="button"
            className="btn btn-primary btn-proceed-pay"
            onClick={handleProceed}
          >
            Proceed to Payment (₹{finalTotal.toLocaleString("en-IN")}) ➔
          </button>
        </div>
      </section>
    </main>
  );
}