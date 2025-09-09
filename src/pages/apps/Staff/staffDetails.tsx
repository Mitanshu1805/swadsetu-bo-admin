import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRedux } from '../../../hooks';
import { staffDetails, staffAttendanceUpdate } from '../../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

const StaffDetails = () => {
    const staff = useSelector((state: any) => state?.Staff?.staffDetails);
    const staffAttendance = staff?.attendance_records || [];
    const allocatedOutlets = staff?.allocated_outlets;
    const { dispatch } = useRedux();
    const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
    const businessId = business.business_id;
    const location = useLocation();
    const outletName = location?.state?.outlet_name;
    const outletId = location?.state?.outletId;
    const staff_id = location?.state?.staff_id;
    const business_staff_id = location?.state?.business_staff_id;
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<'attendance' | 'outlets'>('attendance');

    useEffect(() => {
        if (staff_id && businessId) {
            const payload = {
                staff_id,
                business_id: businessId,
            };
            dispatch(staffDetails(payload));
        }
    }, [dispatch, staff_id, businessId]);

    if (!staff) return <div>Loading...</div>;

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

    const selectedStyle = {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
    };

    const normalStyle = {
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid gray',
    };

    const handleAttendanceUpdate = (date: string, status: 'present' | 'absent') => {
        const record = staffAttendance.find((r: any) => r.date === date);
        if (!record) return;

        if (record.status === status) return;

        const payload = {
            business_staff_id,
            date,
            status,
        };

        console.log('payload>>', payload);

        dispatch(staffAttendanceUpdate(payload));

        setTimeout(() => {
            const payload = {
                staff_id,
                business_id: businessId,
            };
            dispatch(staffDetails(payload));
        });
    };

    return (
        <div>
            {/* ✅ Staff Info */}
            <Card className="p-4 mb-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Staff Personal Details</h4>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                            navigate('/staff-register', {
                                state: {
                                    staff_id,
                                    editMode: true,
                                    outletId,
                                    outletName,
                                },
                            })
                        }>
                        Edit Details
                    </Button>
                </div>
                <Row className="mb-2">
                    <Col md={6}>
                        <strong>Name:</strong> {staff.staff_name}
                    </Col>
                    <Col md={6}>
                        <strong>Role:</strong> {staff.role}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md={6}>
                        <strong>Salary:</strong> ₹{staff.salary}
                    </Col>
                    <Col md={6}>
                        <strong>Status:</strong> {/* <Badge bg={staff.is_active ? 'success' : 'secondary'}> */}
                        {staff.status}
                        {/* </Badge> */}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md={6}>
                        <strong>Default Attendance:</strong> {staff.default_attendance_setting}
                    </Col>
                    <Col md={6}>
                        <strong>Date of Joining:</strong> {formatDate(staff.date_of_joining)}
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md={6}>
                        <strong>Phone:</strong> {staff.phone}
                    </Col>
                    <Col md={6}>
                        <strong>Email:</strong> {staff.email}
                    </Col>
                </Row>
            </Card>

            {/* ✅ Toggle Buttons */}
            <Card className="p-4 mb-3">
                <div className="d-flex gap-3 mb-3">
                    <Button
                        size="sm"
                        style={activeTab === 'attendance' ? selectedStyle : normalStyle}
                        onClick={() => setActiveTab('attendance')}>
                        Attendance Records
                    </Button>
                    <Button
                        size="sm"
                        style={activeTab === 'outlets' ? selectedStyle : normalStyle}
                        onClick={() => setActiveTab('outlets')}>
                        Allocated Outlets
                    </Button>
                </div>

                {/* ✅ Conditional Content */}
                {activeTab === 'attendance' ? (
                    <div
                        style={{
                            maxHeight: '400px',
                            overflowY: 'scroll',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                        className="hide-scroll">
                        {staffAttendance.map((record: any, index: number) => (
                            <Row
                                key={index}
                                className="py-2 border-bottom align-items-center"
                                style={{ fontSize: '14px' }}>
                                <Col md={6}>{formatDate(record.date)}</Col>
                                <Col md={6} className="d-flex justify-content-end" style={{ gap: '10px' }}>
                                    <Button
                                        size="sm"
                                        style={record.status === 'present' ? selectedStyle : normalStyle}
                                        onClick={() => handleAttendanceUpdate(record.date, 'present')}>
                                        P
                                    </Button>
                                    <Button
                                        size="sm"
                                        style={record.status === 'absent' ? selectedStyle : normalStyle}
                                        onClick={() => handleAttendanceUpdate(record.date, 'absent')}>
                                        A
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </div>
                ) : (
                    <div
                        style={{
                            maxHeight: '400px',
                            overflowY: 'scroll',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                        className="hide-scroll">
                        {allocatedOutlets && allocatedOutlets.length > 0 ? (
                            allocatedOutlets.map((outlet: any, index: number) => (
                                <Row key={index} className="py-2 border-bottom" style={{ fontSize: '14px' }}>
                                    <Col>{outlet.outlet_name}</Col>
                                </Row>
                            ))
                        ) : (
                            <p>No allocated outlets found.</p>
                        )}
                        {allocatedOutlets && allocatedOutlets.length > 0 && (
                            <div className="d-flex justify-content-end mt-3">
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() =>
                                        navigate('/staff-register', {
                                            state: {
                                                staff_id,
                                                editMode: true,
                                                startStep: 2,
                                                outletName,
                                                outletId,
                                            },
                                        })
                                    }>
                                    Edit Allocated Outlets
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Card>

            {/* ✅ Hide scrollbars via CSS */}
            <style>
                {`
                    .hide-scroll::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
};

export default StaffDetails;
