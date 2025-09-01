import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { orderList, OrderList } from '../../../redux/actions';
import { Card, Row, Col } from 'react-bootstrap';
import { AppColors } from '../../../utils/Colors';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import error404 from '../../../assets/lottie/404-notfound.json';

type Props = {
    outletId?: string;
};

const OrderHistory: React.FC<Props> = ({ outletId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orders = useSelector<RootState, any[]>(
        (state) => state?.OrderManagementReducer?.orders?.data?.OrdersDetails || []
    );

    // Initialize state from localStorage if available
    const [selectedDate, setSelectedDate] = useState(() => {
        const savedDate = localStorage.getItem('order_history_date');
        return savedDate || new Date().toISOString().split('T')[0];
    });

    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    useEffect(() => {
        if (!outletId) return;
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;

        const payload: OrderList = {
            date: selectedDate,
            business_id: business_id,
            outlet_id: outletId,
            page: 1,
        };
        if (payload.outlet_id === 'master') delete payload.outlet_id;
        dispatch(orderList(payload));
    }, [selectedDate, outletId, dispatch]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
        localStorage.setItem('order_history_date', e.target.value);
    };

    function hexToRgb(hex: string) {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }

    const cardBaseStyle: React.CSSProperties = {
        borderRadius: '16px',
        cursor: 'pointer',
        boxShadow: `0 8px 20px rgba(${hexToRgb(AppColors.primaryColor)}, 0.15)`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        padding: '16px',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
    };

    const cardHoverStyle: React.CSSProperties = {
        transform: 'translateY(-4px)',
        boxShadow: `0 12px 28px rgba(${hexToRgb(AppColors.primaryColor)}, 0.25)`,
    };

    const getPaymentStyle = (mode: string): React.CSSProperties => {
        if (mode.toLowerCase() === 'cash') {
            return { backgroundColor: '#D1EBA1', color: '#438032' }; // light green / dark green
        } else if (mode.toLowerCase() === 'online') {
            return { backgroundColor: '#EBE765', color: '#E08307' }; // yellow / red
        }
        return { backgroundColor: '#f0f0f0', color: '#333' }; // default
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Order History</h2>
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                style={{
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    marginBottom: '1rem',
                }}
            />

            {orders.length === 0 ? (
                <Col
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh', // centers in the visible area
                    }}>
                    <Lottie animationData={error404} loop={true} style={{ height: 300, width: 300 }} />
                </Col>
            ) : (
                <Row className="g-4">
                    {orders.map((order: any) => (
                        <Col key={order.order_no} md={6} lg={4}>
                            <Card
                                onClick={() => navigate('/order-details', { state: { order } })}
                                style={{
                                    ...cardBaseStyle,
                                    ...(hoveredCard === order.order_no ? cardHoverStyle : {}),
                                }}
                                onMouseEnter={() => setHoveredCard(order.order_no)}
                                onMouseLeave={() => setHoveredCard(null)}>
                                {/* Payment Mode Badge */}
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        ...getPaymentStyle(order.payment_mode),
                                    }}>
                                    {order.payment_mode}
                                </span>

                                <div>
                                    <h3 style={{ marginBottom: '0.5rem' }}>#{order.order_no}</h3>
                                    <p style={{ marginBottom: '0.25rem', fontWeight: '500', color: '#555' }}>
                                        {order.outlet_name}
                                    </p>
                                    <p style={{ marginBottom: '0.25rem', color: '#777', fontSize: '0.9rem' }}>
                                        {new Date(order.order_time)
                                            .toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })
                                            .toUpperCase()}
                                    </p>
                                    <p style={{ marginBottom: '0.25rem', color: '#555' }}>
                                        Total Qty: {Number(order.total_quantity).toFixed(2)}
                                    </p>
                                    <p
                                        style={{
                                            marginTop: '0.5rem',
                                            fontWeight: 'bold',
                                            color: AppColors.primaryColor,
                                        }}>
                                        Total Amount: ₹{order.settle_amount}
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default OrderHistory;
