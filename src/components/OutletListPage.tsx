import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { useNavigate, useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useRedux } from '../hooks';
import { outletList } from '../redux/actions';

const OutletList = () => {
    const { dispatch } = useRedux();
    const outlets = useSelector((state: any) => state.Businesses.outlets);
    const outletListData = outlets?.OutletsLists ?? [];
    const { module } = useParams();
    console.log(module);
    const navigate = useNavigate();

    const modulesWithMasterOutlet = ['daily-report', 'menu', 'staff', 'order-history'];

    const shouldShowMasterOutlet = modulesWithMasterOutlet.includes(module || '');

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        console.log(business_id);

        if (business_id) {
            dispatch(outletList(business_id));
        }
    }, [dispatch]);

    const handleOutletClick = (outlet_id: string, outlet_name: string) => {
        console.log('handleOutlet clicked for outlet_id:', outlet_id);
        navigate(`/${module}/outlets/${outlet_id}`, {
            state: {
                outlet_name: outlet_name,
            },
        });
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif" }}>
            <Container className="mt-3">
                <Row>
                    {shouldShowMasterOutlet && (
                        <Col md={12}>
                            <Card
                                className="shadow-sm"
                                style={{ borderRadius: '15px' }}
                                onClick={() => handleOutletClick('master', 'Master')}>
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <Card.Title className="mb-1" style={{ fontSize: '1.2rem' }}>
                                            Master
                                        </Card.Title>
                                    </div>
                                    <Icon path={mdiChevronRight} size={1} color="#6c757d" />
                                </Card.Body>
                            </Card>
                        </Col>
                    )}

                    {outletListData.length > 0 ? (
                        outletListData.map((outlet: any) => (
                            <Col key={outlet.outlet_id} md={12}>
                                <Card
                                    className="shadow-sm"
                                    style={{ borderRadius: '15spx' }}
                                    onClick={() => handleOutletClick(outlet.outlet_id, outlet.outlet_name)}>
                                    <Card.Body className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Card.Title className="mb-1" style={{ fontSize: '1.2rem' }}>
                                                {outlet.outlet_name}
                                            </Card.Title>
                                            <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                {outlet.outlet_address}
                                            </Card.Text>
                                        </div>
                                        <Icon path={mdiChevronRight} size={1} color="#6c757d" />
                                    </Card.Body>
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
