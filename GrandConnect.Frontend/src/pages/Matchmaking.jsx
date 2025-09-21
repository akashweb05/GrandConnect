import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Matchmaking() {
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("Gardening");
  const [mood, setMood] = useState("🙂");
  const navigate = useNavigate();

  async function handleJoin(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Enter your name");
    try {
      const res = await fetch("https://localhost:7266/api/Matchmaking/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: name, interest, mood }),
      });
      const data = await res.json();
      navigate(`/room/${data.slug}?user=${data.userId}`);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 500, marginTop: 40 }}>
      <div className="card shadow-sm p-4 rounded-lg">
        <h2 className="fw-bold mb-4 text-center">Join via Matchmaking</h2>
        <form onSubmit={handleJoin}>
          
          <input
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-control mb-3"
            style={{ padding: "12px 16px", fontSize: 16, borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
          />

          <label className="fw-semibold mb-1">Pick an interest</label>
          <select
            value={interest}
            onChange={e => setInterest(e.target.value)}
            className="form-select mb-3"
            style={{ padding: "12px 16px", fontSize: 16, borderRadius: 12 }}
          >
            <option>Gardening</option>
            <option>Movies</option>
            <option>Cooking</option>
            <option>Knitting</option>
            <option>Music</option>
          </select>

          <label className="fw-semibold mb-2">Mood check-in</label>
          <div className="d-flex mb-3 justify-content-between">
            {["😊","🙂","😐","😞"].map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`btn ${mood===m ? 'text-white' : 'btn-light'}`}
                style={{
                  fontSize: 28,
                  flex: 1,
                  margin: 2,
                  background: mood === m ? "#0066ff" : "#f0f0f0",
                  borderRadius: 12,
                  border: "none",
                  padding: "8px 0",
                  cursor: "pointer"
                }}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            style={{ padding: "12px 0", fontSize: 18, borderRadius: 12, background: "linear-gradient(90deg, #0066ff, #3399ff)" }}
          >
            Find my room
          </button>

        </form>
      </div>
    </div>
  );
}
