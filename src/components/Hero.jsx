import React from 'react';
import { Namedt } from '../data/Namedata';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function Hero({ user }) {

    const isDbDataPath = window.location.pathname.includes("/dbData");

    console.log("this is user=>", user, user?.report?.info?.firstName, isDbDataPath)
    const patientData = useSelector(state => state.patientData);
    const parsedDate = new Date();



    const formattedDate = `${parsedDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} ${parsedDate.getDate()} ${parsedDate.toLocaleString('en-US', { month: 'short' })}, ${parsedDate.getFullYear()}`;

    return (
        <>
            <div className='container pb-3 mb-2' style={{ borderBottom: "5px solid black" }}>
                <div className='row hero_section flex justify-around'>
                    <div className='col-sm-3 patient text-base'>
                        {isDbDataPath ? (

                            <div className='patient_details'>
                                <h1 className='patient_name font-bold text-xl'>{(user?.report?.info?.firstName || "Name")}</h1>
                                <p>Patient Id : {user?.report?.info?.patientId}</p>
                                <p>Age : {user?.report?.info?.age}</p>
                                <p>Sex : {user?.report?.info?.gender}</p>
                            </div>
                        ) : (
                            <div className='patient_details' >
                                <h1 className='patient_name font-bold text-xl'>{(patientData?.firstName || "Name")}</h1>
                                <p>Patient ID : {patientData?.patientId}</p>
                                <p>Age : {patientData?.age}</p>
                                <p>Sex : {patientData?.gender}</p>
                            </div>
                        )}
                    </div>
                    {Namedt.map((item, index) => (
                        <div className='col-sm-5 samples border-r-2 border-l-2' key={index}>
                            <p className='font-bold text-lg'>Sample Collected At :</p>
                            <p>{item.Address}<span>{item.City}</span></p>
                            <h2 className='text-sm pt-1'>Ref. By: <span className='font-bold text-lg'> {patientData?.referringDoctor || "Dr. Manish Kumar"}</span></h2>
                        </div>
                    ))}
                    <div className='col-sm-4 test_dates'>
                        <div className='report'>
                            <div className='report_detail text-sm'>
                                <p><div className='font-bold'>Registered on:</div> {formattedDate}</p>
                                <p><div className='font-bold'>Collected on:</div> {formattedDate}</p>
                                {/* <p><span className='font-bold'>Reported on:</span> 04:35 PM 02 Dec, 22</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;