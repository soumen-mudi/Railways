import React, { useState } from "react";
import Logo from "./Logo";

export default function Navbar({
  activePage,
  onNavigate,
  onOpenPnr,
  onOpenAbout,
  onOpenContact,
  onOpenAuth,
  currentUser,
  onLogout
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (target) => {
    setMobileOpen(false);
    onNavigate(target);
  };

  return (
    <header className="navbar">
      <div onClick={() => handleNav("home")}>
        <Logo />
      </div>

      <nav className={`nav-links ${mobileOpen ? "open" : ""}`}>
        <button
          className={activePage === "home" ? "nav-active" : ""}
          onClick={() => handleNav("home")}
        >
          Home
        </button>
        <button
          className={activePage === "trains" ? "nav-active" : ""}
          onClick={() => handleNav("trains")}
        >
          Search Trains
        </button>
        <button
          className={activePage === "bookings" ? "nav-active" : ""}
          onClick={() => handleNav("bookings")}
        >
          My Bookings
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            if (onOpenPnr) onOpenPnr();
          }}
        >
          PNR Status
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            if (onOpenAbout) onOpenAbout();
          }}
        >
          About
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            if (onOpenContact) onOpenContact();
          }}
        >
          Contact
        </button>

        {mobileOpen && !currentUser && (
          <div className="mobile-auth-buttons">
            <button
              className="btn btn-outline"
              onClick={() => {
                setMobileOpen(false);
                onOpenAuth("login");
              }}
            >
              Sign In
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setMobileOpen(false);
                onOpenAuth("signup");
              }}
            >
              Register
            </button>
          </div>
        )}
      </nav>

      <div className="nav-actions">
        {currentUser ? (
          <div className="user-profile-badge">
            <img
              src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
              alt={currentUser.name}
              className="user-avatar"
            />
            <div className="user-text">
              <span className="user-name">{currentUser.name}</span>
              <small className="user-status">Verified Traveler</small>
            </div>
            <button
              className="btn-logout"
              title="Log Out"
              onClick={onLogout}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="desktop-auth-buttons">
            <button
              className="btn btn-outline nav-login-btn"
              onClick={() => onOpenAuth("login")}
            >
              Sign In
            </button>
            <button
              className="btn btn-primary nav-signup-btn"
              onClick={() => onOpenAuth("signup")}
            >
              Register
            </button>
          </div>
        )}

        <button
          className="mobile-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}