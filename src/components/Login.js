import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function Login({ switchToRegisterPage, handleLogin }) {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         await handleLogin(username, password);
         setErrorMessage('');
      } catch (error) {
         if (error.response && error.response.status === 400 && error.response.data && error.response.data.error === 'Invalid username or password') {
            setErrorMessage('Invalid username or password. Please try again.');
         } else {
            console.error(error);
            setErrorMessage('An error occurred. Please try again later.');
         }
      }
      setIsSubmitting(false);
   };

   const handleForgetPasswordClick = async () => {
      const { value: formValues } = await Swal.fire({
         title: 'Forget Password',
         html:
            '<input id="swal-input1" class="swal2-input" placeholder="Username">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Email">',
         focusConfirm: false,
         preConfirm: () => {
            const username = document.getElementById('swal-input1').value;
            const email = document.getElementById('swal-input2').value;
            return { username, email };
         }
      });

      if (formValues && formValues.username && formValues.email) {
         try {
            const response = await axios.post('http://localhost:5000/forget-password', formValues);
            console.log(response.data);
            Swal.fire('Success', response.data.message, 'success');
         } catch (error) {
            console.error(error);
            Swal.fire('Error', 'An error occurred. Please try again later.', 'error');
         }
      }
   };

   return (
      <div className=''>

         <div className='container-fluid login_bg z'>
            <div className="min-h-screen flex justify-center items-center px-4">
               <div className="bg-transparent px-8 py-6 rounded-lg  max-w-sm w-3/4">
                  <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

                  <form onSubmit={handleSubmit} className="space-y-4 text-center">
                     <div>
                        <input
                           type="text"
                           placeholder="Username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           className=" w-3/4 px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                           required
                        />
                     </div>
                     <div>
                        <input
                           type="password"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className=" w-3/4 px-4 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                           required
                        />
                     </div>

                     {errorMessage && (
                        <div className="text-red-500 text-center mb-4">
                           {errorMessage}
                        </div>
                     )}
                     <button
                        type="submit"
                        className=" w-3/4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        disabled={isSubmitting}
                     >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                     </button>

                     <button
                        onClick={handleForgetPasswordClick}
                        className="text-purple-900 font-semibold focus:outline-none hover:underline hover:animate-bounce ">
                        Forget Password
                     </button>

                  </form>
                  <div className="text-center text-sm mt-4">
                     <p>
                        Don't have an account?{' '}
                        <button onClick={switchToRegisterPage} className="text-purple-700 font-semibold focus:outline-none hover:underline">
                           Register here
                        </button>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>


   );
}

export default Login;
