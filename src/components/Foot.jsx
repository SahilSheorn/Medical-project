import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/const';

function Foot() {
   const [activeDoctors, setActiveDoctors] = useState([]);
   const [doctors, setDoctors] = useState([]);

   const fetchDoctors = async () => {
      try {
         const response = await axios.get(`${baseUrl}/api/auth/doctor`);
         const sortedData = response.data.data.sort((a, b) => a.drId.localeCompare(b.drId));
         setDoctors(sortedData);
      } catch (error) {
         console.error('Error fetching doctors data', error);
      }
   };

   useEffect(() => {
      fetchDoctors();
   }, []);

   useEffect(() => {
      const filteredDoctors = doctors.filter(doctor => ['1', '2', '3'].includes(doctor.status));
      const sortedFilteredDoctors = filteredDoctors.sort((a, b) => a.status.localeCompare(b.status));
      setActiveDoctors(sortedFilteredDoctors);
   }, [doctors]);

   return (
      <div className="Footer pt-4">
         <div className="container">
            <div className="row justify-center items-baseline">
               {activeDoctors.map((doctor, index) => (
                  <div key={index} className="col-sm-4">
                     <div className="text-center grid justify-center">
                        <div className='flex justify-center items-center'>
                           <img src={doctor.image} alt={doctor.name} className="stamp w-28" />
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
   );
}
export default Foot;
