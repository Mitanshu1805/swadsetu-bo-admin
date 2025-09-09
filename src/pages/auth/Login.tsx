import { useEffect, useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Navigate, Link, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

// hooks
import { useRedux } from '../../hooks/';

// actions
import { resetAuth, loginUser, sendOtp, verifyOtp } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/form/';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useSelector } from 'react-redux';
import BusinessSelector from '../BusinessSelector';
import './Login.css';
import SwadSetuLogo from '../../assets/images/logoImage.svg';

type LocationState = {
    from?: Location;
};

type UserData = {
    phone_number: string;
};

type OtpData = { phone_number: string; otp: string };

/* bottom links */
const BottomLink = () => {
    const { t } = useTranslation();

    return <Row className="mt-3"></Row>;
};

const Login = () => {
    const { t } = useTranslation();
    const { dispatch, appSelector } = useRedux();
    const navigate = useNavigate();
    const businesses = useSelector((state: any) => state.Businesses.businesses);

    const { user, userLoggedIn, loading, error, otp } = appSelector((state) => ({
        user: state.Auth.user,
        loading: state.Auth.loading,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
        otp: state.Auth.user?.data.otp,
    }));

    const [phoneNumber, setPhoneNumber] = useState('');
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [showBusinessSelector, setShowBusinessSelector] = useState(false);
    const [verified, setVerified] = useState(false);

    const location = useLocation();
    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email')).email(t('Please enter valid Email')),
            password: yup.string().required(t('Please enter Password')),
        })
    );

    const phoneSchema = yupResolver(
        yup.object().shape({
            phone_number: yup.string().required(t('Please enter phone number')),
        })
    );

    const otpSchema = yupResolver(
        yup.object().shape({
            otp: yup.string().required(t('Please enter OTP')),
        })
    );

    const handleSendOtp = (data: UserData) => {
        setPhoneNumber(data.phone_number);
        dispatch(sendOtp(data.phone_number));
        setShowOtpForm(true);
    };

    const handleVerifyOtp = (data: OtpData) => {
        dispatch(verifyOtp(data.phone_number, data.otp));
        setVerified(true);
    };

    useEffect(() => {
        if (verified && businesses && businesses.count > 1) {
            setShowBusinessSelector(true);
        }
    }, [verified, businesses]);

    if (showBusinessSelector) {
        navigate('/auth/business-selector');
    }

    // const location = useLocation();
    let redirectUrl = '/';

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/';
    }

    return (
        <>
            {userLoggedIn && user && <Navigate to={redirectUrl} replace />}

            <div className="login-wrapper">
                <div className="login-card">
                    <Link to="/" className="logo logo-light text-center">
                        <span className="logo-lg">
                            <img src={SwadSetuLogo} alt="" height="50" />
                        </span>
                    </Link>
                    <div className="text-center mb-4">
                        <h4 className="text-uppercase mt-0">{t('Login')}</h4>
                        <p className="text-muted">
                            {showOtpForm && !error ? t('Enter OTP to continue') : t('Sign in with your phone number')}
                        </p>
                    </div>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {loading && <Loader />}

                    {showOtpForm && !error ? (
                        <VerticalForm<OtpData>
                            onSubmit={handleVerifyOtp}
                            resolver={otpSchema}
                            defaultValues={{ phone_number: phoneNumber }}>
                            <FormInput
                                name="otp"
                                label={t('OTP')}
                                placeholder={t('6-digit code')}
                                containerClass="mb-3"
                            />
                            {otp && (
                                <div className="text-center mt-2">
                                    <span className="otp-display">OTP: {otp}</span>
                                </div>
                            )}
                            <div className="d-grid">
                                <Button className="custom-btn" type="submit" disabled={loading}>
                                    {t('Verify OTP')}
                                </Button>
                            </div>
                        </VerticalForm>
                    ) : (
                        <VerticalForm<UserData> onSubmit={handleSendOtp} resolver={phoneSchema}>
                            <FormInput
                                name="phone_number"
                                label={t('Mobile Number')}
                                placeholder={t('Enter your phone number')}
                                containerClass="mb-3"
                            />
                            <div className="d-grid">
                                <Button className="custom-btn" type="submit" disabled={loading}>
                                    {t('Get OTP')}
                                </Button>
                            </div>
                        </VerticalForm>
                    )}
                </div>
            </div>
        </>
    );
};

export default Login;
