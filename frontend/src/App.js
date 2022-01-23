import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './containers/HomePage/HomePage'
import LoginPage from "./containers/LoginPage/LoginPage";

function App() {
  document.title = "Assignment";
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
