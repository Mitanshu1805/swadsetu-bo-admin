import React, { useEffect } from 'react';
import { usePageTitle, useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { outletList } from '../../../redux/actions';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Terminal = () => {
    const { dispatch } = useRedux();
    const outlets = useSelector((state: any) => state.Businesses.outlets);
    const outletListData = outlets?.OutletsLists ?? [];
    const navigate = useNavigate();

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        console.log(business_id);

        if (business_id) {
            dispatch(outletList(business_id, 'abc'));
        }
    }, [dispatch]);

    usePageTitle({
        title: 'Terminal',
        breadCrumbItems: [{ path: '/terminal', label: 'Terminal', active: true }],
    });

    const handleOutletClick = (outlet_id: string) => {
        console.log('outlet clicked for id: ', outlet_id);
        navigate(`/terminal/list`, { state: { outlet_id } });
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif" }}>
            <Container className="mt-3">
                <Row>
                    {' '}
                    {/* Reduced gap between cards */}
                    {outletListData.length > 0 ? (
                        outletListData.map((outlet: any) => (
                            <Col key={outlet.outlet_id} md={12}>
                                <Card
                                    className="shadow-sm"
                                    style={{ borderRadius: '15spx' }}
                                    onClick={() => handleOutletClick(outlet.outlet_id)}>
                                    {' '}
                                    {/* Added curved edges */}
                                    <Card.Body className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Card.Title className="mb-1" style={{ fontSize: '1.2rem' }}>
                                                {outlet.outlet_name}
                                            </Card.Title>
                                            <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
                                                {outlet.outlet_address}
                                            </Card.Text>
                                        </div>

                                        {/* Icon at the end */}
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

export default Terminal;
