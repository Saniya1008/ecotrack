// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Land from './components/Land';
import OperatorProfile from './components/Profile';
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if(token) {
        setIsSignedIn(true);
      }
    },[]);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignUp = () => {
    setIsSignedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route
          path="/dashboard"
          element={isSignedIn ? <Land /> : <SignIn onSignIn={handleSignIn} />}
        />
        <Route path="/profile" element={<OperatorProfile />} /> 
      </Routes>
    </Router>
  );
}

export default App;
