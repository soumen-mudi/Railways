import React from "react";

export default function RouteModal({ isOpen, onClose, train, onSelectTrain }) {
  if (!isOpen || !train) return null;

  const stops = train.stops || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container route-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="route-modal-header">
          <div className="route-modal-title">
            <span className="train-number-badge">{train.number}</span>
            <h2>{train.name}</h2>
          </div>
          <div className="route-meta-tags">
            <span className="meta-tag">⚡ {train.type || "Express"}</span>
            <span className="meta-tag">⏱ {train.duration}</span>
            <span className="meta-tag">🍽 {train.pantry ? "Pantry Available" : "No Pantry"}</span>
            <span className="meta-tag text-green">🎯 {train.punctuality || "96% on time"}</span>
          </div>
          <div className="route-running-days">
            <span>Runs On:</span>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => {
              const runs = train.runningDays?.includes(d);
              return (
                <span key={d} className={`day-pill ${runs ? "runs" : "no-run"}`}>
                  {d}
                </span>
              );
            })}
          </div>
        </div>

        <div className="timetable-wrap">
          <table className="timetable">
            <thead>
              <tr>
                <th>#</th>
                <th>Station</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Halt</th>
                <th>Day</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {stops.map((s, idx) => {
                const isSource = idx === 0;
                const isDest = idx === stops.length - 1;
                return (
                  <tr key={s.code} className={isSource || isDest ? "stop-key-station" : ""}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong>{s.station}</strong>
                      <span className="stn-code">({s.code})</span>
                    </td>
                    <td>{s.arrival}</td>
                    <td>{s.departure}</td>
                    <td>{s.halt}</td>
                    <td>Day {s.day}</td>
                    <td>{s.dist}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="route-modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Close Timetable</button>
          {onSelectTrain && (
            <button
              className="btn btn-primary"
              onClick={() => {
                onSelectTrain(train);
                onClose();
              }}
            >
              Book This Train →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
