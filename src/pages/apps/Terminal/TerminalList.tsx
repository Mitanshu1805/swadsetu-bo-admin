import React, { useEffect, useState } from 'react';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { terminalDelete, terminalList } from '../../../redux/actions';
import { useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AppColors } from '../../../utils/Colors';
import TerminalUpdateModal from './TerminalUpdateModal';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

type Props = {
    outletId: string;
};

const TerminalList: React.FC<Props> = ({ outletId }) => {
    const { dispatch } = useRedux();

    const terminal = useSelector((state: any) => state?.Terminal?.data);

    const [showTermEditModal, setShowTermEditModal] = useState(false);
    const [selectedTerminalData, setSelectedTerminalData] = useState<any>(null);
    const [terminalToDelete, setTerminalToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    console.log('outletId', outletId);

    useEffect(() => {
        if (outletId) {
            dispatch(terminalList(outletId));
        }
    }, [dispatch, outletId]);

    const handleTerminalEdit = (terminal_id: string) => {
        const terminalData = terminal.find((item: any) => item.terminal_id == terminal_id);
        console.log(terminalData);

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

    return (
        <div style={{ padding: '1rem' }}>
            <Row>
                {terminal?.length > 0 ? (
                    terminal.map((item: any) => (
                        <Col key={item.terminal_id} md={6}>
                            <Card style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
                                <Card.Body style={{ padding: '0px 12px 8px 12px' }}>
                                    <Card.Title
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '1.25rem',
                                            marginBottom: '0.5rem',
                                        }}>
                                        {item.terminal_name}
                                    </Card.Title>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            flexWrap: 'wrap',
                                        }}>
                                        <div style={{ marginRight: '1rem', minWidth: '200px' }}>
                                            <div>Device Name: {item.device_name || 'N/A'}</div>
                                            <div>Expires: {item.session_duration || 'no_expiry'}</div>
                                            <div>
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

                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                style={{
                                                    backgroundColor: AppColors.borderColor,
                                                    color: AppColors.iconColor,
                                                    border: 'none',
                                                    borderRadius: '4px',
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
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleTerminalDelete(item.terminal_id)}>
                                                <FaRegTrashAlt />
                                            </button>
                                            <ConfirmDeleteModal
                                                show={showDeleteModal}
                                                onClose={() => setShowDeleteModal(false)}
                                                onConfirm={confirmDelete}
                                                title="Delete this Terminal"
                                                message="Are you sure you want to delete this terminal? This action cannot be undone."
                                            />
                                        </div>
                                    </div>
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
