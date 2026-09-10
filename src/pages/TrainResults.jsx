import React, { useMemo } from "react";
import TrainCard from "../components/TrainCard";
import { trains } from "../data/trains";

export default function TrainResults({ search, onSelect }) {
  const results = useMemo(() => {
    return trains.filter(t => {
      const from = !search.from || t.from.toLowerCase().includes(search.from.toLowerCase()) || search.from.toLowerCase().includes(t.from.toLowerCase());
      const to = !search.to || t.to.toLowerCase().includes(search.to.toLowerCase()) || search.to.toLowerCase().includes(t.to.toLowerCase());
      const cls = search.className === "All Classes" || t.classes.includes(search.className);
      return from && to && cls;
    });
  }, [search]);

  return (
    <main className="results-page">
      <div className="results-head">
        <div><span className="eyebrow">TRAIN SEARCH</span><h1>Available Trains</h1><p>{search.from || "All stations"} → {search.to || "All stations"} {search.date ? `· ${search.date}` : ""}</p></div>
        <button className="btn btn-outline" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>← Modify Search</button>
      </div>
      <div className="results-layout">
        <aside className="filter-card">
          <h3>Filters</h3>
          <label>Departure</label>
          <div className="check"><input type="checkbox" /> Before 6 AM</div>
          <div className="check"><input type="checkbox" /> 6 AM – 12 PM</div>
          <div className="check"><input type="checkbox" /> 12 PM – 6 PM</div>
          <div className="check"><input type="checkbox" /> After 6 PM</div>
          <hr />
          <label>Class</label>
          {["1A","2A","3A","SL","CC"].map(x => <div className="check" key={x}><input type="checkbox" /> {x}</div>)}
        </aside>
        <section className="train-results">
          <div className="result-count">{results.length} trains found</div>
          {results.length ? results.map(t => <TrainCard key={t.id} train={t} onSelect={onSelect} />) : <div className="empty"><div>🚆</div><h2>No trains found</h2><p>Try different stations or class.</p></div>}
        </section>
      </div>
    </main>
  );
}