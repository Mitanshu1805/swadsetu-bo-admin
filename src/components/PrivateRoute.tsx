import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    [rest: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated by checking the token in localStorage
        const token = localStorage.getItem('auth_token'); // You may have used localStorage or another storage
        if (token) {
            // Optionally, you could validate the token here (e.g., decode JWT and check expiry)
            setIsAuthenticated(true); // User is authenticated
        } else {
            setIsAuthenticated(false); // User is not authenticated
        }
    }, []);

    return (
        <Route
            {...rest} // Spread any other props (like `path`, `exact`, etc.)
            element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
