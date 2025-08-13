import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Form, Row, Col, Accordion, Button } from 'react-bootstrap';
import { orderReportList, staffDelete, staffList } from '../../../redux/actions';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { FaPlus, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AppColors } from '../../../utils/Colors';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

type props = {
    outletId?: string;
};
type StaffDelete = {
    business_staff_id: string;
    business_id: string;
};

const Staff: React.FC<props> = ({ outletId }) => {
    const navigate = useNavigate();
    const staffState = useSelector((state: any) => state?.Staff?.staffList);
    console.log('staffList>>>>', staffState);
    const { dispatch } = useRedux();
    const location = useLocation();
    const outlet_name = location.state.outlet_name;
    console.log(outlet_name);
    const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
    const businessId = business.business_id;
    const [staffToDelete, setStaffToDelete] = useState<StaffDelete | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    useEffect(() => {
        const payload = {
            business_id: businessId,
            outlet_id: outletId,
        };
        if (payload.outlet_id === 'master') {
            delete payload.outlet_id;
        }
        dispatch(staffList(payload));
    }, [dispatch]);

    const handleStaffDelete = (business_staff_id: string, businessId: string) => {
        console.log('staff delete btn clicked for staff id:', business_staff_id);
        const payload = {
            business_staff_id: business_staff_id,
            business_id: businessId,
        };
        setStaffToDelete(payload);
        setShowDeleteModal(true);
    };
    const confirmDelete = () => {
        if (staffToDelete) {
            dispatch(staffDelete(staffToDelete));
            setTimeout(() => {
                const payload = {
                    business_id: businessId,
                    outlet_id: outletId,
                };
                if (payload.outlet_id === 'master') {
                    delete payload.outlet_id;
                }
                if (businessId) dispatch(staffList(payload));
            });
        }
        setShowDeleteModal(false);
    };

    const handleAddStaff = () => {
        navigate('/staff-register', {
            state: {
                outlet_name,
                outletId,
            },
        });
    };

    const handleStaffClicked = (staff_id: string, business_staff_id: string) => {
        console.log('businessStaffID:', business_staff_id);
        console.log('staffID:', staff_id);
        navigate('/staff-details', {
            state: {
                staff_id,
                business_staff_id,
                outlet_name,
                outletId,
            },
        });
    };
    return (
        <div style={{ padding: '1rem' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                }}>
                <div>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>Staff List</h4>
                    <h5>{outlet_name}</h5>
                </div>
                <Button
                    style={{
                        backgroundColor: AppColors.primaryColor,
                        border: 'none',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                    onClick={handleAddStaff}>
                    <FaPlus /> Add Staff
                </Button>
            </div>

            <Row>
                {staffState?.length > 0 ? (
                    staffState.map((item: any) => (
                        <Col key={item.staff_id} md={6}>
                            <Card
                                style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}
                                onClick={() => {
                                    if (showDeleteModal) return;
                                    handleStaffClicked(item.staff_id, item.business_staff_id);
                                }}>
                                <Card.Body style={{ padding: '12px' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                        }}>
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                                                {item.staff_name}
                                            </div>
                                            <div style={{ fontSize: '1rem', marginTop: '4px' }}>
                                                {item.role || 'N/A'}
                                            </div>
                                        </div>

                                        <button
                                            style={{
                                                backgroundColor: AppColors.borderColor,
                                                color: AppColors.iconColor,
                                                height: '40px',
                                                width: '40px',
                                                border: 'none',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                marginTop: '8px',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleStaffDelete(item.business_staff_id, businessId);
                                            }}>
                                            <FaRegTrashAlt />
                                        </button>
                                    </div>

                                    <ConfirmDeleteModal
                                        show={showDeleteModal}
                                        onClose={() => setShowDeleteModal(false)}
                                        onConfirm={confirmDelete}
                                        title="Delete this Staff"
                                        message="Are you sure you want to delete this staff? This action cannot be undone."
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No terminals found.</p>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Staff;
