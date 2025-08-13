import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { usersBusinesses } from '../redux/actions';
import { AppColors } from '../utils/Colors';

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
    console.log(businessId);

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Select a Business</h3>
            <div className="row">
                {businesses?.list?.map((business: any) => (
                    <div className="col-md-4 mb-4" key={business.business_id} onClick={() => handleSelect(business)}>
                        <Card
                            style={{
                                cursor: 'pointer',
                                backgroundColor: businessId === business.business_id ? AppColors.primaryColor : 'white',
                            }}>
                            <Card.Body>
                                <Card.Title
                                    style={{
                                        cursor: 'pointer',
                                        color:
                                            selectedBusiness.business_name === business.business_name
                                                ? 'white'
                                                : 'black',
                                    }}>
                                    {business.business_name}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusinessSelector;
