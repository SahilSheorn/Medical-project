import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileIcon from "../assests/profile_icon.png";
import axios from "axios";
import MedicalLogo from "../assests/medical_logo.png";
import Profile_text from "./Img/profile_text.png";
import Swal from 'sweetalert2';

function Navbar({ handleLogout }) {
   const navigate = useNavigate();
   const [userData, setUserData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const handleLogoutClick = () => {
      handleLogout();
      navigate("/");
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (!token) {
        setError("Token not found in localStorage");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response data:", response.data);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Error fetching user details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


   const handleEditUsername = async () => {
      const { value: newUsername } = await Swal.fire({
         title: 'Edit Username',
         input: 'text',
         inputLabel: 'New Username',
         inputPlaceholder: 'Enter new username',
         showCancelButton: true,
         inputValidator: (value) => {
            if (!value) {
               return 'Username cannot be empty';
            }
         }
      });
   
      if (newUsername) {
         console.log("New username : ", newUsername)
         try {
            const token = localStorage.getItem("token");
            if (!token) {
               setError("Token not found in localStorage");
               setLoading(false);
               return;
            }
   
            const response = await axios.put(
               "http://localhost:5000/update",
               { username: newUsername },
   
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
   
            console.log("Username updated successfully:", response.data.message);
   
            setUserData((prevUserData) => ({
               ...prevUserData,
               username: newUsername,
            }
            ));
   
            Swal.fire({
               icon: 'success',
               title: 'Username Updated',
               text: response.data.message + '. Please log in again with your new username.',
               showConfirmButton: true,
               allowOutsideClick: false 
            }).then((result) => {
               if (result.isConfirmed) {
                  handleLogoutClick();
               }
            });
   
         } catch (error) {
            console.error(error);
            setError("Error updating username");
   
            Swal.fire({
               icon: 'error',
               title: 'Error',
               text: 'Error updating username'
            });
         }
      }
   };
   

   return (
      <nav className="bg-gray-800 shadow-lg nav_print">
         <div className="container mx-auto px-4 py-2 flex justify-between items-center">
            <Link to="/" className="flex items-center">
               <img
                  src={MedicalLogo}
                  className="w-16 h-14 mr-2"
                  alt="Medical Logo"
               />
               <span className="text-white text-lg font-bold tracking-wider uppercase">
                  Medical App
               </span>
            </Link>
            <div className="flex items-center">
               <Link
                  to="/dbData"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out mr-4"
               >
                  View Records
               </Link>
               <div className="relative">
                  <button onClick={toggleDropdown} className="focus:outline-none">
                     <img
                        src={ProfileIcon}
                        alt="Profile"
                        className="w-10 h-10 rounded-full shadow-md"
                     />
                  </button>
                  {isDropdownOpen && (
                     <div className="dropdown absolute top-full w-max px-5 py-2 right-0 mt-4 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <div className="p-2">
                           <div className="flex justify-center">
                              <img
                                 src={Profile_text}
                                 alt="profile"
                                 className="h-9 w-32"
                              />
                           </div>
                           <p className="mb-1 d-flex">
                              <strong className="pr-2">Username:</strong>{" "}
                              {userData?.username}
                              <div className="icon d-flex align-items-center">
                                 <svg
                                    style={{ marginLeft: "10px" }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                    onClick={handleEditUsername}
                                 >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                       fillRule="evenodd"
                                       d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                    />
                                 </svg>
                              </div>
                           </p>
                           <p className="mb-1 d-flex">
                              <strong className="pr-2">Email:</strong> {userData?.email}
                              <div className="icon d-flex align-items-center">
                                 <svg
                                    style={{ marginLeft: "10px" }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                 >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                       fillRule="evenodd"
                                       d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                    />
                                 </svg>
                              </div>
                           </p>
                           <hr className="border-t border-gray-500" />
                           <div className="flex justify-center">
                              <button
                                 onClick={handleLogoutClick}
                                 className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out mt-2"
                              >
                                 Log Out
                              </button>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
}

export default Navbar;

