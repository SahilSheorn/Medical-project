import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AllData from "./components/AllData";
import { Routes, Route } from "react-router-dom";
import DbData from "./components/DbData";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<AllData />} />
        <Route path="/dbData"
          element={
            <>
              <Navbar handleLogout={handleLogout} />
              <DbData />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
