import React, { Children } from "react";

import { Navigate } from 'react-router-dom';



const ProtedtedRoute = ({ isSignedIn, Children}) => {
    if(!isSignedIn) {
        return <Navigate to="/" replace />;

    }

    return Children;
};



export default ProtedtedRoute;