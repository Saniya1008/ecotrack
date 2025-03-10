// src/components/Profile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// notes
// To retrieve and display the profile data 
//based on the authenticated user, you can use a combination of authentication, state management, and data fetching



export default function Profile() {
  const navigate = useNavigate();

  const operator = {
    name: "Sanjeev Varma",
    occupation: "Coal Mine Operator",
    id: "CM12345",
    coalMineName: "Black Diamond Mine",
    email: "sanjeevvarma@gmail.com"
  };

  // button 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900"> {/* Darker background */}
      <div className="bg-gray-800 shadow-md rounded-lg w-full max-w-md"> {/* Darker card background */}
        
      <button
          onClick={() => navigate('/dashboard')}
          className="absolute top-4 right-4 bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
        >
          Go to Dashboard
        </button>
        
        <div className="flex flex-col items-center p-6">
          <div className="w-24 h-24 mb-4">
            <img
              src="/placeholder.svg?height=96&width=96"
              alt={operator.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-100">{operator.name}</h2> {/* Light text color */}
          <div className="text-sm text-gray-300"> {/* Light text color */}
            <div className="mt-2">
              <span className="font-semibold">Occupation:</span> {operator.occupation}
            </div>
            <div className="mt-1">
              <span className="font-semibold">ID:</span> {operator.id}
            </div>
            <div className="mt-1">
              <span className="font-semibold">Coal Mine:</span> {operator.coalMineName}
            </div>
            <div className="mt-1 break-all">
              <span className="font-semibold">Email:</span> {operator.email}
            </div>

  
          </div>
        </div>
      </div>
    </div>
  );
}
