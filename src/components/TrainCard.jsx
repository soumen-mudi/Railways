import React from "react";

export default function TrainCard({ train, selected, onSelect }) {
  return (
    <article className={`train-card ${selected ? "selected" : ""}`}>
      <div className="train-top">
        <div>
          <span className="train-number">{train.number}</span>
          <h3>{train.name}</h3>
        </div>
        <span className="availability">{train.seats} seats available</span>
      </div>
      <div className="train-route">
        <div><b>{train.departure}</b><span>{train.from}</span></div>
        <div className="route-line"><i></i><span>{train.duration}</span><i></i></div>
        <div><b>{train.arrival}</b><span>{train.to}</span></div>
      </div>
      <div className="train-bottom">
        <div className="class-list">
          {train.classes.map(c => <span key={c}>{c}</span>)}
        </div>
        <div className="fare">₹{train.fare.toLocaleString("en-IN")} <small>/ person</small></div>
        <button className="btn btn-primary" onClick={() => onSelect(train)}>Select</button>
      </div>
    </article>
  );
}