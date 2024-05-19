import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AllData from "./components/AllData";
import { Routes, Route } from "react-router-dom";
import DbData from "./components/DbData";
import Navbar from "./components/Navbar";
import PatientInfo from './components/PatientInfo';
import Test from './components/Test';
import Report from './components/Report';
import Setting from './components/Setting';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<AllData />} />
        <Route path="/patientinfo" element={<PatientInfo />} />
        <Route path="/test" element={<Test />} />
        <Route path="/report" element={<Report />} />
        <Route path="/Setting" element={<Setting />} />

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
