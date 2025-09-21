import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function createRoom() {
    if (!name.trim()) return alert("Enter a room name");
    setLoading(true);
    try {
      const res = await fetch("https://localhost:7266/api/Rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: desc }),
      });
      const room = await res.json();
      setName("");
      setDesc("");
      navigate(`/room/${room.slug}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create room");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ paddingTop: "30px", paddingBottom: "30px" }}>

      {/* Header with left title and right tagline */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="fw-bold display-6 mb-0">GrandConnect</h1>
        <div className="small text-muted">Simple video rooms for seniors</div>
      </div>

      {/* Optional subtitle */}
      <p className="text-muted mb-4">
        Connect with others easily — choose an action below.
      </p>

      {/* Grid layout */}
      <div className="row g-4">

        {/* Top Row: Create & Join (full width) */}
        <div className="col-12 d-flex align-items-stretch">
          <div className="card shadow-sm p-4 rounded-lg w-100 text-center d-flex flex-column justify-content-center">
            <h3 className="fw-bold mb-3">Create Room & Let others join</h3>
            <input
              type="text"
              className="form-control form-control-lg mb-2"
              placeholder="Room name (e.g. Gardening)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-lg mb-3"
              placeholder="Short description (optional)"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <button
              className="btn btn-primary btn-lg w-100"
              style={{ background: "linear-gradient(90deg, #0066ff, #3399ff)" }}
              onClick={createRoom}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create & Join Room"}
            </button>
          </div>
        </div>

        {/* Bottom Row: Matchmaking + Existing Rooms */}
        <div className="col-12 col-md-6 d-flex align-items-stretch">
          <div className="card shadow-sm p-4 rounded-lg w-100 text-center d-flex flex-column justify-content-center">
            <h3 className="fw-bold mb-3">🎯 Smart Matchmaking</h3>
            <p className="text-muted mb-3">
              Auto-assign you based on hobbies and mood.
            </p>
            <button
              className="btn btn-success btn-lg w-100 mt-auto"
              style={{ background: "linear-gradient(90deg, #28a745, #5cd65c)" }}
              onClick={() => navigate("/match")}
            >
              Try Matchmaking
            </button>
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex align-items-stretch">
          <div className="card shadow-sm p-4 rounded-lg w-100 text-center d-flex flex-column justify-content-center">
            <h3 className="fw-bold mb-3">📋 Join Existing Room</h3>
            <p className="text-muted mb-3">
              See all active rooms and join the conversation.
            </p>
            <button
              className="btn btn-outline-secondary btn-lg w-100 mt-auto"
              onClick={() => navigate("/existing-rooms")}
            >
              View Rooms
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
