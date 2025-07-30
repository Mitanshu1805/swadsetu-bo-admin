import jwtDecode from 'jwt-decode';
import axios from 'axios';
import config from '../../config';

// Default Axios Config
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL;

// Response Interceptor
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        let message;

        if (error && error.response) {
            const { status } = error.response;

            switch (status) {
                case 401:
                    message = 'Invalid credentials';
                    break;
                case 403:
                    window.location.href = '/access-denied';
                    message = 'Access Forbidden';
                    break;
                case 404:
                    message = 'Sorry! The data you are looking for could not be found';
                    break;
                default:
                    message = error.response.data?.message || error.message;
            }
        } else {
            message = error.message || 'Something went wrong!';
        }

        return Promise.reject(message);
    }
);

// Constants
const AUTH_SESSION_KEY = 'adminto_user';

// Authorization Helper
const setAuthorization = (token: string | null) => {
    console.log('token: ', token);
    console.log('Setting Authorization header with token:', token);
    if (token) {
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Retrieve User Safely
const getUserFromLocalStorage = () => {
    try {
        const user = localStorage.getItem(AUTH_SESSION_KEY);
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error('Error parsing user from localStorage', error);
        return null;
    }
};
class APICore {
    /**
     * Fetches data from a given URL
     */
    get = (url: string, params?: any) => {
        const queryString = params
            ? Object.keys(params)
                  .map((key) => `${key}=${params[key]}`)
                  .join('&')
            : '';
        return axios.get(queryString ? `${url}?${queryString}` : url);
    };

    getFile = (url: string, params?: any) => {
        const queryString = params
            ? Object.keys(params)
                  .map((key) => `${key}=${params[key]}`)
                  .join('&')
            : '';
        return axios.get(queryString ? `${url}?${queryString}` : url, { responseType: 'blob' });
    };

    create = (url: string, data: any) => axios.post(url, data);
    update = (url: string, data: any) => axios.put(url, data);
    updatePatch = (url: string, data: any) => axios.patch(url, data);
    delete = (url: string, data: any) => axios({ url: url, data: data, method: 'DELETE' });

    createWithFile = (url: string, data: any) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        return axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    };

    /**
     * Checks if user is authenticated
     */
    isUserAuthenticated = () => {
        const user = getUserFromLocalStorage();

        if (!user) {
            console.warn('No user data found in localStorage');
            return false;
        }

        const token = user?.data?.auth_token || user?.data?.detail?.auth_token;

        if (!token) {
            console.error('No token found in user data:', user);
            return false;
        }

        try {
            const decoded: any = jwtDecode(token); // Decode the token
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                console.warn('Token has expired');
                return false;
            }

            setAuthorization(token); // Set the authorization header
            return true;
        } catch (error) {
            console.error('Error decoding token:', error);
            return false;
        }
    };

    /**
     * Set logged-in user
     */
    setLoggedInUser = (session: any) => {
        if (session) {
            localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
            setAuthorization(session.auth_token); // Set authorization token
        } else {
            localStorage.removeItem(AUTH_SESSION_KEY);
            setAuthorization(null);
        }
    };

    /**
     * Get logged-in user
     */
    getLoggedInUser = () => getUserFromLocalStorage();
}

// Automatically set authorization if token exists
const user = getUserFromLocalStorage();
const token = user?.data?.auth_token || user?.data?.detail?.auth_token;
if (token) {
    setAuthorization(token);
} else {
    console.warn('No valid auth_token found in localStorage');
}

export { APICore, setAuthorization, getUserFromLocalStorage };
