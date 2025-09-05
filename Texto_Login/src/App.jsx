import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componenets/login/login.jsx";
import Signup from "../src/componenets/signup/Signup.jsx";
import Home from "./componenets/home/Home.jsx";
import Segments from "./componenets/lists_segments/Segments.jsx";
import Lists from "./componenets/lists_segments/Lists.jsx";
import Profiles from "./componenets/profiles/Profiles.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/list" element={<Lists/>}/>
        <Route path="/profiles" element={<Profiles/>}/>
        <Route path="/segments" element={<Segments/>}/>
      </Routes>
    </Router>
  );
}

export default App;

