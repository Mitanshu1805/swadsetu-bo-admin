import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { staffDelete, staffList } from '../../../redux/actions';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { AppColors } from '../../../utils/Colors';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import Lottie from 'lottie-react';
import error404 from '../../../assets/lottie/404-notfound.json';

type Props = {
    outletId?: string;
};

type StaffDelete = {
    business_staff_id: string;
    business_id: string;
    staff_name?: string;
};

const Staff: React.FC<Props> = ({ outletId }) => {
    const navigate = useNavigate();
    const { dispatch } = useRedux();
    const staffState = useSelector((state: any) => state?.Staff?.staffList) || [];
    const staffListError = useSelector((state: any) => state?.Staff?.error);
    const location = useLocation();
    const outlet_name = location.state?.outlet_name;
    const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
    const businessId = business.business_id;

    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [staffToDelete, setStaffToDelete] = useState<StaffDelete | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const payload = { business_id: businessId, outlet_id: outletId };
        if (payload.outlet_id === 'master') delete payload.outlet_id;
        dispatch(staffList(payload));
    }, [dispatch]);

    const handleAddStaff = () => {
        navigate('/staff-register', { state: { outlet_name, outletId } });
    };

    const handleStaffDelete = (data: StaffDelete) => {
        setStaffToDelete(data);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (staffToDelete) {
            dispatch(staffDelete(staffToDelete.business_id, staffToDelete.business_staff_id));
            setTimeout(() => {
                const payload = { business_id: businessId, outlet_id: outletId };
                if (payload.outlet_id === 'master') delete payload.outlet_id;
                dispatch(staffList(payload));
            }, 500);
        }
        setShowDeleteModal(false);
    };

    const handleStaffClick = (staff_id: string, business_staff_id: string) => {
        if (showDeleteModal) return;
        navigate('/staff-details', {
            state: { staff_id, business_staff_id, outlet_name, outletId },
        });
    };

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
        // boxShadow: `0 8px 20px rgba(${hexToRgb(AppColors.primaryColor)}, 0.25)`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease',
        // border: `1px solid ${AppColors.primaryColor}`,
        padding: '16px',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const cardHoverStyle: React.CSSProperties = {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 20px rgba(${hexToRgb(AppColors.primaryColor)}, 0.25)`,
        // borderColor: AppColors.primaryColor,
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

            {staffListError ? (
                <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <Lottie animationData={error404} loop style={{ height: 300, width: 300 }} />
                </Col>
            ) : (
                <Row className="g-4">
                    {staffState.map((item: any) => (
                        <Col key={item.staff_id} md={6} lg={4}>
                            <Card
                                style={{
                                    ...cardBaseStyle,
                                    ...(hoveredCard === item.business_staff_id ? cardHoverStyle : {}),
                                }}
                                onMouseEnter={() => setHoveredCard(item.business_staff_id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => handleStaffClick(item.staff_id, item.business_staff_id)}>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{item.staff_name}</div>
                                    <div style={{ fontSize: '1rem', marginTop: '4px' }}>{item.role || 'N/A'}</div>
                                </div>

                                <button
                                    style={{
                                        backgroundColor: AppColors.borderColor,
                                        color: AppColors.iconColor,
                                        height: '36px',
                                        width: '36px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        alignSelf: 'flex-end',
                                        marginTop: '12px',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStaffDelete({
                                            business_staff_id: item.business_staff_id,
                                            business_id: businessId,
                                            staff_name: item.staff_name,
                                        });
                                    }}>
                                    <FaRegTrashAlt />
                                </button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {showDeleteModal && (
                <ConfirmDeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    title="Delete this Staff"
                    message={`Are you sure you want to delete ${staffToDelete?.staff_name}? This action cannot be undone.`}
                />
            )}
        </div>
    );
};

export default Staff;
