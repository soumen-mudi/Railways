import React, { useState, useMemo } from "react";
import TrainCard from "../components/TrainCard";
import { trains } from "../data/trains";

export default function TrainResults({ search, onSelect, onModifySearch, onViewRoute }) {
  // Filter states
  const [selectedTimes, setSelectedTimes] = useState([]); // ["before6", "6to12", "12to18", "after18"]
  const [selectedClasses, setSelectedClasses] = useState([]); // ["1A", "2A", "3A", "SL", "CC", "EC"]
  const [selectedTypes, setSelectedTypes] = useState([]); // ["Rajdhani", "Vande Bharat", ...]
  const [sortBy, setSortBy] = useState("departure_asc"); // "departure_asc", "departure_desc", "duration", "fare_asc"

  const toggleFilter = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearFilters = () => {
    setSelectedTimes([]);
    setSelectedClasses([]);
    setSelectedTypes([]);
    setSortBy("departure_asc");
  };

  // Parse time helper: "16:50" -> 16.83 hours
  const parseHour = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(":").map(Number);
    return h + (m || 0) / 60;
  };

  // Parse duration: "14h 20m" -> minutes
  const parseDuration = (durStr) => {
    if (!durStr) return 0;
    const hMatch = durStr.match(/(\d+)h/);
    const mMatch = durStr.match(/(\d+)m/);
    const h = hMatch ? parseInt(hMatch[1]) : 0;
    const m = mMatch ? parseInt(mMatch[1]) : 0;
    return h * 60 + m;
  };

  const normalizeStation = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/junction|terminal|cantt|central|city/g, "")
      .trim();
  };

  const filteredTrains = useMemo(() => {
    return trains.filter((t) => {
      // 1. Origin check
      const normSearchFrom = normalizeStation(search.from);
      const normTrainFrom = normalizeStation(t.from);
      const matchFrom =
        !normSearchFrom ||
        normTrainFrom.includes(normSearchFrom) ||
        normSearchFrom.includes(normTrainFrom) ||
        t.from.toLowerCase().includes(search.from.toLowerCase());

      // 2. Destination check
      const normSearchTo = normalizeStation(search.to);
      const normTrainTo = normalizeStation(t.to);
      const matchTo =
        !normSearchTo ||
        normTrainTo.includes(normSearchTo) ||
        normSearchTo.includes(normTrainTo) ||
        t.to.toLowerCase().includes(search.to.toLowerCase());

      // 3. Class check from Search dropdown
      const searchClassMatch =
        !search.className ||
        search.className === "All Classes" ||
        t.classes.some((c) => search.className.includes(c));

      // 4. Time band filters
      let matchTime = true;
      if (selectedTimes.length > 0) {
        const hour = parseHour(t.departure);
        const matchesAnyTime = selectedTimes.some((band) => {
          if (band === "before6") return hour < 6;
          if (band === "6to12") return hour >= 6 && hour < 12;
          if (band === "12to18") return hour >= 12 && hour < 18;
          if (band === "after18") return hour >= 18;
          return false;
        });
        matchTime = matchesAnyTime;
      }

      // 5. Checkbox Classes filter
      let matchClasses = true;
      if (selectedClasses.length > 0) {
        matchClasses = selectedClasses.some((c) => t.classes.includes(c));
      }

      // 6. Checkbox Train Type filter
      let matchTypes = true;
      if (selectedTypes.length > 0) {
        matchTypes = selectedTypes.includes(t.type);
      }

      return matchFrom && matchTo && searchClassMatch && matchTime && matchClasses && matchTypes;
    });
  }, [search, selectedTimes, selectedClasses, selectedTypes]);

  // Sorted list
  const sortedTrains = useMemo(() => {
    const list = [...filteredTrains];
    if (sortBy === "departure_asc") {
      list.sort((a, b) => parseHour(a.departure) - parseHour(b.departure));
    } else if (sortBy === "departure_desc") {
      list.sort((a, b) => parseHour(b.departure) - parseHour(a.departure));
    } else if (sortBy === "duration") {
      list.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
    } else if (sortBy === "fare_asc") {
      list.sort((a, b) => a.fare - b.fare);
    }
    return list;
  }, [filteredTrains, sortBy]);

  const hasActiveFilters =
    selectedTimes.length > 0 || selectedClasses.length > 0 || selectedTypes.length > 0;

  return (
    <main className="results-page">
      <div className="results-head">
        <div>
          <span className="eyebrow">TRAIN SCHEDULE & BOOKING</span>
          <h1>Available Trains</h1>
          <p className="route-subhead">
            <b>{search.from || "All Origin Stations"}</b> ➔ <b>{search.to || "All Destination Stations"}</b>
            {search.date && <span className="date-tag"> · 📅 {search.date}</span>}
          </p>
        </div>
        <button
          className="btn btn-outline modify-search-btn"
          onClick={onModifySearch || (() => window.scrollTo({ top: 0, behavior: "smooth" }))}
        >
          ← Modify Search
        </button>
      </div>

      <div className="results-layout">
        {/* Sidebar Filters */}
        <aside className="filter-card">
          <div className="filter-card-header">
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button type="button" className="clear-filter-btn" onClick={clearFilters}>
                Reset All
              </button>
            )}
          </div>

          <label>Departure Time</label>
          <div className="check-group">
            <label className="check-label">
              <input
                type="checkbox"
                checked={selectedTimes.includes("before6")}
                onChange={() => toggleFilter(selectedTimes, setSelectedTimes, "before6")}
              />
              <span>Early Morning (Before 6 AM)</span>
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={selectedTimes.includes("6to12")}
                onChange={() => toggleFilter(selectedTimes, setSelectedTimes, "6to12")}
              />
              <span>Morning (6 AM – 12 PM)</span>
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={selectedTimes.includes("12to18")}
                onChange={() => toggleFilter(selectedTimes, setSelectedTimes, "12to18")}
              />
              <span>Afternoon (12 PM – 6 PM)</span>
            </label>
            <label className="check-label">
              <input
                type="checkbox"
                checked={selectedTimes.includes("after18")}
                onChange={() => toggleFilter(selectedTimes, setSelectedTimes, "after18")}
              />
              <span>Night (After 6 PM)</span>
            </label>
          </div>

          <hr />

          <label>Coach Class</label>
          <div className="check-grid">
            {["1A", "2A", "3A", "SL", "CC", "EC"].map((cls) => (
              <label className="check-label" key={cls}>
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(cls)}
                  onChange={() => toggleFilter(selectedClasses, setSelectedClasses, cls)}
                />
                <span>{cls}</span>
              </label>
            ))}
          </div>

          <hr />

          <label>Train Category</label>
          <div className="check-group">
            {["Vande Bharat", "Rajdhani", "Shatabdi", "Duronto", "Superfast"].map((type) => (
              <label className="check-label" key={type}>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Train List Section */}
        <section className="train-results">
          <div className="results-toolbar">
            <div className="result-count">
              <b>{sortedTrains.length}</b> trains found for this route
            </div>

            <div className="sort-by-group">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="departure_asc">Departure (Earliest First)</option>
                <option value="departure_desc">Departure (Latest First)</option>
                <option value="duration">Fastest Duration</option>
                <option value="fare_asc">Lowest Base Fare</option>
              </select>
            </div>
          </div>

          {sortedTrains.length > 0 ? (
            <div className="trains-stack">
              {sortedTrains.map((t) => (
                <TrainCard
                  key={t.id}
                  train={t}
                  onSelect={onSelect}
                  onViewRoute={onViewRoute}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <div className="empty-icon">🚆</div>
              <h2>No trains match your filters</h2>
              <p>Try resetting departure time, class filters, or search different origin/destination stations.</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}