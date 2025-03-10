// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSection from './ProfileClick';
const Sidebar = ({ setActiveComponent }) => {
  const navigate = useNavigate();

  const handleSignout = () => {
    // Clear authentication tokens or session data here if needed
    // For example, clear localStorage or cookies
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <aside className="bg-gray-800 w-64 p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-white">Coal Mine Emissions Data</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => setActiveComponent('home')}
              className="text-gray-300 hover:text-white"
            >
              Home
            </button>
          </li>


          <li className="mb-4">
            <button
              onClick={() => setActiveComponent('About')}
              className="text-gray-300 hover:text-white"
            >
              About
            </button>


          </li>


          <li className="mb-4">
            <button
              onClick={() => setActiveComponent('data')}
              className="text-gray-300 hover:text-white"
            >
              Data
            </button>
          </li>


          <li className="mb-4">
            <button
              onClick={() => setActiveComponent('Charts')}
              className="text-gray-300 hover:text-white"
            >
              Charts
            </button>
          </li>


          <li className="mb-4">
            <button
              onClick={() => setActiveComponent('CarbonCredit')}
              className="text-gray-300 hover:text-white"
            >
              Carbon Credit
            </button>
          </li>

          <li className="mb-4">
            <button
              onClick={() => setActiveComponent('PerCapita')}
              className="text-gray-300 hover:text-white"
            >
              Per Capita Emission
            </button>
          </li>



          <li className="mb-4">
            <button
              onClick={() => setActiveComponent('Carbon Neutrality')}
              className="text-gray-300 hover:text-white"
            >
              Carbon Neutrality
            </button>

            
          </li>



          <li className="mt-6">
            <button
              onClick={handleSignout}
              className="text-red-400 hover:text-red-600"
            >
              Sign Out
            </button>
          </li>
        </ul>
        <ProfileSection />

      </nav>
    </aside>
  );
};

export default Sidebar;
