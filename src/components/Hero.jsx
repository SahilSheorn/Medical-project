import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Hero({ user }) {
    const isDbDataPath = window.location.pathname.includes("/dbData");
    const [activeAddress, setActiveAddress] = useState([]);
    const [address, setAddress] = useState([]);
    const patientData = useSelector(state => state.patientData);
    const parsedDate = new Date();

    const fetchAddress = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/address');
            // Filter only active addresses immediately after fetching
            const activeData = response.data.data.filter(addr => addr.status === 'Active');
            // Sort the active addresses
            const sortedData = activeData.sort((a, b) => a.hno.localeCompare(b.hno));
            setAddress(sortedData);
        } catch (error) {
            console.error('Error fetching address data', error);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

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
                    {address.map((item, index) => (
                        <div className='col-sm-5 samples border-r-2 border-l-2' key={index}>
                            <p className='font-bold text-lg'>Sample Collected At :</p>
                            <p>{item.hno} , <span>{item.area}</span> , <span>{item.landmark}</span> , <span>{item.city}</span> , <span>{item.state}</span></p>
                            <h2 className='text-sm pt-1'>Ref. By: <span className='font-bold text-lg'>{patientData?.referringDoctor || "Self"}</span></h2>
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
