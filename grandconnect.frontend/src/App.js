import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoomPage from "./pages/RoomPage";
import Matchmaking from "./pages/Matchmaking";
import ExistingRooms from "./pages/ExistingRooms";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/room/:slug" element={<RoomPage/>} />
          <Route path="/match" element={<Matchmaking/>} />
          <Route path="/existing-rooms" element={<ExistingRooms/>} />
        </Routes>
    </Router>
  );
}

export default App;
