import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaThLarge, FaBoxOpen, FaListAlt, FaUtensils } from 'react-icons/fa'; // Category & Item icons
import { AppColors } from '../../../utils/Colors';

type Props = {
    outletId: string;
};

const Menu: React.FC<Props> = ({ outletId }) => {
    const location = useLocation();
    const outlet_name = location.state.outlet_name;
    const navigate = useNavigate();

    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
        height: '200px',
        width: '160px',
        // boxShadow: `0 8px 20px rgba(${hexToRgb(AppColors.primaryColor)}, 0.25)`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease',
        // border: `1px solid ${AppColors.primaryColor}`,
        position: 'relative',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: AppColors.primaryColor,
        fontWeight: 600,
        fontSize: '1.1rem',
    };

    const cardHoverStyle: React.CSSProperties = {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 20px rgba(${hexToRgb(AppColors.primaryColor)}, 0.25)`,
        // borderColor: AppColors.primaryColor,
    };

    const handleCategoryClick = () => {
        navigate('/category-list', {
            state: { outletId, outlet_name },
        });
    };

    const handleItemClick = () => {
        navigate('/item-list', {
            state: { outletId, outlet_name },
        });
    };

    return (
        <div style={{ padding: '1rem' }}>
            <Row className="g-4 justify-content-start">
                <Col xs="auto">
                    <Card
                        style={{
                            ...cardBaseStyle,
                            ...(hoveredCard === 'category' ? cardHoverStyle : {}),
                        }}
                        onMouseEnter={() => setHoveredCard('category')}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={handleCategoryClick}>
                        <FaListAlt size={38} style={{ marginBottom: '12px' }} />
                        <div>Category</div>
                    </Card>
                </Col>

                <Col xs="auto">
                    <Card
                        style={{
                            ...cardBaseStyle,
                            ...(hoveredCard === 'item' ? cardHoverStyle : {}),
                        }}
                        onMouseEnter={() => setHoveredCard('item')}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={handleItemClick}>
                        <FaUtensils size={38} style={{ marginBottom: '12px' }} />
                        <div>Item</div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Menu;
