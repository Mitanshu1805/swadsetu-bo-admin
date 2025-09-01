import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRedux } from '../../../hooks';
import { ingredientReportList } from '../../../redux/actions';
import { Card, Form, Row, Col, Accordion } from 'react-bootstrap';
import { AppColors } from '../../../utils/Colors';
import Lottie from 'lottie-react';
import error404 from '../../../assets/lottie/404-notfound.json';

const IngredientReportList = () => {
    const ingredientReport = useSelector((state: any) => state?.Report?.ingredientReport?.data?.data?.data);
    console.log('ingredient>>>', ingredientReport);
    const ingredientError = useSelector((state: any) => state?.Report?.ingredientReport?.error);
    console.log('ingredientError>>>>', ingredientError);

    const { state } = useLocation();
    const outletId = state?.outletId;

    const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
    const businessId = business.business_id;
    const { dispatch } = useRedux();

    const today = new Date().toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    useEffect(() => {
        let payload: any = {
            start_date: startDate,
            end_date: endDate,
            outlet_id: outletId,
            business_id: businessId,
        };

        // Remove outlet_id if value is "master"
        if (payload.outlet_id === 'master') {
            delete payload.outlet_id;
        }

        if (businessId) {
            dispatch(ingredientReportList(payload));
        }
    }, [dispatch, startDate, endDate, outletId, businessId]);

    return (
        <div className="p-4" style={{ fontFamily: 'sans-serif' }}>
            <Row className="align-items-center mb-4">
                <Col md={5}>
                    <Card>
                        <Card.Body style={{ padding: '0px', height: '15px' }}>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={2} className="text-center fs-3">
                    &gt;
                </Col>

                <Col md={5}>
                    <Card>
                        <Card.Body style={{ padding: '0px', height: '15px' }}>
                            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {ingredientReport && ingredientReport.length > 0 ? (
                <Card>
                    <Card.Body style={{ padding: '0px' }}>
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr style={{ backgroundColor: AppColors.primaryColor }}>
                                    <th style={{ color: 'white' }}>Ingredient Name</th>
                                    <th style={{ color: 'white' }}>Usage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredientReport.map((item: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{item.ingredient_name}</td>
                                        <td>
                                            {item.total_quantity} {}
                                            {item.unit}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            ) : ingredientError ? (
                <Col style={{ textAlign: 'center' }}>
                    <Lottie
                        animationData={error404}
                        loop={true}
                        style={{ height: 300, width: 300, margin: '0 auto' }}
                    />
                    {/* <div style={{ marginTop: '1rem', color: 'red', fontWeight: 'bold' }}>{ingredientError}</div> */}
                </Col>
            ) : (
                <Col style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
                    Loading ingredient report...
                </Col>
            )}
        </div>
    );
};

export default IngredientReportList;
