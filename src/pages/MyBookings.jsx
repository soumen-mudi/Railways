import React, { useState } from "react";

export default function MyBookings({
  bookings = [],
  onViewTicket,
  onCancelBooking,
  onNewBooking
}) {
  const [filterTab, setFilterTab] = useState("all"); // "all" | "confirmed" | "cancelled"

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === "confirmed") return b.status !== "CANCELLED";
    if (filterTab === "cancelled") return b.status === "CANCELLED";
    return true;
  });

  return (
    <main className="form-page my-bookings-page">
      <div className="page-title my-bookings-header">
        <div>
          <span className="eyebrow">YOUR RESERVATION HISTORY</span>
          <h1>My Bookings & Tickets</h1>
          <p>View, download, and manage your current and previous rail journeys.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={onNewBooking}
        >
          + Book New Journey
        </button>
      </div>

      <div className="bookings-tabs-bar">
        <button
          className={`booking-tab-btn ${filterTab === "all" ? "active" : ""}`}
          onClick={() => setFilterTab("all")}
        >
          All Bookings ({bookings.length})
        </button>
        <button
          className={`booking-tab-btn ${filterTab === "confirmed" ? "active" : ""}`}
          onClick={() => setFilterTab("confirmed")}
        >
          Active / Confirmed ({bookings.filter((b) => b.status !== "CANCELLED").length})
        </button>
        <button
          className={`booking-tab-btn ${filterTab === "cancelled" ? "active" : ""}`}
          onClick={() => setFilterTab("cancelled")}
        >
          Cancelled ({bookings.filter((b) => b.status === "CANCELLED").length})
        </button>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="empty bookings-empty">
          <div className="empty-icon">🎫</div>
          <h2>No bookings found in this category</h2>
          <p>When you book train journeys on RailEase, your electronic tickets will be saved here.</p>
          <button className="btn btn-primary" onClick={onNewBooking}>
            Find & Book Trains Now
          </button>
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map((b) => {
            const isCancelled = b.status === "CANCELLED";
            const passengerCount = b.passengers?.length || 1;
            const primaryPassenger = b.passengers?.[0]?.name || b.passenger?.name || "Traveler";

            return (
              <article
                key={b.pnr}
                className={`booking-item-card ${isCancelled ? "booking-cancelled" : ""}`}
              >
                <div className="booking-card-head">
                  <div>
                    <span className="pnr-tag">PNR: <b>{b.pnr}</b></span>
                    <h3>{b.train?.number} · {b.train?.name}</h3>
                  </div>
                  <span className={`booking-status-badge ${isCancelled ? "status-cancelled" : "status-confirmed"}`}>
                    {isCancelled ? "CANCELLED" : "CONFIRMED"}
                  </span>
                </div>

                <div className="booking-card-route">
                  <div>
                    <small>DEPARTS</small>
                    <strong>{b.train?.departure}</strong>
                    <span>{b.train?.from}</span>
                  </div>
                  <div className="route-mid-info">
                    <span>📅 {b.search?.date || "Confirmed Date"}</span>
                    <div className="route-sep">──────➔</div>
                    <small>Class: {b.selectedClass || "3A"}</small>
                  </div>
                  <div>
                    <small>ARRIVES</small>
                    <strong>{b.train?.arrival}</strong>
                    <span>{b.train?.to}</span>
                  </div>
                </div>

                <div className="booking-card-passengers">
                  <div>
                    <small>PASSENGERS ({passengerCount})</small>
                    <strong>{primaryPassenger} {passengerCount > 1 ? `+ ${passengerCount - 1} more` : ""}</strong>
                  </div>
                  <div>
                    <small>COACH / BERTH</small>
                    <b>{b.coach || "B2"} · {b.berths?.[0] || "34 (Lower)"}</b>
                  </div>
                  <div className="booking-card-price">
                    <small>TOTAL PAID</small>
                    <strong>₹{(b.finalTotal || b.totalAmount || b.train?.fare || 920).toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div className="booking-card-actions">
                  <button
                    type="button"
                    className="btn btn-outline btn-view-ticket"
                    onClick={() => onViewTicket(b)}
                  >
                    📄 View & Print Ticket
                  </button>

                  {!isCancelled && (
                    <button
                      type="button"
                      className="btn btn-cancel-booking"
                      onClick={() => onCancelBooking(b.pnr)}
                    >
                      Cancel Journey
                    </button>
                  )}

                  {isCancelled && (
                    <span className="refund-note">
                      ✓ Refund processed to original payment method
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
