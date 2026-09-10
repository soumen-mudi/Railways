import React from "react";

export default function Ticket({
  booking,
  onHome,
  onViewBookings
}) {
  if (!booking) {
    return (
      <main className="ticket-page">
        <h2>No active ticket found.</h2>
        <button className="btn btn-primary" onClick={onHome}>Return Home</button>
      </main>
    );
  }

  const {
    train,
    search,
    passengers = [],
    pnr,
    payment,
    coach = "B2",
    berths = [],
    finalTotal
  } = booking;

  return (
    <main className="ticket-page">
      <div className="ticket-success-banner">
        <div className="success-icon">✓</div>
        <span className="eyebrow">BOOKING SUCCESSFUL · SEATS CONFIRMED</span>
        <h1>Your e-Ticket is Ready!</h1>
        <p className="ticket-sub">
          A confirmation SMS and email have been dispatched with your itinerary and PNR.
        </p>
      </div>

      <div className="ticket-actions-bar">
        <button
          type="button"
          className="btn btn-primary btn-print-ticket"
          onClick={() => window.print()}
        >
          🖨 Print / Save as PDF
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={onViewBookings}
        >
          ▣ View All My Bookings
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={onHome}
        >
          + Book Another Journey
        </button>
      </div>

      {/* The Printable / Downloadable e-Ticket Container */}
      <section className="ticket print-container" id="printable-ticket">
        {/* Ticket Top Header */}
        <div className="ticket-brand">
          <div className="brand-lockup">
            <span className="ticket-train-icon">🚆</span>
            <div>
              <strong>Rail<span>Ease</span></strong>
              <small>Electronic Reservation Slip (ERS)</small>
            </div>
          </div>
          <div className="ticket-meta-right">
            <span className="irctc-auth-tag">IRCTC Verified Booking Partner</span>
            <small>Class: <b>{booking.selectedClass || "3A"}</b> · Quota: General</small>
          </div>
        </div>

        {/* PNR & Transaction Banner */}
        <div className="pnr-banner">
          <div className="pnr-box">
            <small>PNR NUMBER</small>
            <strong className="pnr-code">{pnr}</strong>
          </div>
          <div className="pnr-txn-info">
            <div>
              <small>TRANSACTION ID</small>
              <b>{payment?.transactionId || "TXN82910384"}</b>
            </div>
            <div>
              <small>PAYMENT METHOD</small>
              <b>{payment?.paymentMethod || "UPI"} · SUCCESSFUL</b>
            </div>
          </div>
        </div>

        {/* Train & Travel Date */}
        <div className="ticket-train-row">
          <div>
            <small>TRAIN NUMBER & NAME</small>
            <strong>{train?.number} · {train?.name}</strong>
          </div>
          <div className="text-right">
            <small>JOURNEY DATE</small>
            <strong>📅 {search?.date || "Confirmed"}</strong>
          </div>
        </div>

        {/* Route Journey Schedule */}
        <div className="ticket-route-grid">
          <div className="route-terminal origin">
            <small>DEPARTURE</small>
            <strong>{train?.departure}</strong>
            <span>{train?.from}</span>
          </div>

          <div className="route-arrow-mid">
            <span>⏱ {train?.duration}</span>
            <div className="arrow-line">────────────────➔</div>
            <small>Direct Non-Stop Corridor</small>
          </div>

          <div className="route-terminal dest">
            <small>ARRIVAL</small>
            <strong>{train?.arrival}</strong>
            <span>{train?.to}</span>
          </div>
        </div>

        {/* Passenger Berths Table */}
        <div className="ticket-passengers-table-wrap">
          <small className="table-title">PASSENGER & BERTH ALLOCATION</small>
          <table className="ticket-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Passenger Name</th>
                <th>Age / Gender</th>
                <th>Booking Status</th>
                <th>Coach</th>
                <th>Berth / Seat</th>
                <th>Meal</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((p, idx) => {
                const assignedBerth = berths[idx] || `${30 + idx} (${p.preference || "Lower"})`;
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.age} yrs / {p.gender}</td>
                    <td><span className="status-badge-cnf">CONFIRMED (CNF)</span></td>
                    <td><b>{coach}</b></td>
                    <td><b>{assignedBerth}</b></td>
                    <td>{p.meal || "Standard"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* QR Code & Fare Breakdown Footer */}
        <div className="ticket-bottom-bar">
          <div className="ticket-qr-section">
            <div className="ticket-qr-code">
              <svg viewBox="0 0 100 100" className="qr-img">
                <rect width="100" height="100" fill="white" />
                <path d="M10 10h30v30h-30zM15 15h20v20h-20zM60 10h30v30h-30zM65 15h20v20h-20zM10 60h30v30h-30zM15 65h20v20h-20zM45 10h10v10h-10zM45 30h10v10h-10zM10 45h10v10h-10zM30 45h10v10h-10zM50 50h10v10h-10zM60 50h20v10h-20zM50 70h10v20h-10zM70 70h20v20h-20z" fill="#0c234b" />
              </svg>
            </div>
            <div className="ticket-qr-notes">
              <strong>Official Digital Pass</strong>
              <small>Scan with RailEase or TTE device for onboard verification.</small>
            </div>
          </div>

          <div className="ticket-payment-summary">
            <div className="fare-paid-tag">
              <small>TOTAL FARE PAID (INCL. TAXES)</small>
              <strong>₹{finalTotal?.toLocaleString("en-IN") || booking.totalAmount?.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        {/* Important Guidelines */}
        <div className="ticket-guidelines">
          <strong>Important Passenger Guidelines:</strong>
          <ul>
            <li>Please carry an original government Photo ID (Aadhaar, Passport, PAN, Driving License, Voter ID).</li>
            <li>Passengers are advised to arrive at the station at least 20 minutes prior to departure.</li>
            <li>In case of train delay or cancellation, full refund will be processed automatically to original payment mode.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}