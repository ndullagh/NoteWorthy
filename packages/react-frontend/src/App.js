import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignIn from "./pages/sign-in";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
