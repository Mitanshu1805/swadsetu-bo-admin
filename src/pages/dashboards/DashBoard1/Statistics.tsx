import React, { useEffect, useState } from 'react';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import {
    dashboardEarningReport,
    dashboardSalesReport,
    ingredientReportList,
    orderReportList,
} from '../../../redux/actions';
import { Col, Row } from 'react-bootstrap';
import { AppColors } from '../../../utils/Colors';
import './Statistics.css'; // <-- Add this for custom CSS

const Statistics = () => {
    const dashboardEarningReports = useSelector(
        (state: any) => state?.Report?.dashboardEarningReport?.data?.data?.data
    );
    const totalEarnings = dashboardEarningReports?.total_amount ? dashboardEarningReports?.total_amount : '0';
    const totalOrders = dashboardEarningReports?.total_orders ? dashboardEarningReports?.total_orders : '0';
    console.log(totalOrders);

    const { dispatch } = useRedux();

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;

        if (business_id) {
            dispatch(dashboardEarningReport(business_id));
            dispatch(dashboardSalesReport(business_id));

            const today = new Date().toISOString().split('T')[0];
            const payload = {
                start_date: today,
                end_date: today,
                business_id: business_id,
            };

            dispatch(orderReportList(payload));
            dispatch(ingredientReportList(payload));
        }
    }, [dispatch]);

    const salesReport = useSelector(
        (state: any) => state?.Report?.dashboardSalesReport?.data?.data?.data?.last_order_details
    );
    const ingredientReport = useSelector((state: any) => state?.Report?.ingredientReport?.data?.data?.data);

    return (
        <div style={{ paddingBottom: '20px' }}>
            <Row className="mb-3">
                <h4>Today's Status</h4>

                <Col xs="auto" style={{ padding: '0', margin: '4px' }}>
                    <div
                        style={{
                            backgroundColor: AppColors.primaryColor,
                            borderRadius: '16px',
                            padding: '16px',
                            color: 'white',
                            minHeight: '100px',
                            minWidth: '160px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            textAlign: 'left',
                        }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{totalEarnings}</div>
                        <div style={{ fontSize: '0.9rem' }}>Total Earnings</div>
                    </div>
                </Col>

                <Col xs="auto" style={{ padding: '0', margin: '4px' }}>
                    <div
                        style={{
                            backgroundColor: AppColors.primaryColor,
                            borderRadius: '16px',
                            padding: '16px',
                            color: 'white',
                            minHeight: '100px',
                            minWidth: '150px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            textAlign: 'left',
                        }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{totalOrders}</div>
                        <div style={{ fontSize: '0.9rem' }}>Total Orders</div>
                    </div>
                </Col>
            </Row>

            {/* Last Orders */}
            <h4 style={{ width: '100%' }}>Last Orders</h4>
            <div className="scroll-container">
                {Array.isArray(salesReport) && salesReport.length > 0 ? (
                    salesReport.map((order: any, index: number) => {
                        const dateObj = new Date(order.order_time);
                        const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const dateStr = dateObj.toLocaleDateString(undefined, {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                        });

                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: AppColors.primaryColor,
                                    borderRadius: '16px',
                                    padding: '16px',
                                    color: 'white',
                                    minHeight: '180px',
                                    minWidth: '220px',
                                    marginRight: '12px',
                                    flex: '0 0 auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>₹{order.amount}</div>
                                    <div style={{ fontSize: '0.9rem' }}>{order.outlet_name}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', marginTop: '8px' }}>{timeStr}</div>
                                    <div style={{ fontSize: '0.9rem' }}>{dateStr}</div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No orders found</p>
                )}
            </div>

            {Array.isArray(ingredientReport) && ingredientReport.length > 0 && (
                <>
                    <h4 style={{ width: '100%' }}>Today's Usage</h4>
                    <div className="scroll-container">
                        {ingredientReport.map((order: any, index: number) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: AppColors.backgroundColor,
                                    border: `1px solid ${AppColors.primaryColor}`,
                                    borderRadius: '16px',
                                    padding: '16px',
                                    color: 'black',
                                    minHeight: '180px',
                                    minWidth: '160px',
                                    marginRight: '12px',
                                    flex: '0 0 auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                <div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{order.total_quantity}</div>
                                    <div style={{ fontSize: '0.9rem' }}>{order.unit}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                        {order.ingredient_name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Statistics;
