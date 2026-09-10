import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TrainResults from "./pages/TrainResults";
import PassengerDetails from "./pages/PassengerDetails";
import BookingSummary from "./pages/BookingSummary";
import Ticket from "./pages/Ticket";
import MyBookings from "./pages/MyBookings";

// Modals
import AuthModal from "./components/AuthModal";
import PnrModal from "./components/PnrModal";
import RouteModal from "./components/RouteModal";
import PaymentModal from "./components/PaymentModal";
import AboutModal from "./components/AboutModal";
import ContactModal from "./components/ContactModal";
import Toast from "./components/Toast";

// Initial sample booking for rich initial UI
const initialDefaultBookings = [
  {
    pnr: "RE8492019342",
    status: "CONFIRMED",
    train: {
      number: "12301",
      name: "Howrah Rajdhani Express",
      type: "Rajdhani",
      from: "Howrah Junction",
      to: "New Delhi",
      departure: "16:50",
      arrival: "10:00",
      duration: "17h 10m",
      fare: 1895
    },
    search: {
      from: "Howrah Junction",
      to: "New Delhi",
      date: new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0],
      className: "3A"
    },
    selectedClass: "3A",
    passengers: [
      {
        id: 101,
        name: "Soumen Mudi",
        age: "26",
        gender: "Male",
        preference: "Lower Berth",
        meal: "Veg Meal"
      }
    ],
    coach: "B3",
    berths: ["36 (Lower Berth)"],
    payment: {
      paymentMethod: "UPI (Google Pay)",
      transactionId: "TXN94028510",
      paidAt: "10 Sep 2026, 04:30 PM"
    },
    farePerPerson: 1895,
    baseTotal: 1895,
    convenienceFee: 20,
    finalTotal: 1915
  }
];

export default function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState({
    from: "Howrah Junction",
    to: "New Delhi",
    date: "",
    className: "All Classes"
  });
  const [train, setTrain] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);

  // Persistence: Bookings
  const [savedBookings, setSavedBookings] = useState(() => {
    try {
      const stored = localStorage.getItem("railease_bookings");
      return stored ? JSON.parse(stored) : initialDefaultBookings;
    } catch {
      return initialDefaultBookings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("railease_bookings", JSON.stringify(savedBookings));
    } catch (e) {
      console.error("Failed to save bookings to localStorage", e);
    }
  }, [savedBookings]);

  // Persistence: User Session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("railease_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Modals state
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: "login" });
  const [pnrModalOpen, setPnrModalOpen] = useState(false);
  const [routeModal, setRouteModal] = useState({ isOpen: false, train: null });
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation handlers
  const handleNavigate = (target) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (target === "home") {
      setPage("home");
    } else if (target === "trains") {
      setPage("trains");
    } else if (target === "bookings") {
      setPage("bookings");
    }
  };

  const handleSearchTrains = () => {
    setPage("trains");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectTrain = (selectedTrain) => {
    setTrain(selectedTrain);
    setPage("passenger");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmPassenger = (data) => {
    setBookingData(data);
    setPage("summary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProceedToPayment = (finalBookingData) => {
    setBookingData(finalBookingData);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    // Generate new PNR & berth allocation
    const generatedPnr = "RE" + Math.floor(1000000000 + Math.random() * 8999999999);
    const coaches = ["B1", "B2", "B3", "B4", "A1", "H1", "C1", "E1"];
    const randomCoach = coaches[Math.floor(Math.random() * coaches.length)];

    const assignedBerths = (bookingData?.passengers || [{}]).map((p, idx) => {
      const seatNum = Math.floor(Math.random() * 50) + 1 + idx;
      const pref = p.preference && p.preference !== "No Preference" ? p.preference : "Lower Berth";
      return `${seatNum} (${pref})`;
    });

    const newBooking = {
      pnr: generatedPnr,
      status: "CONFIRMED",
      train,
      search,
      passengers: bookingData?.passengers || [],
      selectedClass: bookingData?.selectedClass || "3A",
      farePerPerson: bookingData?.farePerPerson || train?.fare || 900,
      baseTotal: bookingData?.baseTotal || train?.fare || 900,
      convenienceFee: bookingData?.convenienceFee || 20,
      discount: bookingData?.discount || 0,
      finalTotal: bookingData?.finalTotal || (train?.fare || 900) + 20,
      coach: randomCoach,
      berths: assignedBerths,
      payment: paymentDetails,
      bookedAt: new Date().toISOString()
    };

    // Save to booking list
    setSavedBookings((prev) => [newBooking, ...prev]);
    setCurrentBooking(newBooking);
    setPage("ticket");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(`Booking Confirmed! PNR: ${generatedPnr}`, "success");
  };

  const handleCancelBooking = (pnrToCancel) => {
    const booking = savedBookings.find((b) => b.pnr === pnrToCancel);
    if (!booking) return;

    const refund = Math.max(0, (booking.finalTotal || booking.totalAmount || 1000) - 120);
    const confirmed = window.confirm(
      `Are you sure you want to cancel PNR ${pnrToCancel}?\n\nStandard IRCTC clerkage fee: ₹120\nRefund Amount: ₹${refund.toLocaleString("en-IN")}\n\nThe refund will be credited back within 2-4 hours.`
    );

    if (confirmed) {
      setSavedBookings((prev) =>
        prev.map((b) => (b.pnr === pnrToCancel ? { ...b, status: "CANCELLED" } : b))
      );
      showToast(`Booking ${pnrToCancel} cancelled. Refund of ₹${refund.toLocaleString("en-IN")} initiated.`, "info");
    }
  };

  const handleViewTicket = (bookingItem) => {
    setCurrentBooking(bookingItem);
    setPage("ticket");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginSuccess = (userData, message) => {
    setCurrentUser(userData);
    showToast(message, "success");
  };

  const handleLogout = () => {
    localStorage.removeItem("railease_user");
    setCurrentUser(null);
    showToast("You have been signed out.", "info");
  };

  return (
    <div className="app">
      {/* Toast notifications container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Main Global Navbar */}
      <Navbar
        activePage={page}
        onNavigate={handleNavigate}
        onOpenPnr={() => setPnrModalOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Pages View */}
      {page === "home" && (
        <Home
          search={search}
          setSearch={setSearch}
          onSearch={handleSearchTrains}
          onOpenPnr={() => setPnrModalOpen(true)}
          onNavigateBookings={() => handleNavigate("bookings")}
          onShowToast={showToast}
        />
      )}

      {page === "trains" && (
        <TrainResults
          search={search}
          onSelect={handleSelectTrain}
          onModifySearch={() => {
            setPage("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onViewRoute={(t) => setRouteModal({ isOpen: true, train: t })}
        />
      )}

      {page === "passenger" && (
        <PassengerDetails
          train={train}
          search={search}
          onConfirm={handleConfirmPassenger}
          onBack={() => setPage("trains")}
          onShowToast={showToast}
        />
      )}

      {page === "summary" && (
        <BookingSummary
          train={train}
          search={search}
          bookingData={bookingData}
          onProceedToPayment={handleProceedToPayment}
          onBack={() => setPage("passenger")}
          onShowToast={showToast}
        />
      )}

      {page === "ticket" && (
        <Ticket
          booking={currentBooking}
          onHome={() => {
            setPage("home");
            setTrain(null);
            setBookingData(null);
          }}
          onViewBookings={() => handleNavigate("bookings")}
        />
      )}

      {page === "bookings" && (
        <MyBookings
          bookings={savedBookings}
          onViewTicket={handleViewTicket}
          onCancelBooking={handleCancelBooking}
          onNewBooking={() => handleNavigate("home")}
        />
      )}

      {/* Global Modals */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: "login" })}
        onLoginSuccess={handleLoginSuccess}
      />

      <PnrModal
        isOpen={pnrModalOpen}
        onClose={() => setPnrModalOpen(false)}
        savedBookings={savedBookings}
        onViewTicket={handleViewTicket}
      />

      <RouteModal
        isOpen={routeModal.isOpen}
        train={routeModal.train}
        onClose={() => setRouteModal({ isOpen: false, train: null })}
        onSelectTrain={handleSelectTrain}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        amount={bookingData?.finalTotal || (train?.fare || 900) + 20}
        train={train}
        passengers={bookingData?.passengers || [{}]}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <span className="footer-logo">🚆 RailEase</span>
          <span>© 2026 RailEase Technologies Pvt Ltd. All rights reserved.</span>
        </div>
        <div className="footer-links">
          <button type="button" onClick={() => setPnrModalOpen(true)}>PNR Status</button>
          <button type="button" onClick={() => handleNavigate("bookings")}>My Bookings</button>
          <button type="button" onClick={() => setAboutModalOpen(true)}>About Us</button>
          <button type="button" onClick={() => setContactModalOpen(true)}>Help & Contact</button>
        </div>
        <div className="footer-tech">
          React · Vite · IRCTC Grade Security · 100% Verified Reservations
        </div>
      </footer>
    </div>
  );
}