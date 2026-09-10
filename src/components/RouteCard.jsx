import React from "react";

export default function RouteCard({ route }) {
  return (
    <article className="route-card">
      <img src={route.image} alt={`${route.from} to ${route.to}`} />
      <div className="route-info">
        <strong>{route.from} <span>→</span> {route.to}</strong>
        <div>From <b>{route.fare}</b></div>
        <span className="arrow">›</span>
      </div>
    </article>
  );
}