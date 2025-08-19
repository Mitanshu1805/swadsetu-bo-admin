import React, { useEffect, useState } from 'react';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { terminalDelete, terminalList } from '../../../redux/actions';
import { Card, Col, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AppColors } from '../../../utils/Colors';
import TerminalUpdateModal from './TerminalUpdateModal';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import Lottie from 'lottie-react';
import error404 from '../../../assets/lottie/404-notfound.json';

type Props = {
    outletId: string;
};

const TerminalList: React.FC<Props> = ({ outletId }) => {
    const { dispatch } = useRedux();
    const terminal = useSelector((state: any) => state?.Terminal?.data);
    console.log(terminal);

    const terminalError = useSelector((state: any) => state?.Terminal?.error);
    console.log(terminalError);

    const [showTermEditModal, setShowTermEditModal] = useState(false);
    const [selectedTerminalData, setSelectedTerminalData] = useState<any>(null);
    const [terminalToDelete, setTerminalToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (outletId) {
            dispatch(terminalList(outletId));
        }
    }, [dispatch, outletId]);

    const handleTerminalEdit = (terminal_id: string) => {
        const terminalData = terminal.find((item: any) => item.terminal_id === terminal_id);
        setSelectedTerminalData(terminalData);
        setShowTermEditModal(true);
    };

    const handleTerminalDelete = (terminal_id: string) => {
        setTerminalToDelete(terminal_id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (terminalToDelete) {
            dispatch(terminalDelete(terminalToDelete));
            setTimeout(() => {
                if (outletId) dispatch(terminalList(outletId));
            }, 500);
        }
        setShowDeleteModal(false);
    };

    const cardBaseStyle: React.CSSProperties = {
        borderRadius: '12px',
        cursor: 'pointer',
        minHeight: '220px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    };

    const cardHoverStyle: React.CSSProperties = {
        transform: 'translateY(-3px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    };

    return (
        <div style={{ padding: '1rem' }}>
            <Row className="g-4">
                {terminalError ? (
                    <Col
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Lottie animationData={error404} loop={true} style={{ height: 300, width: 300 }} />
                    </Col>
                ) : // <Col style={{ textAlign: 'center' }}>
                //     <Lottie
                //         animationData={error404}
                //         loop={true}
                //         style={{ height: 300, width: 300, margin: '0 auto' }}
                //     />
                //     <div style={{ marginTop: '1rem', color: 'red', fontWeight: 'bold' }}>{terminalError}</div>
                // </Col>
                terminal?.length > 0 ? (
                    terminal.map((item: any) => (
                        <Col key={item.terminal_id} xs={12} sm={6} md={4}>
                            <Card
                                className="shadow-sm h-100"
                                style={cardBaseStyle}
                                onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardHoverStyle)}
                                onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardBaseStyle)}>
                                <Card.Body className="d-flex flex-column justify-content-between p-3">
                                    <div>
                                        <Card.Title
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '1.2rem',
                                                marginBottom: '0.5rem',
                                            }}>
                                            {item.terminal_name}
                                        </Card.Title>
                                        <div style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                                            Device Name: {item.device_name || 'N/A'}
                                        </div>
                                        <div style={{ fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                                            Expires: {item.session_duration || 'no_expiry'}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                            {item.created_at
                                                ? new Date(item.created_at).toLocaleString('en-US', {
                                                      year: 'numeric',
                                                      month: 'long',
                                                      day: 'numeric',
                                                      hour: 'numeric',
                                                      minute: '2-digit',
                                                      hour12: true,
                                                  })
                                                : 'N/A'}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="d-flex gap-2 justify-content-end">
                                        <button
                                            style={{
                                                backgroundColor: AppColors.borderColor,
                                                color: AppColors.iconColor,
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '8px',
                                                cursor: 'pointer',
                                                height: '40px',
                                                width: '40px',
                                            }}
                                            onClick={() => handleTerminalEdit(item.terminal_id)}>
                                            <FaRegEdit />
                                        </button>

                                        <button
                                            style={{
                                                backgroundColor: AppColors.borderColor,
                                                color: AppColors.iconColor,
                                                height: '40px',
                                                width: '40px',
                                                border: 'none',
                                                borderRadius: '6px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleTerminalDelete(item.terminal_id)}>
                                            <FaRegTrashAlt />
                                        </button>
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Delete Modal */}
                            <ConfirmDeleteModal
                                show={showDeleteModal}
                                onClose={() => setShowDeleteModal(false)}
                                onConfirm={confirmDelete}
                                title="Delete this Terminal"
                                message="Are you sure you want to delete this terminal? This action cannot be undone."
                            />
                        </Col>
                    ))
                ) : (
                    <Col style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>Loading terminals...</Col>
                )}
            </Row>

            {showTermEditModal && (
                <TerminalUpdateModal
                    show={showTermEditModal}
                    onHide={() => setShowTermEditModal(false)}
                    terminal={selectedTerminalData}
                    outlet_id={outletId}
                    selectedTerminalData={selectedTerminalData}
                />
            )}
        </div>
    );
};

export default TerminalList;
