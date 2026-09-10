import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TrainResults from "./pages/TrainResults";
import PassengerDetails from "./pages/PassengerDetails";
import BookingSummary from "./pages/BookingSummary";
import Ticket from "./pages/Ticket";

export default function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState({from:"", to:"", date:"", className:"All Classes"});
  const [train, setTrain] = useState(null);
  const [passenger, setPassenger] = useState(null);
  const [pnr, setPnr] = useState("");

  const searchTrains = () => setPage("trains");
  const selectTrain = (t) => { setTrain(t); setPage("passenger"); };
  const confirmPassenger = (p) => { setPassenger(p); setPage("summary"); };
  const book = (id) => { setPnr(id); setPage("ticket"); };
  const home = () => { setPage("home"); setTrain(null); setPassenger(null); };

  return (
    <div className="app">
      <Navbar onNavigate={p => p === "home" ? home() : alert(`${p[0].toUpperCase()+p.slice(1)} section is coming next!`)} />
      {page === "home" && <Home search={search} setSearch={setSearch} onSearch={searchTrains} />}
      {page === "trains" && <TrainResults search={search} onSelect={selectTrain} />}
      {page === "passenger" && <PassengerDetails train={train} search={search} onConfirm={confirmPassenger} onBack={() => setPage("trains")} />}
      {page === "summary" && <BookingSummary train={train} search={search} passenger={passenger} onConfirm={book} onBack={() => setPage("passenger")} />}
      {page === "ticket" && <Ticket train={train} search={search} passenger={passenger} pnr={pnr} onHome={home} />}
      <footer className="footer"><div>© 2026 RailEase. Built as a frontend web application.</div><div>React.js · JavaScript · HTML · CSS</div></footer>
    </div>
  );
}