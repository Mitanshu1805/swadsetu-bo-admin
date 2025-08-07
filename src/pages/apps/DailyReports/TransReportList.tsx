import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Form, Row, Col, Accordion } from 'react-bootstrap';
import { orderReportList } from '../../../redux/actions';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import './TransReportList.css';

const TransReportList = () => {
    const transReport = useSelector((state: any) => state?.Report?.orderReport?.data?.data?.data?.report);
    console.log('transReport>>', transReport);

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
            dispatch(orderReportList(payload));
        }
    }, [dispatch, startDate, endDate, outletId, businessId]);

    return (
        <div className="p-4" style={{ fontFamily: 'sans-serif' }}>
            <Row className="align-items-center mb-4">
                <Col md={5}>
                    <Card>
                        <Card.Body>
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
                        <Card.Body>
                            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Accordion alwaysOpen>
                {transReport?.CASH?.length > 0 && (
                    <Accordion.Item eventKey="0" className="custom-accordion">
                        <Accordion.Header>Cash Payment</Accordion.Header>
                        <Accordion.Body>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transReport.CASH.map((item: any, idx: number) => (
                                        <tr key={idx}>
                                            <td>{item.item_name}</td>
                                            <td>{item.total_quantity}</td>
                                            <td>₹{item.price}</td>
                                            <td>₹{item.total_amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Accordion.Body>
                    </Accordion.Item>
                )}

                {transReport?.ONLINE?.length > 0 && (
                    <Accordion.Item eventKey="1" className="custom-accordion">
                        <Accordion.Header>Online Payment</Accordion.Header>
                        <Accordion.Body>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transReport.ONLINE.map((item: any, idx: number) => (
                                        <tr key={idx}>
                                            <td>{item.item_name}</td>
                                            <td>{item.total_quantity}</td>
                                            <td>₹{item.price}</td>
                                            <td>₹{item.total_amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Accordion.Body>
                    </Accordion.Item>
                )}
            </Accordion>
        </div>
    );
};

export default TransReportList;
