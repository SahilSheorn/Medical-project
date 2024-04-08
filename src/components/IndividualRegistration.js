import React, { useState } from 'react';
import Swal from 'sweetalert2';

function IndividualRegistration({ switchToLoginPage, handleRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsRegistering(true); 
        try {
            await handleRegister(username, password, email);
            Swal.fire({
              title: 'Registration successful!',
              text: 'Please login now.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              switchToLoginPage(); 
            });
        } catch (error) {
            console.error(error.response.data);
            setErrorMessage(error.response.data.error || 'Registration failed. Please try again later.');
        }
        setIsRegistering(false); 
    };

    return (
        <div className="bg-transparent p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Individual Registration</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='border rounded-md px-3 py-2 w-full bg-gray-200'
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border rounded-md px-3 py-2 w-full bg-gray-200'
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border rounded-md px-3 py-2 w-full bg-gray-200'
                    required
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md w-full' disabled={isRegistering}>
                    {isRegistering ? 'Wait a moment...' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-center">Already have an account? <button onClick={switchToLoginPage} className="text-blue-500 font-medium">Login here</button></p>
        </div>
    );
}

export default IndividualRegistration;
