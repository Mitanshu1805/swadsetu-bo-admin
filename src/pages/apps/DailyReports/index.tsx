import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { GiWheat } from 'react-icons/gi';

type Props = {
    outletId: string;
};

const DailyReports: React.FC<Props> = ({ outletId }) => {
    const navigate = useNavigate();

    const cardBaseStyle: React.CSSProperties = {
        borderRadius: '12px',
        cursor: 'pointer',
        minHeight: '120px',
        minWidth: '200px',
        border: '2px solid #EEEEEE',
        boxShadow: '0 2px 8px rgba(255, 77, 79, 0.15)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        textAlign: 'center',
    };

    const iconStyle: React.CSSProperties = {
        fontSize: '2.5rem',
        color: '#ff4d4f',
        marginBottom: '0.75rem',
    };

    const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = 'translateY(-6px)';
        target.style.boxShadow = '0 8px 20px rgba(255, 77, 79, 0.25)';
    };

    const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget as HTMLDivElement;
        target.style.transform = 'translateY(0)';
        target.style.boxShadow = '0 2px 8px rgba(255, 77, 79, 0.15)';
    };

    const handleTransactionClick = () => {
        navigate('/trans-report-list', { state: { outletId } });
    };

    const handleIngredientClick = () => {
        navigate('/ingredient-report-list', { state: { outletId } });
    };

    return (
        <div
            style={{
                padding: '1rem',
                fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
            }}>
            <Row className="g-4">
                <Col xs={12} sm={6} md={3} lg={2}>
                    <Card
                        style={cardBaseStyle}
                        onMouseEnter={handleCardHover}
                        onMouseLeave={handleCardLeave}
                        onClick={handleTransactionClick}>
                        <FaFileInvoiceDollar style={iconStyle} />
                        <Card.Body className="p-0">
                            <Card.Title
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    fontFamily: 'sans-serif',
                                }}>
                                Transaction Report
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} sm={6} md={3} lg={2}>
                    <Card
                        style={cardBaseStyle}
                        onMouseEnter={handleCardHover}
                        onMouseLeave={handleCardLeave}
                        onClick={handleIngredientClick}>
                        <GiWheat style={iconStyle} />
                        <Card.Body className="p-0">
                            <Card.Title
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    fontFamily: 'sans-serif',
                                }}>
                                Ingredient Report
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DailyReports;
