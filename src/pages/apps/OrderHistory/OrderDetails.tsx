import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppColors } from '../../../utils/Colors';

const OrderDetails = () => {
    const location = useLocation();
    const order = location?.state?.order;

    if (!order) return <p>No order details available.</p>;

    const rowStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.75rem',
    };

    const formatOrderTime = (dateString: string) => {
        const date = new Date(dateString);
        const datePart = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
        const timePart = date
            .toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            .toUpperCase();
        return `${datePart} ${timePart}`;
    };

    return (
        <div
            style={{
                display: 'flex',
                padding: '1rem',
                gap: '2rem',
                flexWrap: 'wrap',
                alignItems: 'flex-start', // prevents left card stretching
            }}>
            {/* Left Half: Order Details */}
            <div
                style={{
                    backgroundColor: AppColors.primaryColor,
                    color: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    flex: '0 0 45%', // fixed width
                    minWidth: '300px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                }}>
                <div style={rowStyle}>
                    <span>
                        <strong>Order No:</strong>
                    </span>
                    <span>#{order.order_no}</span>
                </div>

                <div style={rowStyle}>
                    <span>
                        <strong>Outlet:</strong>
                    </span>
                    <span>{order.outlet_name}</span>
                </div>

                <div style={rowStyle}>
                    <span>
                        <strong>Payment Mode:</strong>
                    </span>
                    <span
                        style={{
                            backgroundColor: order.payment_mode.toLowerCase() === 'cash' ? '#d4edda' : '#fff3cd',
                            color: order.payment_mode.toLowerCase() === 'cash' ? '#155724' : '#856404',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            display: 'inline-block',
                        }}>
                        {order.payment_mode}
                    </span>
                </div>

                <div style={rowStyle}>
                    <span>
                        <strong>Final Amount:</strong>
                    </span>
                    <span>{Number(order.settle_amount).toFixed(2)}₹</span>
                </div>

                <div style={rowStyle}>
                    <span>
                        <strong>Order Time:</strong>
                    </span>
                    <span>{formatOrderTime(order.order_time)}</span>
                </div>
            </div>

            {/* Right Half: Items Table */}
            <div
                style={{
                    flex: '1 1 50%',
                    minWidth: '300px',
                    // maxHeight: '400px',
                    // overflowY: 'auto',
                }}>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                    }}>
                    <thead>
                        <tr style={{ backgroundColor: AppColors.primaryColor, color: 'white' }}>
                            <th style={{ padding: '0.75rem', textAlign: 'left' }}>Item Name</th>
                            <th style={{ padding: '0.75rem', textAlign: 'center' }}>Quantity</th>
                            <th style={{ padding: '0.75rem', textAlign: 'right' }}>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item: any, idx: number) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #ccc' }}>
                                <td style={{ padding: '0.5rem' }}>
                                    {item.item_name}
                                    <br />
                                    <span
                                    // style={{ fontWeight: 'bold' }}
                                    >
                                        Price: {Number(item.price).toFixed(0)}
                                        {item.quantity_type !== 'none' && item.quantity_params !== 'none'
                                            ? ` / ${item.quantity_params}`
                                            : item.quantity_type !== 'none'
                                            ? ' / pcs'
                                            : ''}
                                    </span>
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                                    {item.quantity}{' '}
                                    {item.quantity_type !== 'none' && item.quantity_params !== 'none'
                                        ? item.quantity_params
                                        : item.quantity_type !== 'none'
                                        ? 'pcs'
                                        : ''}
                                </td>
                                <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                                    {Number(item.total_price).toFixed(0)}₹
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetails;
