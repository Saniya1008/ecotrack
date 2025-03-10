import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onSignIn }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      onSignIn();
      navigate('/dashboard');
    }
  }, [navigate, onSignIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://ecotrack-backend.vercel.app/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Securely store the token
        localStorage.setItem('authToken', data.token);
        onSignIn();
        navigate('/dashboard');
      } else {
        setError(data.message || 'Failed to sign in');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative">
      <img
        src="https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full opacity-70"
      />
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <h1 className="text-3xl font-bold text-white mb-2">Sign in to EcoTrack</h1>
        <p className="text-gray-300 mb-6">Use your CarbonNeutral Coal credentials to sign in to the app</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}  {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-md transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400">
          <a href="#" className="text-gray-400">Forgot your password?</a>
        </p>
       
        <p className="mt-4 text-sm text-gray-400">
          New to CarbonNeutral Coal? 
          <button onClick={() => navigate('/signup')} className="text-orange-500"> Create an account</button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
