import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Foot() {
   const [activeDoctors, setActiveDoctors] = useState([]);
   const [doctors, setDoctors] = useState([]);
   const reportData = useSelector((state) => state.reportData);
   // console.log('This is reportData=>', reportData);

   const fetchDoctors = async () => {
      try {
         const response = await axios.get('http://localhost:5000/api/auth/doctor');
         const sortedData = response.data.data.sort((a, b) => a.drId.localeCompare(b.drId));
         setDoctors(sortedData); // Set the initial doctors data
      } catch (error) {
         console.error('Error fetching doctors data', error);
      }
   };

   useEffect(() => {
      fetchDoctors();
   }, []);

   useEffect(() => {
      // Filter only active doctors
      const activeDoctorsData = doctors.filter(doctor => doctor.status === 'Active');
      setActiveDoctors(activeDoctorsData);
   }, [doctors]);

   return (
      <>
         <div className="Footer pt-4">
            <div className="container">
               <div className="row justify-center items-baseline">
                  {activeDoctors.map((doctor, index) => (
                     <div key={index} className="col-sm-4">
                        <div className="text-center grid justify-center">
                           <div className='flex justify-center items-center'>
                              <img src={doctor.image} className="stamp w-28" />
                           </div>
                           <div>
                              <p className="text-base">
                                 <span className="block font-bold">{doctor.name}</span>
                                 ({doctor.desigination})
                              </p>
                           </div>

                        </div>
                     </div>
                  ))}
               </div>
               <hr className="mt-2" />
            </div>
         </div>
      </>
   );
}

export default Foot;
