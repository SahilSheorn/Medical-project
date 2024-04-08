import React from 'react'
import {doctor_data } from '../data/FootData';
import { useSelector } from "react-redux";


function Foot() {
   const reportData = useSelector((state) => state.reportData);
   console.log("This is reportData=>", reportData);

   return (
      (<>
         <div className='Footer pt-4'>
            <div className='container'>

               <div className='row justify-center items-baseline'>
               {doctor_data.map((item, index) => (
                     <div key={index} className='col-sm-4'>
                        <div className='text-center grid justify-center'>
                           <img src={item.img}  className='stamp w-28'></img>
                           <p className='text-base'><span className='block font-bold'>{item.name}</span>
                              {item.degree}</p>
                        </div>
                     </div>
                  ))}

               </div>

               <hr className='mt-2' />
            </div>
         </div>
      </>)
   );
}

export default Foot