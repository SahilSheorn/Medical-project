// import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// import PatientInfo from './PatientInfo';
// import Test from './Test';
import React, { useState } from 'react';
import PatientInfo from './PatientInfo';
import Test from './Test';
import Report from './Report';


function PatientRecord() {
    const [currentTab, setCurrentTab] = useState('PatientInfo');

    // const handleTabClick = (tabName) => {
    //     setCurrentTab(tabName);
    // };
    const [activeTab, setActiveTab] = useState('Patient Info');
    const [showPatientInfo, setShowPatientInfo] = useState(true);
    const [showMedicalTest, setShowMedicalTest] = useState(false);
    const [showReportData, setShowReportData] = useState(false);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        if (tabName === 'Patient Info') {
            setShowPatientInfo(true);
            setShowMedicalTest(false);
            setShowReportData(false);
        }
        if (tabName === 'Medical Test') {
            setShowPatientInfo(false);
        }
        else if (tabName === 'Report Data') {
            setShowPatientInfo(false);
            setShowMedicalTest(false);
            setShowReportData(true);
        }
    };


    return (
        <div>
            {/* <div className="w-full flex justify-between">
                <button
                    className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Patient Info' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => handleTabClick('Patient Info')}
                >
                    Patient Info
                </button>
                <button
                    className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Medical Test' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => handleTabClick('Medical Test')}
                >
                    Medical Test
                </button>
                <button
                    className={`px-4 py-2 rounded-md focus:outline-none ${activeTab === 'Report Data' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => handleTabClick('Report Data')}
                >
                    Report Data
                </button>
            </div> */}
            {!showPatientInfo && <Test handleTabClick={handleTabClick} />}
            {showPatientInfo && <PatientInfo handleTabClick={handleTabClick} />}
            {showReportData && <Report />}
            {/* {currentTab === 'PatientInfo' && <PatientInfo handleTabClick={handleTabClick} />} */}
            {currentTab === 'Medical Test' && <Test handleTabClick={handleTabClick} />}
        </div>
    );
}

export default PatientRecord;
