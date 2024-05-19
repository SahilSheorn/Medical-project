import React from "react";
import PatientInfo from "./PatientInfo";
import Medi from "./Medi";
import Test from "./Test";
import Navbar from "./Navbar";
import PatientRecord from "./PatientRecord";

function Home({ handleLogout }) {
  return (
    <>
      <div>
        <Navbar handleLogout={handleLogout} />
      </div>
      <div className="m-3 flex flex-row justify-around h-screen w-full">
        <div className="flex flex-column print-d-none">
          <PatientRecord/>
          {/* <Test /> */}
        </div>
        <Medi />
      </div>
    </>
  );
}

export default Home;