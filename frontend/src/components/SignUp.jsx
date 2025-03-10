import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
    coalminename: '', 
    verificationMethod: 'email', // Default verification method
  });
  
  const [error, setError] = useState(null); // To handle errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.verifyPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('https://ecotrack-backend.vercel.app/api/auth/signup', { // Update the URL to your backend endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Sign Up Successful", data);
        navigate('/'); // Redirect to Sign In after successful registration
      } else {
        setError(data.message || 'Failed to sign up');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="w-full relative bg-black rounded-lg shadow-lg overflow-hidden">
        <img
          src="https://www.thaisolarenergy.com/wp-content/uploads/2019/09/solar-farm-th.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 p-6 text-center text-white bg-black bg-opacity-50 w-full flex flex-col items-center justify-center h-64">
          <h1 className="text-3xl font-bold mb-4">
            Join the movement to decarbonize Indian coal mines
          </h1>
          <p className="mb-6">
            Get started with a free account. Our tools and data help you
            monitor, report, and reduce your carbon footprint.
          </p>
          <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded">
            Get started
          </button>
        </div>
      </div>

      <div className="w-full max-w-md mt-8 bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Already have an account?
        </h2>
        <p className="text-gray-400 mb-6">Sign in</p>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="p-3 rounded bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 rounded bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 rounded bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="password"
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleChange}
            placeholder="Verify Password"
            className="p-3 rounded bg-gray-800 text-white border border-gray-700"
          />

        
<select
            name="coalMineName"
            value={formData.coalMineName}
            onChange={handleChange}
            className="p-3 rounded bg-gray-800 text-white border border-gray-700"
            required
          >
            <option value="" disabled>Select Coal Mine</option>
            <option value="Jharia Coalfield">Jharia Coalfield</option>
            <option value="Korba Coalfield">Korba Coalfield</option>
            <option value="Raniganj Coalfield">Raniganj Coalfield</option>
            <option value="Talcher Coalfield">Talcher Coalfield</option>
            <option value="Singrauli Coalfield">Singrauli Coalfield</option>
          </select>

          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-400">
              <input
                type="radio"
                name="verificationMethod"
                value="email"
                checked={formData.verificationMethod === 'email'}
                onChange={handleChange}
                className="mr-2"
              />{' '}
              Email
            </label>
            <label className="text-gray-400">
              <input
                type="radio"
                name="verificationMethod"
                value="sms"
                checked={formData.verificationMethod === 'sms'}
                onChange={handleChange}
                className="mr-2"
              />{' '}
              SMS
            </label>
          </div>
          <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 rounded w-full">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}


export default SignUp;
