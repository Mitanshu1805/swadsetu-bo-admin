// import { useEffect, useState } from 'react';
// import { Button, Alert, Row, Col } from 'react-bootstrap';
// import { Navigate, Link, useLocation } from 'react-router-dom';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';

// // hooks
// import { useRedux } from '../../hooks/';

// // actions
// import { resetAuth, loginUser } from '../../redux/actions';

// // components
// import { VerticalForm, FormInput } from '../../components/form/';
// import Loader from '../../components/Loader';

// import AuthLayout from './AuthLayout';
// import config from '../../config';

// type LocationState = {
//     from?: Location;
// };

// type UserData = {
//     email: string;
//     password: string;
// };

// const BottomLink = () => {
//     const { t } = useTranslation();

//     return (
//         <Row className="mt-3">
//             <Col xs={12} className="text-center">
//                 <p className="text-muted">
//                     <Link to="/auth/forget-password" className="text-muted ms-1">
//                         <i className="fa fa-lock me-1"></i>
//                         {t('Forgot your password?')}
//                     </Link>
//                 </p>
//                 <p className="text-muted">
//                     {t("Don't have an account?")}{' '}
//                     <Link to={'/auth/register'} className="text-dark ms-1">
//                         <b>{t('Sign Up')}</b>
//                     </Link>
//                 </p>
//             </Col>
//         </Row>
//     );
// };

// const Login = () => {
//     const { t } = useTranslation();
//     const { dispatch, appSelector } = useRedux();

//     const { user, userLoggedIn, loading, error } = appSelector((state) => ({
//         user: state.Auth.user,
//         loading: state.Auth.loading,
//         error: state.Auth.error,
//         userLoggedIn: state.Auth.userLoggedIn,
//     }));

//     const [loginError, setLoginError] = useState<string | null>(null); // Declare the login error state

//     useEffect(() => {
//         dispatch(resetAuth());
//     }, [dispatch]);

//     /*
//     form validation schema
//     */
//     const schemaResolver = yupResolver(
//         yup.object().shape({
//             email: yup.string().required(t('Please enter Email')).email(t('Please enter valid Email')),
//             password: yup.string().required(t('Please enter Password')),
//         })
//     );

//     /*
//     handle form submission
//     */
//     const onSubmit = async (formData: UserData) => {
//         const { email, password } = formData;
//         const data = { email, password };

//         console.log('Login request data:', data);

//         try {
//             // const apiUrl = config.API_URL;
//             const loginEndpoint = `${config.API_URL}/login/`; // Ensure the endpoint is correct
//             console.log('Login Endpoint:', loginEndpoint);

//             const response = await axios.post(loginEndpoint, data, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             console.log('Login success:', response.data);
//             // handle successful login (e.g., store token, redirect user, etc.)
//         } catch (error) {
//             if (axios.isAxiosError(error)) {
//                 // API error (e.g., 400 Bad Request)
//                 console.error('API error response:', error.response);
//                 setLoginError(error.response?.data?.message || 'Login failed');
//             } else {
//                 // Network error
//                 setLoginError('Network error. Please try again later.');
//             }
//         }
//     };

//     const location = useLocation();
//     let redirectUrl = '/';

//     if (location.state) {
//         const { from } = location.state as LocationState;
//         redirectUrl = from ? from.pathname : '/';
//     }

//     return (
//         <>
//             {userLoggedIn && user && <Navigate to={redirectUrl} replace />}

//             <AuthLayout bottomLinks={<BottomLink />}>
//                 <div className="text-center mb-4">
//                     <h4 className="text-uppercase mt-0">{t('Sign In')}</h4>
//                 </div>

//                 {loginError && (
//                     <Alert variant="danger" className="my-2">
//                         {loginError}
//                     </Alert>
//                 )}

//                 {loading && <Loader />}

//                 <VerticalForm<UserData>
//                     onSubmit={onSubmit}
//                     resolver={schemaResolver}
//                     defaultValues={{ email: 'adminto@coderthemes.com', password: 'test' }}>
//                     <FormInput
//                         type="email"
//                         name="email"
//                         label={t('Email address')}
//                         placeholder={t('hello@coderthemes.com')}
//                         containerClass={'mb-3'}
//                     />
//                     <FormInput
//                         label={t('Password')}
//                         type="password"
//                         name="password"
//                         placeholder="Enter your password"
//                         containerClass={'mb-3'}
//                     />

//                     <FormInput
//                         type="checkbox"
//                         name="checkbox"
//                         label={t('Remember me')}
//                         containerClass={'mb-3'}
//                         defaultChecked
//                     />

//                     <div className="text-center d-grid mb-3">
//                         <Button variant="primary" type="submit" disabled={loading}>
//                             {t('Log In')}
//                         </Button>
//                     </div>
//                 </VerticalForm>
//             </AuthLayout>
//         </>
//     );
// };

// export default Login;

import { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Navigate, Link, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

// hooks
import { useRedux } from '../../hooks/';

// actions
import { resetAuth, loginUser } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/form/';
import Loader from '../../components/Loader';

import AuthLayout from './AuthLayout';
// import axios, { AxiosError } from 'axios';

// const apiUrl = process.env.REACT_APP_LOGIN_ENDPOINT;

// axios
//     .post(`${apiUrl}/login`, {
//         email: 'admin@admin.com',
//         password: 'password123',
//     })
//     .then((response) => {
//         console.log('Login successful:', response.data);
//     })
//     .catch((error) => {
//         console.error('Login failed:', error);
//     });

type LocationState = {
    from?: Location;
};

type UserData = {
    email: string;
    password: string;
};

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                <p className="text-muted">
                    <Link to="/auth/forget-password" className="text-muted ms-1">
                        <i className="fa fa-lock me-1"></i>
                        {t('Forgot your password?')}
                    </Link>
                </p>
                <p className="text-muted">
                    {t("Don't have an account?")}{' '}
                    <Link to={'/auth/register'} className="text-dark ms-1">
                        <b>{t('Sign Up')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Login = () => {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();

    const { user, userLoggedIn, loading, error } = appSelector((state) => ({
        user: state.Auth.user,
        loading: state.Auth.loading,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email')).email(t('Please enter valid Email')),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    /*
    handle form submission
    */
    const onSubmit = (formData: UserData) => {
        dispatch(loginUser(formData['email'], formData['password']));
    };

    // const onSubmit = async (formData: UserData) => {
    //     const { email, password } = formData;
    //     const data = { email, password };

    //     // Show loading spinner
    //     dispatch(loginUser(email, password)); // if you are dispatching a Redux action for login

    //     try {
    //         const apiUrl = process.env.REACT_APP_API_URL; // use the API URL from .env
    //         const response = await axios.post(`${apiUrl}/api/v1/superadmin/login/`, data, {
    //             headers: {
    //                 'Content-Type': 'application/json', // specify JSON format
    //             },
    //         });

    //         console.log('Login success:', response.data);
    //         // handle successful login (e.g., redirect or store user data)
    //     } catch (error: unknown) {
    //         // handle error
    //         if (axios.isAxiosError(error)) {
    //             // API error (e.g., 400 Bad Request)
    //             setLoginError(error.response?.data?.message || 'Login failed'
    //         } else {
    //             // Network error
    //             setLoginError('Network error. Please try again later.');
    //         }
    //     }
    // };

    const location = useLocation();
    let redirectUrl = '/';

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/';
    }

    return (
        <>
            {userLoggedIn && user && <Navigate to={redirectUrl} replace />}

            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0">{t('Login')}</h4>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                {loading && <Loader />}

                <VerticalForm<UserData>
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ email: 'adminto@coderthemes.com', password: 'test' }}>
                    <FormInput
                        type="email"
                        name="email"
                        label={t('Email address')}
                        placeholder={t('hello@coderthemes.com')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        containerClass={'mb-3'}></FormInput>

                    <FormInput
                        type="checkbox"
                        name="checkbox"
                        label={t('Remember me')}
                        containerClass={'mb-3'}
                        defaultChecked
                    />

                    <div className="text-center d-grid mb-3">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Login;
