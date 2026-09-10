import React, { useState } from "react";
import { stations } from "../data/stations";

export default function SearchBox({ search, setSearch, onSearch }) {
  const [activeField, setActiveField] = useState(null);

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
      return stations.slice(0, 6);
    }

    return stations
      .filter((station) =>
        `${station.name} ${station.city} ${station.state} ${station.code}`
          .toLowerCase()
          .includes(value.toLowerCase())
      )
      .slice(0, 6);
  };

  const selectStation = (field, station) => {
    update(field, station.name);
    setActiveField(null);
  };

  const handleSearch = () => {
    if (!search.from) {
      alert("Please select your departure station.");
      return;
    }

    if (!search.to) {
      alert("Please select your destination station.");
      return;
    }

    if (search.from === search.to) {
      alert("From and To stations cannot be the same.");
      return;
    }

    if (!search.date) {
      alert("Please select your journey date.");
      return;
    }

    onSearch();
  };

  return (
    <div className="search-wrap">

      {/* Search Tabs */}
      <div className="search-tabs">
        <button className="active">
          🚆 &nbsp;Book Tickets
        </button>

        <button
          onClick={() => alert("PNR status feature coming next!")}
        >
          ⌕ &nbsp;PNR Status
        </button>

        <button
          onClick={() => alert("My bookings feature coming next!")}
        >
          ▣ &nbsp;My Bookings
        </button>
      </div>

      <div className="search-grid">

        {/* FROM */}
        <label className="station-field">
          <span>From</span>

          <div className="input-with-icon">
            <span>📍</span>

            <input
              value={search.from}
              onChange={(e) => {
                update("from", e.target.value);
                setActiveField("from");
              }}
              onFocus={() => setActiveField("from")}
              placeholder="Select Station"
            />
          </div>

          {activeField === "from" && (
            <div className="station-dropdown">

              <div className="dropdown-title">
                Popular Stations
              </div>

              {getSuggestions(search.from).map((station) => (
                <button
                  className="station-option"
                  key={station.code}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    selectStation("from", station)
                  }
                >
                  <span className="station-icon">🚉</span>

                  <span className="station-details">
                    <strong>
                      {station.name}
                    </strong>

                    <small>
                      {station.city}, {station.state}
                    </small>
                  </span>

                  <span className="station-code">
                    {station.code}
                  </span>
                </button>
              ))}

              {getSuggestions(search.from).length === 0 && (
                <div className="no-stations">
                  No stations found
                </div>
              )}
            </div>
          )}
        </label>


        {/* SWAP */}
        <button
          className="swap"
          onClick={swap}
          title="Swap stations"
        >
          ⇄
        </button>


        {/* TO */}
        <label className="station-field">
          <span>To</span>

          <div className="input-with-icon">
            <span>📍</span>

            <input
              value={search.to}
              onChange={(e) => {
                update("to", e.target.value);
                setActiveField("to");
              }}
              onFocus={() => setActiveField("to")}
              placeholder="Select Station"
            />
          </div>

          {activeField === "to" && (
            <div className="station-dropdown">

              <div className="dropdown-title">
                Popular Stations
              </div>

              {getSuggestions(search.to).map((station) => (
                <button
                  className="station-option"
                  key={station.code}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() =>
                    selectStation("to", station)
                  }
                >
                  <span className="station-icon">🚉</span>

                  <span className="station-details">
                    <strong>
                      {station.name}
                    </strong>

                    <small>
                      {station.city}, {station.state}
                    </small>
                  </span>

                  <span className="station-code">
                    {station.code}
                  </span>
                </button>
              ))}

              {getSuggestions(search.to).length === 0 && (
                <div className="no-stations">
                  No stations found
                </div>
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
              onChange={(e) =>
                update("date", e.target.value)
              }
            />
          </div>
        </label>


        {/* CLASS */}
        <label>
          <span>Class</span>

          <div className="input-with-icon">
            <span>💺</span>

            <select
              value={search.className}
              onChange={(e) =>
                update("className", e.target.value)
              }
            >
              <option>All Classes</option>
              <option>1A</option>
              <option>2A</option>
              <option>3A</option>
              <option>SL</option>
              <option>CC</option>
              <option>EC</option>
            </select>
          </div>
        </label>


        {/* SEARCH */}
        <button
          className="search-btn"
          onClick={handleSearch}
        >
          ⌕ &nbsp; Search Trains
        </button>

      </div>
    </div>
  );
}