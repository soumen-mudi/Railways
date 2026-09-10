import React from "react";

export default function Logo() {
  return (
    <div className="logo" onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}>
      <div className="logo-mark">🚆</div>
      <div>
        <div className="logo-name">Rail<span>Ease</span></div>
        <div className="logo-tag">Travel Easy. Always.</div>
      </div>
    </div>
  );
}