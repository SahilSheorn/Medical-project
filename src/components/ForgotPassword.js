import React, { useState } from 'react';

function ForgotPassword({ switchToLoginPage, handlePasswordReset }) {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
 
    const handleSubmit = async (e) => {
       e.preventDefault();
       setIsSubmitting(true);
       try {
          await handlePasswordReset(email);
          setSuccessMessage('Password reset link sent to your email.');
          setErrorMessage('');
       } catch (error) {
          console.error(error);
          setErrorMessage('An error occurred. Please try again later.');
       }
       setIsSubmitting(false);
    };
 
    return (
       <div className="bg-transparent p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
             <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border rounded-md px-3 py-2 w-full bg-gray-200'
                required
             />
             {errorMessage && <p className="text-red-500">{errorMessage}</p>}
             {successMessage && <p className="text-green-500">{successMessage}</p>}
             <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md w-full' disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
             </button>
          </form>
          <p className="mt-4 text-center">Remembered your password? <button onClick={switchToLoginPage} className="text-blue-500 font-medium">Login here</button></p>
       </div>
    );
 }
 
 export default ForgotPassword;
 