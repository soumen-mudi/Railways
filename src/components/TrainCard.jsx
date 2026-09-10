import React, { useState } from "react";

export default function TrainCard({ train, selected, onSelect, onViewRoute }) {
  const defaultClass = train.classes[0] || "SL";
  const [chosenClass, setChosenClass] = useState(defaultClass);

  const fareForClass = train.fareByClass?.[chosenClass] || train.fare;
  const seatsForClass = train.seatsByClass?.[chosenClass] || train.seats;

  const handleSelect = () => {
    onSelect({
      ...train,
      selectedClass: chosenClass,
      currentFare: fareForClass
    });
  };

  return (
    <article className={`train-card ${selected ? "selected" : ""}`}>
      <div className="train-top">
        <div className="train-title-block">
          <div className="train-meta-row">
            <span className="train-number">{train.number}</span>
            <span className={`train-type-pill type-${(train.type || "exp").toLowerCase().replace(/\s+/g, "-")}`}>
              {train.type || "Express"}
            </span>
            {train.pantry && <span className="pantry-pill" title="Pantry car available">🍽 Pantry</span>}
            <span className="punctuality-tag">{train.punctuality || "95% on time"}</span>
          </div>
          <h3>{train.name}</h3>
        </div>
        <div className="availability-wrapper">
          <span className="availability">
            ✓ {seatsForClass} seats in <b>{chosenClass}</b>
          </span>
          <button
            type="button"
            className="btn-view-route"
            onClick={() => onViewRoute && onViewRoute(train)}
          >
            🗺 View Timetable
          </button>
        </div>
      </div>

      <div className="train-route">
        <div className="stn-dep">
          <b>{train.departure}</b>
          <span>{train.from}</span>
        </div>
        <div className="route-line">
          <i></i>
          <span className="duration-pill">⏱ {train.duration}</span>
          <i></i>
        </div>
        <div className="stn-arr">
          <b>{train.arrival}</b>
          <span>{train.to}</span>
        </div>
      </div>

      <div className="train-bottom">
        <div className="class-selector-group">
          <span className="class-prompt">Select Class:</span>
          <div className="class-list">
            {train.classes.map((cls) => {
              const clsFare = train.fareByClass?.[cls] || train.fare;
              const isChosen = chosenClass === cls;
              return (
                <button
                  key={cls}
                  type="button"
                  className={`class-chip ${isChosen ? "active" : ""}`}
                  onClick={() => setChosenClass(cls)}
                >
                  <span className="chip-name">{cls}</span>
                  <span className="chip-price">₹{clsFare}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card-cta-group">
          <div className="fare">
            ₹{fareForClass.toLocaleString("en-IN")}
            <small> / traveler ({chosenClass})</small>
          </div>
          <button className="btn btn-primary book-train-btn" onClick={handleSelect}>
            Book Ticket ➔
          </button>
        </div>
      </div>
    </article>
  );
}