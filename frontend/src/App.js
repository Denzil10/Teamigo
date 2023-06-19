import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Inbox from "./pages/Inbox";
import Home from "./pages/Home";
import Forum from "./pages/Forum";

function App() {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/Inbox" element={<Inbox />} />
      <Route path="/Forum/:search_type/:event_id" element={<Forum />} />
    </Router>
  );
}

export default App;
