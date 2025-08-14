import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRedux } from '../../hooks/';
import { logoutUser, resetAuth } from '../../redux/actions';
import AuthLayout from './AuthLayout';
import SwadSetuLogo from '../../assets/images/logoImage.svg';
import './Logout.css'; // for custom styles
import { AppColors } from '../../utils/Colors';

const LogoutIcon = () => {
    return (
        <svg className="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle
                className="path circle"
                fill="none"
                stroke="#4bd396"
                strokeWidth="6"
                strokeMiterlimit="10"
                cx="65.1"
                cy="65.1"
                r="62.1"
            />
            <polyline
                className="path check"
                fill="none"
                stroke="#4bd396"
                strokeWidth="6"
                strokeLinecap="round"
                strokeMiterlimit="10"
                points="100.2,40.2 51.5,88.8 29.8,67.5 "
            />
        </svg>
    );
};

const BottomLink = () => {
    const { t } = useTranslation();
    return (
        <Row className="mt-4">
            <Col xs={12} className="text-center">
                <p className="text-black">
                    {t('Back to')}{' '}
                    <Link to="/auth/login" style={{ color: AppColors.primaryColor }} className="fw-bold">
                        {t('Sign In')}
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Logout = () => {
    const { t } = useTranslation();
    const { dispatch } = useRedux();

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    useEffect(() => {
        dispatch(logoutUser());
        localStorage.clear();
    }, [dispatch]);

    return (
        <div className="logout-page">
            <div className="logout-card text-center">
                <div className="mb-4">
                    <img src={SwadSetuLogo} alt="Logo" height="60" />
                </div>
                <div className="logout-checkmark mb-3">
                    <LogoutIcon />
                </div>
                <h3 className="text-black mb-2">{t('See you again !')}</h3>
                <p className="text-black">{t('You are now successfully sign out.')}</p>
                <BottomLink />
            </div>
        </div>
    );
};

export default Logout;
