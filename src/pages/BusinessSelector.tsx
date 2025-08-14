import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { usersBusinesses } from '../redux/actions';
import './BusinessSelector.css';

const BusinessSelector = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const businesses = useSelector((state: any) => state.Businesses.businesses);

    useEffect(() => {
        if (!businesses || businesses.count === 0) {
            dispatch(usersBusinesses());
        }
    }, [dispatch, businesses]);

    const handleSelect = (business: any) => {
        localStorage.setItem('selected_business', JSON.stringify(business));
        navigate('/dashboard');
    };

    const selectedBusiness = JSON.parse(localStorage.getItem('selected_business') || '{}');
    const businessId = selectedBusiness.business_id;

    return (
        <div className="business-selector-container">
            <h3 className="title">Select a Business</h3>
            <div className="row justify-content-center">
                {businesses?.list?.map((business: any) => (
                    <div
                        className="col-sm-6 col-md-4 col-lg-3 mb-4"
                        key={business.business_id}
                        onClick={() => handleSelect(business)}>
                        <Card className={`business-card ${businessId === business.business_id ? 'selected' : ''}`}>
                            {business.logo && (
                                <div className="business-logo">
                                    <img src={business.logo} alt={business.business_name} />
                                </div>
                            )}
                            <Card.Body className="text-center">
                                <Card.Title>{business.business_name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessSelector;
