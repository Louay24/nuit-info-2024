import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFound, Game } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
