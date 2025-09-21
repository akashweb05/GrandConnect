import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function RoomPage() {
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starter, setStarter] = useState("");
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    async function fetchStarter() {
      try {
        const res = await fetch("https://localhost:7266/api/Conversation/starter");
        const data = await res.json();
        setStarter(data.question);
      } catch {}
    }
    fetchStarter();
  }, []);

  useEffect(() => {
    fetchRoom();
  }, [slug]);

  async function fetchRoom() {
    try {
      const res = await fetch(`https://localhost:7266/api/Rooms/${slug}`);
      if (!res.ok) {
        setRoom(null);
      } else {
        const data = await res.json();
        setRoom(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!room) return <div>Room not found. <Link to="/">Go home</Link></div>;

  const jitsiRoomName = `GrandConnect-${room.slug}`;
  const jitsiUrl = `https://meet.jit.si/${encodeURIComponent(jitsiRoomName)}#userInfo.displayName="Guest"`;
  const roomLink = `${window.location.origin}/room/${room.slug}`;

  function copyLink() {
    navigator.clipboard.writeText(roomLink);
    alert("Room link copied!");
  }

  function shareWhatsApp() {
    const text = `Join my GrandConnect room: ${roomLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <div style={{ padding: 20 }}>
      {starter && (
        <div style={{ padding: 12, background: "#f9fafb", borderRadius: 8, marginBottom: 12 }}>
          <strong>Conversation Starter:</strong> {starter}
        </div>
      )}

      <h2>{room.name}</h2>
      <p className="small">{room.description}</p>
      <div style={{ marginBottom: 12 }}>
        <div className="small">Tip: open this page in multiple browser windows (or share link) to simulate participants.</div>
      </div>

      {/* Video */}
      <div style={{ height: "650px", marginBottom: 16 }}>
        <iframe
          title="Jitsi Room"
          src={jitsiUrl}
          style={{ width: "100%", height: "100%", border: "0", borderRadius: 8 }}
          allow="camera; microphone; fullscreen; display-capture"
        />
      </div>

      {/* Invite Options Card */}
      <div className="card shadow-sm p-4 rounded-lg">
        <h4 className="fw-bold mb-3">Invite Others</h4>
        <p className="text-muted mb-3">Share this room with friends or family easily:</p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: 12 }}>
          <button 
            className="btn btn-outline-primary flex-grow-1"
            onClick={() => setShowQR(!showQR)}
          >
            {showQR ? "Hide QR Code" : "Show QR Code"}
          </button>
          <button className="btn btn-outline-secondary flex-grow-1" onClick={copyLink}>
            Copy Link
          </button>
          <button className="btn btn-success flex-grow-1" onClick={shareWhatsApp}>
            Share via WhatsApp
          </button>
        </div>

        {showQR && (
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <QRCodeCanvas value={roomLink} size={180} />
          </div>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/"><button className="btn btn-secondary">Back to rooms</button></Link>
      </div>
    </div>
  );
}
