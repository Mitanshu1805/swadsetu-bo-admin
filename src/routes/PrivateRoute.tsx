import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// helpers
import { APICore } from '../helpers/api/apiCore';

// hooks
import { useUser } from '../hooks';

type PrivateRouteProps = {
    component: React.ComponentType;
    roles?: string | string[];
};

const PrivateRoute = ({ component: RouteComponent, roles, ...rest }: PrivateRouteProps) => {
    const location = useLocation();
    const [loggedInUser] = useUser();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // To track auth status

    const api = new APICore();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authStatus = await api.isUserAuthenticated();
                setIsAuthenticated(authStatus);
            } catch (error) {
                console.error('Error during authentication check', error);
                setIsAuthenticated(false); // If there's an error, assume not authenticated
            }
        };
        checkAuthentication();
    }, []); // Empty dependency array ensures it runs once

    // If authentication status is still being determined, render a loading state
    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    // If not authenticated, redirect to login page
    if (isAuthenticated === false) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // Ensure roles is always an array, even if a single string is passed
    const rolesArray = Array.isArray(roles) ? roles : roles ? [roles] : [];

    // If the user is not authorized for this route based on role, redirect to unauthorized page
    if (rolesArray.length > 0 && loggedInUser?.role && !rolesArray.includes(loggedInUser.role)) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    // If everything is good, render the requested component
    return <RouteComponent {...rest} />;
};

export default PrivateRoute;
