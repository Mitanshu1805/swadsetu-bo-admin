import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Form, Row, Col, Accordion } from 'react-bootstrap';
import { orderReportList } from '../../../redux/actions';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import './TransReportList.css';
import { AppColors } from '../../../utils/Colors';
import Lottie from 'lottie-react';
import error404 from '../../../assets/lottie/404-notfound.json';

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

    const totalAmount =
        transReport?.CASH?.reduce((sum: number, item: any) => sum + item.total_amount, 0) +
        transReport?.ONLINE?.reduce((sum: number, item: any) => sum + item.total_amount, 0);
    // console.log('totalAmount', Math.round(totalAmount));

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

            <div
                style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    // marginBottom: '20px',
                    color: '#1a1a1a',
                }}>
                Total Amount: ₹{totalAmount ? Math.round(totalAmount).toLocaleString() : 0}
            </div>

            <Row>
                {/* CASH Accordion */}
                {transReport?.CASH?.length > 0 ? (
                    <Col md={6}>
                        <Accordion alwaysOpen>
                            <Accordion.Item eventKey="0" className="custom-accordion">
                                <Accordion.Header>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <div>Cash Payment</div>
                                        <div>
                                            (₹
                                            {Math.round(
                                                transReport.CASH.reduce(
                                                    (sum: number, item: any) => sum + item.total_amount,
                                                    0
                                                )
                                            ).toLocaleString()}
                                            )
                                        </div>
                                    </div>
                                </Accordion.Header>

                                <Accordion.Body>
                                    <table className="table table-bordered ">
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
                                                    <td>
                                                        {item.total_quantity}{' '}
                                                        {item?.quantity_params != 'none'
                                                            ? item.quantity_params
                                                            : item?.quantity_type != 'none'
                                                            ? item.quantity_type
                                                            : ''}
                                                    </td>

                                                    <td>
                                                        {parseInt(item.price)}
                                                        {item.quantity_value !== 'none' && (
                                                            <>
                                                                / {item.quantity_value}{' '}
                                                                {item.quantity_params !== 'none'
                                                                    ? item.quantity_params
                                                                    : 'pcs'}
                                                            </>
                                                        )}
                                                    </td>

                                                    <td>{item.total_amount.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                            <tr className="total-row">
                                                <td style={{ color: 'white' }}>Total</td>
                                                <td style={{ color: 'white' }}>
                                                    {transReport.CASH.reduce(
                                                        (sum: number, item: any) => sum + item.total_quantity,
                                                        0
                                                    )}
                                                </td>
                                                <td style={{ color: 'white' }}></td>
                                                <td style={{ color: 'white' }}>
                                                    {transReport.CASH.reduce(
                                                        (sum: number, item: any) => sum + item.total_amount,
                                                        0
                                                    )}{' '}
                                                    RS
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                ) : (
                    <Col
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Lottie animationData={error404} loop={true} style={{ height: 300, width: 300 }} />
                    </Col>
                )}

                {/* ONLINE Accordion */}
                {transReport?.ONLINE?.length > 0 && (
                    <Col md={6}>
                        <Accordion alwaysOpen>
                            <Accordion.Item eventKey="1" className="custom-accordion">
                                <Accordion.Header>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <div>Online Payment</div>
                                        <div>
                                            (₹
                                            {Math.round(
                                                transReport.ONLINE.reduce(
                                                    (sum: number, item: any) => sum + item.total_amount,
                                                    0
                                                )
                                            ).toLocaleString()}
                                            )
                                        </div>
                                    </div>
                                </Accordion.Header>

                                <Accordion.Body>
                                    <table className="table table-bordered ">
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
                                                    <td>
                                                        {item.total_quantity}{' '}
                                                        {item?.quantity_params != 'none'
                                                            ? item.quantity_params
                                                            : item?.quantity_type != 'none'
                                                            ? item.quantity_type
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        {parseInt(item.price)}
                                                        {item.quantity_value !== 'none' && (
                                                            <>
                                                                / {item.quantity_value}{' '}
                                                                {item.quantity_params !== 'none'
                                                                    ? item.quantity_params
                                                                    : 'pcs'}
                                                            </>
                                                        )}
                                                    </td>
                                                    <td>{item.total_amount.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                            <tr className="total-row">
                                                <td style={{ color: 'white' }}>Total</td>
                                                <td style={{ color: 'white' }}>
                                                    {transReport.ONLINE.reduce(
                                                        (sum: number, item: any) => sum + item.total_quantity,
                                                        0
                                                    )}
                                                </td>
                                                <td style={{ color: 'white' }}></td>
                                                <td style={{ color: 'white' }}>
                                                    {transReport.ONLINE.reduce(
                                                        (sum: number, item: any) => sum + item.total_amount,
                                                        0
                                                    )}{' '}
                                                    RS
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default TransReportList;
