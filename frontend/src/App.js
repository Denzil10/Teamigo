import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Inbox from "./pages/Inbox";
import Home from "./pages/Home";
import Forum from "./pages/Forum";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Inbox" element={<Inbox />} />
        <Route path="/Forum/:search_type/:event_id" element={<Forum />} />
        {/* Add a "catch-all" route for other routes */}
        {/* <Route component={"NotFound"} /> */}
      </Routes>
    </Router>
  );
}

export default App;
