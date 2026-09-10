import React, { useState } from "react";

export default function ContactModal({ isOpen, onClose, onShowToast }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Ticket Enquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      if (onShowToast) onShowToast("Please fill in all fields.", "error");
      return;
    }

    setSubmitted(true);
    if (onShowToast) {
      onShowToast("Thank you! Your query has been logged (Ref: #RL-" + Math.floor(1000 + Math.random() * 9000) + "). Our team will reply within 2 hours.", "success");
    }

    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="info-modal-header">
          <span className="eyebrow">24×7 TRAVEL SUPPORT</span>
          <h2>Contact RailEase Desk</h2>
          <p>Have questions about your booking, refund, or train schedule? We're here to help.</p>
        </div>

        <div className="contact-quick-cards">
          <div className="quick-contact-card">
            <span className="contact-icon">📞</span>
            <strong>Customer Helpline</strong>
            <p>1800-266-7245 (Toll Free)</p>
            <small>Available 24 hours / 7 days</small>
          </div>
          <div className="quick-contact-card">
            <span className="contact-icon">✉️</span>
            <strong>Email Support</strong>
            <p>support@railease.in</p>
            <small>Average reply time: 15 mins</small>
          </div>
          <div className="quick-contact-card">
            <span className="contact-icon">📍</span>
            <strong>Headquarters</strong>
            <p>Railway Plaza, New Delhi</p>
            <small>Pin: 110001, India</small>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <h3>Send Us a Message</h3>

          <div className="contact-grid">
            <div className="input-group">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="e.g. Soumen Mudi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="e.g. traveler@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Query Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Ticket Enquiry & Booking</option>
              <option>PNR & Chart Confirmation</option>
              <option>Cancellation & Refund Status</option>
              <option>Payment & Transaction Issue</option>
              <option>General Feedback</option>
            </select>
          </div>

          <div className="input-group">
            <label>Message</label>
            <textarea
              rows={3}
              placeholder="Describe your question or issue in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary contact-submit-btn"
            disabled={submitted}
          >
            {submitted ? "Sending Inquiry..." : "Submit Inquiry →"}
          </button>
        </form>
      </div>
    </div>
  );
}
