import React from "react";
import Logo from "./Logo";

export default function Navbar({ onNavigate }) {
  return (
    <header className="navbar">
      <Logo />
      <nav>
        <button onClick={() => onNavigate("home")}>Home</button>
        <button onClick={() => onNavigate("trains")}>Trains</button>
        <button onClick={() => onNavigate("bookings")}>My Bookings</button>
        <button onClick={() => onNavigate("about")}>About</button>
        <button onClick={() => onNavigate("contact")}>Contact</button>
      </nav>
      <div className="nav-actions">
        <button className="btn btn-outline" onClick={() => alert("Login screen coming next!")}>Login</button>
        <button className="btn btn-primary" onClick={() => alert("Sign up screen coming next!")}>Sign Up</button>
      </div>
    </header>
  );
}