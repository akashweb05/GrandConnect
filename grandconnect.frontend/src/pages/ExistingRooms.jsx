import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ExistingRooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    try {
      const res = await fetch("https://localhost:7266/api/Rooms");
      const data = await res.json();
      setRooms(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Existing Rooms</h2>
      {rooms.length === 0 && (
        <p className="text-center lead">No rooms available yet — create one from the homepage!</p>
      )}
      <div className="row">
        {rooms.map((room) => (
          <div className="col-md-6 mb-4" key={room.roomId}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text flex-grow-1">{room.description || "No description"}</p>
                <button
                  className="btn btn-primary btn-lg mt-3"
                  onClick={() => navigate(`/room/${room.slug}`)}
                >
                  Join {room.name}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
