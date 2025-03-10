import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); 
  };

  return (
    <button
      onClick={handleProfileClick}
      className="flex items-center gap-4 mt-8 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg w-full text-left"
    >
      <img
        className="w-10 h-10 rounded-full"
        src="/docs/images/people/profile-picture-5.jpg"
        alt="Profile"
      />
      <div className="font-medium text-white">
        <div>Sanjeev Varma</div>
      </div>
    </button>
  );
};

export default ProfileSection;
