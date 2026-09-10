import React, { useState, useEffect } from "react";
import { stations } from "../data/stations";

export default function SearchBox({
  search,
  setSearch,
  onSearch,
  onOpenPnr,
  onNavigateBookings,
  onShowToast
}) {
  const [activeField, setActiveField] = useState(null);

  // Set default journey date to tomorrow if not set
  useEffect(() => {
    if (!search.date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSearch((prev) => ({
        ...prev,
        date: tomorrow.toISOString().split("T")[0]
      }));
    }
  }, []);

  const update = (key, value) => {
    setSearch({
      ...search,
      [key]: value
    });
  };

  const swap = () => {
    setSearch({
      ...search,
      from: search.to,
      to: search.from
    });
  };

  const getSuggestions = (value) => {
    if (!value) {
      return stations.slice(0, 7);
    }

    return stations
      .filter((station) =>
        `${station.name} ${station.city} ${station.state} ${station.code}`
          .toLowerCase()
          .includes(value.toLowerCase())
      )
      .slice(0, 7);
  };

  const selectStation = (field, station) => {
    update(field, station.name);
    setActiveField(null);
  };

  const notify = (msg) => {
    if (onShowToast) {
      onShowToast(msg, "error");
    } else {
      alert(msg);
    }
  };

  const handleSearch = () => {
    if (!search.from) {
      notify("Please select your departure station.");
      return;
    }

    if (!search.to) {
      notify("Please select your destination station.");
      return;
    }

    if (search.from === search.to) {
      notify("Departure and Destination stations cannot be the same.");
      return;
    }

    if (!search.date) {
      notify("Please select your journey date.");
      return;
    }

    onSearch();
  };

  return (
    <div className="search-wrap">
      {/* Search Tabs */}
      <div className="search-tabs">
        <button className="active">
          🚆 &nbsp;Book Train Tickets
        </button>

        <button
          type="button"
          onClick={() => {
            if (onOpenPnr) onOpenPnr();
          }}
        >
          ⌕ &nbsp;Check PNR Status
        </button>

        <button
          type="button"
          onClick={() => {
            if (onNavigateBookings) onNavigateBookings();
          }}
        >
          ▣ &nbsp;My Bookings
        </button>
      </div>

      <div className="search-grid">
        {/* FROM */}
        <label className="station-field">
          <span>Leaving From</span>
          <div className="input-with-icon">
            <span>🚉</span>
            <input
              value={search.from}
              onChange={(e) => {
                update("from", e.target.value);
                setActiveField("from");
              }}
              onFocus={() => setActiveField("from")}
              placeholder="e.g. Howrah Junction"
            />
          </div>

          {activeField === "from" && (
            <div className="station-dropdown">
              <div className="dropdown-title">Select Origin Station</div>
              {getSuggestions(search.from).map((station) => (
                <button
                  type="button"
                  className="station-option"
                  key={station.code + "_from"}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectStation("from", station)}
                >
                  <span className="station-icon">📍</span>
                  <span className="station-details">
                    <strong>{station.name}</strong>
                    <small>{station.city}, {station.state}</small>
                  </span>
                  <span className="station-code">{station.code}</span>
                </button>
              ))}

              {getSuggestions(search.from).length === 0 && (
                <div className="no-stations">No matching stations found</div>
              )}
            </div>
          )}
        </label>

        {/* SWAP */}
        <button
          type="button"
          className="swap"
          onClick={swap}
          title="Swap origin and destination stations"
          aria-label="Swap stations"
        >
          ⇄
        </button>

        {/* TO */}
        <label className="station-field">
          <span>Going To</span>
          <div className="input-with-icon">
            <span>🏁</span>
            <input
              value={search.to}
              onChange={(e) => {
                update("to", e.target.value);
                setActiveField("to");
              }}
              onFocus={() => setActiveField("to")}
              placeholder="e.g. New Delhi"
            />
          </div>

          {activeField === "to" && (
            <div className="station-dropdown">
              <div className="dropdown-title">Select Destination Station</div>
              {getSuggestions(search.to).map((station) => (
                <button
                  type="button"
                  className="station-option"
                  key={station.code + "_to"}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectStation("to", station)}
                >
                  <span className="station-icon">📍</span>
                  <span className="station-details">
                    <strong>{station.name}</strong>
                    <small>{station.city}, {station.state}</small>
                  </span>
                  <span className="station-code">{station.code}</span>
                </button>
              ))}

              {getSuggestions(search.to).length === 0 && (
                <div className="no-stations">No matching stations found</div>
              )}
            </div>
          )}
        </label>

        {/* DATE */}
        <label>
          <span>Journey Date</span>
          <div className="input-with-icon">
            <span>📅</span>
            <input
              type="date"
              value={search.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => update("date", e.target.value)}
            />
          </div>
        </label>

        {/* CLASS */}
        <label>
          <span>Travel Class</span>
          <div className="input-with-icon">
            <span>💺</span>
            <select
              value={search.className}
              onChange={(e) => update("className", e.target.value)}
            >
              <option>All Classes</option>
              <option>1A - AC First Class</option>
              <option>2A - AC 2 Tier</option>
              <option>3A - AC 3 Tier</option>
              <option>SL - Sleeper</option>
              <option>CC - AC Chair Car</option>
              <option>EC - Exec Chair Car</option>
              <option>2S - Second Sitting</option>
            </select>
          </div>
        </label>

        {/* SEARCH */}
        <button
          type="button"
          className="search-btn"
          onClick={handleSearch}
        >
          ⌕ &nbsp; Search Trains
        </button>
      </div>
    </div>
  );
}