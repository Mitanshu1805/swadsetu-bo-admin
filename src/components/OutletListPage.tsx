import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useRedux } from '../hooks';
import { outletList } from '../redux/actions';
import { FaStore } from 'react-icons/fa'; // Outlet icon

const OutletList = () => {
    const { dispatch } = useRedux();
    const outlets = useSelector((state: any) => state.Businesses.outlets);
    const outletListData = outlets?.OutletsLists ?? [];
    const { module } = useParams();
    const navigate = useNavigate();

    const modulesWithMasterOutlet = ['daily-report', 'menu', 'staff', 'order-history'];
    const shouldShowMasterOutlet = modulesWithMasterOutlet.includes(module || '');

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        if (business.business_id) {
            dispatch(outletList(business.business_id, 'abc'));
        }
    }, [dispatch]);

    const handleOutletClick = (outlet_id: string, outlet_name: string) => {
        navigate(`/${module}/outlets/${outlet_id}`, {
            state: { outlet_name },
        });
    };

    const cardBaseStyle: React.CSSProperties = {
        width: '180px',
        minHeight: '180px',
        borderRadius: '16px',
        border: '2px solid #EEEEEE', // border color
        boxShadow: '0 4px 10px rgba(255, 77, 79, 0.15)', // border shadow with red tint
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        backgroundColor: '#fff',
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
        target.style.boxShadow = '0 4px 10px rgba(255, 77, 79, 0.15)';
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif" }}>
            <Container className="mt-4">
                <Row className="g-4">
                    {shouldShowMasterOutlet && (
                        <Col xs="auto">
                            <Card
                                style={cardBaseStyle}
                                onClick={() => handleOutletClick('master', 'Master')}
                                onMouseEnter={handleCardHover}
                                onMouseLeave={handleCardLeave}>
                                <FaStore style={iconStyle} />
                                <div
                                    style={{
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        marginBottom: '0.5rem',
                                    }}>
                                    Master
                                </div>
                                {/* <div
                                    style={{
                                        fontSize: '0.85rem',
                                        color: '#6c757d',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                    Main business outlet
                                </div> */}
                            </Card>
                        </Col>
                    )}

                    {outletListData.length > 0 ? (
                        outletListData.map((outlet: any) => (
                            <Col key={outlet.outlet_id} xs="auto">
                                <Card
                                    style={cardBaseStyle}
                                    onClick={() => handleOutletClick(outlet.outlet_id, outlet.outlet_name)}
                                    onMouseEnter={handleCardHover}
                                    onMouseLeave={handleCardLeave}>
                                    <FaStore style={iconStyle} />
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            marginBottom: '0.5rem',
                                        }}>
                                        {outlet.outlet_name}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '0.85rem',
                                            color: '#6c757d',
                                            overflow: 'hidden',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                        }}>
                                        {outlet.outlet_address}
                                    </div>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <p className="text-center text-muted">No outlets found</p>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default OutletList;
