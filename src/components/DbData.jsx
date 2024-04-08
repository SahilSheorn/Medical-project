import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addReportData } from "../redux/formDataSlice";
import Hero from "./Hero";
import PrintComponent from "./PrintComponent";
import Report from "./Report";
import Foot from "./Foot";
import { Link } from "react-router-dom";
import GoBack from './Img/goBack.png'

function DbData() {
   const [userData, setUserData] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);
   const [showMedi, setshowMedi] = useState(false);
   const dispatch = useDispatch();

   const fetchData = async () => {
      try {
         const response = await axios.get("http://localhost:5000/users");
         setUserData(response.data);
         console.log("responseData", response.data);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   useEffect(() => {
      if (selectedUser && showMedi) {
         dispatch(addReportData(selectedUser?.report.testResults));
      }
      fetchData();
   }, [selectedUser, showMedi]);

   const toggleMedi = () => {
      setshowMedi(!showMedi);
   };

   const handleViewReport = (user) => {
      setSelectedUser(user);
      dispatch(addReportData(user?.report.testResults));

      if (!showMedi) {
         toggleMedi();
         console.log("selectedUser:", user);
      }
   };

   return (
      <>
         <div className="container mx-auto px-4 py-8">
            <div className="hide_dbdata">
            <div className="flex items-center mb-8">
               <Link to='/' className="text-blue-500 text-lg">
                <img src={GoBack} alt="Go Back" className="h-12" />
                </Link>
            </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="overflow-auto hide_dbdata">
                  <table className="table-auto w-full">
                     <thead>
                        <tr>
                           <th className="px-4 py-2">Patient Name</th>
                           <th className="px-4 py-2">Age</th>
                           <th className="px-4 py-2">Gender</th>
                           <th className="px-4 py-2"></th>
                        </tr>
                     </thead>
                     <tbody>
                        {userData.map((user) => (
                           <tr key={user._id} className="border-b">
                              <td className="px-4 py-2">{user?.report?.info?.firstName}</td>
                              <td className="px-4 py-2">{user?.report?.info?.age}</td>
                              <td className="px-4 py-2">{user?.report?.info?.gender}</td>
                              <td className="px-4 py-2">
                                 <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => handleViewReport(user)}
                                 >
                                    View Report
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
              

               <div>
                  {showMedi && (
                     <>
                        <PrintComponent user={selectedUser} />
                        <Hero user={selectedUser} />
                        <Report />
                        <Foot />
                     </>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}

export default DbData;
