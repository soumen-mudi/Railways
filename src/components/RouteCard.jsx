import React from "react";

export default function RouteCard({ route, onSelect }) {
  return (
    <article
      className="route-card clickable"
      onClick={() => onSelect && onSelect(route)}
      title={`Search trains for ${route.from} to ${route.to}`}
    >
      <div className="route-image-wrap">
        <img src={route.image} alt={`${route.from} to ${route.to}`} />
        <span className="route-duration-tag">{route.duration}</span>
      </div>
      <div className="route-info">
        <strong>{route.from} <span>→</span> {route.to}</strong>
        <div className="route-meta-line">
          <span>From <b>{route.fare}</b></span>
          <small>{route.trainCount || "Direct Trains"}</small>
        </div>
        <span className="arrow">›</span>
      </div>
    </article>
  );
}