import React, { useState, useEffect } from "react";

export default function PaymentModal({ isOpen, onClose, amount, train, passengers, onPaymentSuccess }) {
  const [method, setMethod] = useState("upi"); // "upi" | "card" | "netbanking"
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("sbi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(300);
    setIsProcessing(false);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const formatCardNumber = (val) => {
    const clean = val.replace(/\D/g, "").slice(0, 16);
    return clean.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (val) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    if (clean.length > 2) {
      return `${clean.slice(0, 2)}/${clean.slice(2)}`;
    }
    return clean;
  };

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessStep("Connecting to secure payment gateway...");

    setTimeout(() => {
      setProcessStep("Authorizing transaction with your bank...");
    }, 900);

    setTimeout(() => {
      setProcessStep("Payment Approved! Securing your railway berths...");
    }, 1700);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        paymentMethod: method.toUpperCase(),
        transactionId: "TXN" + Math.floor(100000000 + Math.random() * 900000000),
        paidAt: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      });
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={isProcessing ? null : onClose}>
      <div className="modal-container payment-modal" onClick={(e) => e.stopPropagation()}>
        {!isProcessing && (
          <button className="modal-close" onClick={onClose}>✕</button>
        )}

        <div className="payment-head">
          <div className="payment-brand">
            <span className="secure-badge">🔒 256-Bit SSL Encrypted</span>
            <span className="pay-timer">Expires in: <b>{formattedTime}</b></span>
          </div>
          <h2>Complete Payment</h2>
          <div className="pay-amount-banner">
            <div>
              <span className="total-label">Total Amount Payable</span>
              <small>{passengers?.length || 1} Passenger(s) · {train?.name}</small>
            </div>
            <strong className="pay-amount">₹{amount?.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {isProcessing ? (
          <div className="payment-processing-view">
            <div className="payment-spinner"></div>
            <h3>Processing Payment</h3>
            <p>{processStep}</p>
            <div className="processing-secure-tag">Please do not refresh or close this window.</div>
          </div>
        ) : (
          <div className="payment-body">
            <div className="payment-methods-nav">
              <button
                type="button"
                className={`method-tab ${method === "upi" ? "active" : ""}`}
                onClick={() => setMethod("upi")}
              >
                <span className="method-icon">📱</span>
                <div>
                  <strong>UPI & QR Code</strong>
                  <small>GPay, PhonePe, Paytm</small>
                </div>
              </button>

              <button
                type="button"
                className={`method-tab ${method === "card" ? "active" : ""}`}
                onClick={() => setMethod("card")}
              >
                <span className="method-icon">💳</span>
                <div>
                  <strong>Credit / Debit Card</strong>
                  <small>Visa, Mastercard, RuPay</small>
                </div>
              </button>

              <button
                type="button"
                className={`method-tab ${method === "netbanking" ? "active" : ""}`}
                onClick={() => setMethod("netbanking")}
              >
                <span className="method-icon">🏛️</span>
                <div>
                  <strong>Net Banking</strong>
                  <small>All Indian Major Banks</small>
                </div>
              </button>
            </div>

            <div className="payment-content">
              {method === "upi" && (
                <div className="upi-pane">
                  <div className="qr-box">
                    <div className="qr-simulated">
                      <div className="qr-scanner-line"></div>
                      <svg className="qr-svg" viewBox="0 0 100 100" fill="none">
                        <rect width="100" height="100" fill="white" />
                        <path d="M10 10h30v30h-30zM15 15h20v20h-20zM60 10h30v30h-30zM65 15h20v20h-20zM10 60h30v30h-30zM15 65h20v20h-20zM45 10h10v10h-10zM45 30h10v10h-10zM10 45h10v10h-10zM30 45h10v10h-10zM50 50h10v10h-10zM60 50h20v10h-20zM50 70h10v20h-10zM70 70h20v20h-20z" fill="#0f2b5c" />
                      </svg>
                    </div>
                    <span className="qr-caption">Scan QR using any UPI App</span>
                    <div className="upi-apps-row">
                      <span>GPay</span>
                      <span>PhonePe</span>
                      <span>Paytm</span>
                      <span>BHIM</span>
                    </div>
                  </div>

                  <div className="upi-divider"><span>OR ENTER VPA / UPI ID</span></div>

                  <form onSubmit={handlePay} className="upi-form">
                    <div className="input-group">
                      <label>UPI ID / VPA</label>
                      <input
                        type="text"
                        placeholder="e.g. yourname@oksbi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary pay-now-btn">
                      Verify & Pay ₹{amount?.toLocaleString("en-IN")}
                    </button>
                  </form>
                </div>
              )}

              {method === "card" && (
                <form onSubmit={handlePay} className="card-pane">
                  <div className="input-group">
                    <label>Card Number</label>
                    <div className="input-with-icon">
                      <span>💳</span>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8920"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="card-sub-grid">
                    <div className="input-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>CVV / CVC</label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary pay-now-btn">
                    Pay Securely ₹{amount?.toLocaleString("en-IN")}
                  </button>
                </form>
              )}

              {method === "netbanking" && (
                <form onSubmit={handlePay} className="netbanking-pane">
                  <label className="bank-select-label">Select Popular Bank</label>
                  <div className="banks-grid">
                    {[
                      { id: "sbi", name: "State Bank of India", icon: "🏛️" },
                      { id: "hdfc", name: "HDFC Bank", icon: "🏢" },
                      { id: "icici", name: "ICICI Bank", icon: "🏦" },
                      { id: "axis", name: "Axis Bank", icon: "🏢" },
                      { id: "pnb", name: "Punjab National Bank", icon: "🏛️" },
                      { id: "kotak", name: "Kotak Mahindra Bank", icon: "🏦" }
                    ].map((b) => (
                      <label
                        key={b.id}
                        className={`bank-pill ${selectedBank === b.id ? "selected" : ""}`}
                        onClick={() => setSelectedBank(b.id)}
                      >
                        <input
                          type="radio"
                          name="bank"
                          value={b.id}
                          checked={selectedBank === b.id}
                          onChange={() => setSelectedBank(b.id)}
                        />
                        <span className="bank-icon">{b.icon}</span>
                        <span className="bank-name">{b.name}</span>
                      </label>
                    ))}
                  </div>

                  <button type="submit" className="btn btn-primary pay-now-btn">
                    Proceed with Net Banking ₹{amount?.toLocaleString("en-IN")}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
