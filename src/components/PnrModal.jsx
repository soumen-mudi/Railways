import React, { useState } from "react";

export default function PnrModal({ isOpen, onClose, savedBookings = [], onViewTicket }) {
  const [pnrInput, setPnrInput] = useState("");
  const [pnrResult, setPnrResult] = useState(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = pnrInput.trim().toUpperCase();
    if (!query) return;

    setSearched(true);

    // First check user's saved bookings
    const matchedBooking = savedBookings.find(
      (b) => b.pnr?.toUpperCase() === query || b.pnr?.includes(query)
    );

    if (matchedBooking) {
      setPnrResult({
        source: "local",
        booking: matchedBooking,
        pnr: matchedBooking.pnr,
        trainName: matchedBooking.train?.name,
        trainNumber: matchedBooking.train?.number,
        from: matchedBooking.train?.from,
        to: matchedBooking.train?.to,
        date: matchedBooking.search?.date || "Confirmed Date",
        chartStatus: "CHART PREPARED",
        bookingStatus: "CNF (Confirmed)",
        coach: matchedBooking.coach || "B2",
        berth: matchedBooking.berths?.[0] || "34 (Lower)",
        passengers: matchedBooking.passengers || [matchedBooking.passenger]
      });
      return;
    }

    // Realistic fallback simulation for any 10-digit or valid PNR query
    const simulatedCoach = ["B1", "B2", "B3", "A1", "H1", "S4"][Math.floor(Math.random() * 6)];
    const simulatedBerth = Math.floor(Math.random() * 64) + 1;
    const berthType = ["Lower Berth", "Middle Berth", "Upper Berth", "Side Lower"][Math.floor(Math.random() * 4)];

    setPnrResult({
      source: "simulated",
      pnr: query.length >= 6 ? query : `RE${query}8829`,
      trainName: "Howrah - New Delhi Rajdhani Express",
      trainNumber: "12301",
      from: "Howrah Junction",
      to: "New Delhi",
      date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
      chartStatus: "CHART PREPARED",
      bookingStatus: "CNF (Confirmed)",
      coach: simulatedCoach,
      berth: `${simulatedBerth} (${berthType})`,
      passengers: [{ name: "Primary Passenger", preference: berthType }]
    });
  };

  const handleReset = () => {
    setPnrInput("");
    setPnrResult(null);
    setSearched(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container pnr-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="pnr-modal-head">
          <span className="eyebrow">RAILWAY PNR ENQUIRY</span>
          <h2>Live PNR Status</h2>
          <p>Check the current reservation and chart status of your ticket</p>
        </div>

        <form onSubmit={handleSearch} className="pnr-search-form">
          <div className="input-with-icon pnr-input-wrap">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Enter 10-digit PNR / Booking ID"
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              autoFocus
            />
            {pnrInput && (
              <button type="button" className="pnr-clear-btn" onClick={handleReset}>
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-primary pnr-check-btn">
            Track Status
          </button>
        </form>

        {savedBookings.length > 0 && !pnrResult && (
          <div className="pnr-recent-section">
            <span className="pnr-recent-title">Recent Bookings from This Device:</span>
            <div className="pnr-recent-chips">
              {savedBookings.slice(0, 3).map((b) => (
                <button
                  key={b.pnr}
                  type="button"
                  className="pnr-chip"
                  onClick={() => {
                    setPnrInput(b.pnr);
                    setPnrResult({
                      source: "local",
                      booking: b,
                      pnr: b.pnr,
                      trainName: b.train?.name,
                      trainNumber: b.train?.number,
                      from: b.train?.from,
                      to: b.train?.to,
                      date: b.search?.date || "Upcoming Date",
                      chartStatus: "CHART PREPARED",
                      bookingStatus: "CNF (Confirmed)",
                      coach: b.coach || "B2",
                      berth: b.berths?.[0] || "34 (Lower)",
                      passengers: b.passengers || [b.passenger]
                    });
                    setSearched(true);
                  }}
                >
                  🚆 {b.pnr} ({b.train?.number})
                </button>
              ))}
            </div>
          </div>
        )}

        {searched && pnrResult && (
          <div className="pnr-result-card">
            <div className="pnr-result-top">
              <div>
                <span className="pnr-badge-cnf">{pnrResult.bookingStatus}</span>
                <span className="pnr-chart-pill">{pnrResult.chartStatus}</span>
              </div>
              <div className="pnr-code-display">
                <small>PNR NUMBER</small>
                <strong>{pnrResult.pnr}</strong>
              </div>
            </div>

            <div className="pnr-train-info">
              <h3>{pnrResult.trainNumber} - {pnrResult.trainName}</h3>
              <p>
                {pnrResult.from} ➔ {pnrResult.to} · <span>📅 {pnrResult.date}</span>
              </p>
            </div>

            <div className="pnr-berth-grid">
              <div className="berth-cell">
                <small>COACH</small>
                <strong>{pnrResult.coach}</strong>
              </div>
              <div className="berth-cell">
                <small>BERTH / SEAT</small>
                <strong>{pnrResult.berth}</strong>
              </div>
              <div className="berth-cell">
                <small>BOOKING STATUS</small>
                <strong className="text-success">CNF</strong>
              </div>
              <div className="berth-cell">
                <small>CURRENT STATUS</small>
                <strong className="text-success">CONFIRMED</strong>
              </div>
            </div>

            {pnrResult.source === "local" && (
              <div className="pnr-card-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    onViewTicket(pnrResult.booking);
                    onClose();
                  }}
                >
                  View Full e-Ticket ➔
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
