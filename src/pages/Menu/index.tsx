import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

type Props = {
    outletId: string;
};

const Menu: React.FC<Props> = ({ outletId }) => {
    console.log('Menu page called for OutletID:>>', outletId);
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
        fontWeight: 'bold',
        fontSize: '1.25rem',
        marginBottom: '0.25rem',
    };

    const cardContentStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
    };

    const arrowStyle: React.CSSProperties = {
        fontSize: '1.5rem',
        color: '#888',
        marginLeft: '1rem',
    };
    return (
        <div style={{ padding: '1rem' }}>
            <Row>
                <Col md={12}>
                    <Card style={cardStyle}>
                        <Card.Body style={cardBodyStyle}>
                            <div style={cardContentStyle}>
                                <div style={cardTitleStyle}>Category</div>
                            </div>
                            <div style={arrowStyle}>{'>'}</div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={12}>
                    <Card style={cardStyle}>
                        <Card.Body style={cardBodyStyle}>
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
