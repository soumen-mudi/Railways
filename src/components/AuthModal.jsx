import React, { useState } from "react";

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (mode === "signup" && !name) {
      setError("Please enter your full name.");
      return;
    }

    const userData = {
      name: mode === "signup" ? name : (name || email.split("@")[0].replace(/[0-9.]/g, "") || "Traveler"),
      email,
      phone: phone || "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      memberSince: "2026"
    };

    localStorage.setItem("railease_user", JSON.stringify(userData));
    onLoginSuccess(userData, mode === "signup" ? "Account created successfully!" : "Logged in successfully!");
    onClose();
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: "Soumen Mudi",
      email: "soumen@railease.com",
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      memberSince: "2026"
    };
    localStorage.setItem("railease_user", JSON.stringify(demoUser));
    onLoginSuccess(demoUser, "Welcome back, Soumen!");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="auth-header">
          <div className="auth-brand">
            <span className="logo-mark">🚆</span>
            <span className="logo-name">Rail<span>Ease</span></span>
          </div>
          <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {mode === "login"
              ? "Sign in to manage your tickets, fast-track bookings & track PNR"
              : "Sign up to unlock seamless railway bookings across India"}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => { setMode("login"); setError(""); }}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => { setMode("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="e.g. traveler@railease.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {mode === "signup" && (
            <div className="input-group">
              <label>Mobile Number (Optional)</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit-btn">
            {mode === "login" ? "Sign In to RailEase" : "Create Free Account"}
          </button>

          <div className="auth-divider"><span>OR</span></div>

          <button
            type="button"
            className="btn btn-outline demo-login-btn"
            onClick={handleDemoLogin}
          >
            ⚡ One-Click Demo Login
          </button>
        </form>
      </div>
    </div>
  );
}
