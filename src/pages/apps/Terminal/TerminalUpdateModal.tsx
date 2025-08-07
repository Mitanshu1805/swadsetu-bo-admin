import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { terminalList, terminalUpdate } from '../../../redux/actions';
import { useRedux } from '../../../hooks';
import { AppColors } from '../../../utils/Colors';

type Props = {
    show: boolean;
    onHide: () => void;
    terminal: any;
    outlet_id: string;
};

const TerminalUpdateModal: React.FC<Props> = ({ show, onHide, terminal, outlet_id }) => {
    const [validity, setValidity] = useState('no_expiry');
    const { dispatch } = useRedux();

    const handleSubmit = () => {
        const payload = {
            terminal_id: terminal.terminal_id,
            session_duration: validity,
            is_active: terminal.is_active,
        };

        dispatch(terminalUpdate(payload));
        setTimeout(() => {
            dispatch(terminalList(outlet_id));
        });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Terminal</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Label style={{ fontWeight: 'bold', marginTop: '10px' }}>Select Login Validity</Form.Label>

                    {[
                        { label: '1 Day', value: '1d' },
                        { label: '1 Week', value: '1w' },
                        { label: '1 Month', value: '1m' },
                        { label: '1 Year', value: '1y' },
                        { label: 'No Expiry', value: 'no_expiry' },
                    ].map((item) => (
                        <div
                            key={item.value}
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '10px',
                                marginBottom: '10px',
                                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                            }}
                            onClick={() => setValidity(item.value)}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                                <input
                                    type="radio"
                                    name="loginValidity"
                                    value={item.value}
                                    checked={validity === item.value}
                                    onChange={(e) => setValidity(e.target.value)}
                                    style={{
                                        accentColor: AppColors.primaryColor,
                                        width: '16px',
                                        height: '16px',
                                    }}
                                />
                                {item.label}
                            </label>
                        </div>
                    ))}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: AppColors.primaryColor,
                        borderColor: AppColors.primaryColor,
                        boxShadow: 'none',
                        outline: 'none',
                    }}
                    onMouseDown={(e) => e.preventDefault()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TerminalUpdateModal;
