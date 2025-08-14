import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    outletId: string;
};

const Menu: React.FC<Props> = ({ outletId }) => {
    const location = useLocation();
    const outlet_name = location.state.outlet_name;
    const navigate = useNavigate();

    const cardBaseStyle: React.CSSProperties = {
        borderRadius: '16px',
        cursor: 'pointer',
        height: '200px', // tall card
        width: '160px', // narrow card
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
        margin: 'auto',
    };

    const cardHoverStyle: React.CSSProperties = {
        transform: 'translateY(-4px)',
        boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
    };

    const textContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: '12px',
        left: '12px',
        textAlign: 'left',
        fontSize: '1.1rem',
        fontWeight: 600,
    };

    const handleCategoryClick = () => {
        navigate('/category-list', {
            state: { outletId, outlet_name },
        });
    };

    const handleItemClick = () => {
        navigate('/item-list', {
            state: { outletId },
        });
    };

    return (
        <div style={{ padding: '1rem' }}>
            <Row className="g-4 justify-content-start">
                <Col xs="auto">
                    <Card
                        style={cardBaseStyle}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle)}
                        onClick={handleCategoryClick}>
                        <div style={textContainerStyle}>
                            <div>Category</div>
                        </div>
                    </Card>
                </Col>

                <Col xs="auto">
                    <Card
                        style={cardBaseStyle}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle)}
                        onClick={handleItemClick}>
                        <div style={textContainerStyle}>
                            <div>Item</div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Menu;
