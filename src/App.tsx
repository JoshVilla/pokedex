import { useEffect, useState } from "react";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import Pokemon from "./pages/pokemon";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
