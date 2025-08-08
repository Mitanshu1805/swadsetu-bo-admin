import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

type props = {
    outletId: string;
};

const Menu: React.FC<props> = ({ outletId }) => {
    const location = useLocation();
    const outlet_name = location.state.outlet_name;
    console.log(outlet_name);
    console.log('Daily reports called for outletId:', outletId);
    const navigate = useNavigate();
    const cardStyle: React.CSSProperties = {
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        cursor: 'pointer',
        transition: 'background 0.2s',
    };

    const cardBodyStyle: React.CSSProperties = {
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const cardTitleStyle: React.CSSProperties = {
        // fontWeight: 'bold',
        fontSize: '1.25rem',
        marginBottom: '0.25rem',
    };

    const cardContentStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
    };

    const arrowStyle: React.CSSProperties = {
        fontSize: '1.2rem',
        // color: '#888',
        marginLeft: '1rem',
    };

    const handleCategoryClick = (outletId: string) => {
        console.log('category checking needed for outlet_id: ', outletId);
        navigate('/category-list', {
            state: { outletId, outlet_name },
        });
    };
    const handleItemClick = (outletId: string) => {
        console.log('item checking needed for outlet_id: ', outletId);
        navigate('/item-list', {
            state: { outletId },
        });
    };
    return (
        <div style={{ padding: '1rem', fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif" }}>
            <Row>
                <Col md={12}>
                    <Card style={cardStyle}>
                        <Card.Body style={cardBodyStyle} onClick={() => handleCategoryClick(outletId)}>
                            <div style={cardContentStyle}>
                                <div style={cardTitleStyle}>Category</div>
                            </div>
                            <div style={arrowStyle}>{'>'}</div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12}>
                    <Card style={cardStyle}>
                        <Card.Body style={cardBodyStyle} onClick={() => handleItemClick(outletId)}>
                            <div style={cardContentStyle}>
                                <div style={cardTitleStyle}>Item</div>
                            </div>
                            <div style={arrowStyle}>{'>'}</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Menu;
