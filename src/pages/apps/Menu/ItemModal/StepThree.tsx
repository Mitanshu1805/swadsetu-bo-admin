import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

interface Outlet {
    outlet_id: string;
    outlet_name: string;
}

interface StepThreeProps {
    selectedOutlets: Outlet[];
}

const StepThree: React.FC<StepThreeProps> = ({ selectedOutlets }) => {
    const { watch, setValue, register } = useFormContext();

    const masterPrice = watch('price');
    const outlet_prices = watch('outlet_prices') || [];

    // When selectedOutlets change, initialize outlet_prices with 0 price if not set
    useEffect(() => {
        if (selectedOutlets.length > 0) {
            const updated = selectedOutlets.map((outlet) => {
                const existing = outlet_prices.find((p: any) => p.outlet_id === outlet.outlet_id);
                return existing || { outlet_id: outlet.outlet_id, price: undefined };
            });
            setValue('outlet_prices', updated);
        }
    }, [selectedOutlets]);

    const applyMasterPrice = () => {
        const parsed = parseFloat(masterPrice);
        if (!isNaN(parsed)) {
            const updated = selectedOutlets.map((outlet) => ({
                outlet_id: outlet.outlet_id,
                price: parsed,
            }));
            setValue('outlet_prices', updated);
        }
    };

    const handleOutletPriceChange = (e: React.ChangeEvent<any>, outlet_id: string) => {
        const price = parseFloat(e.target.value) || 0;
        const updated = outlet_prices.map((entry: any) =>
            entry.outlet_id === outlet_id ? { ...entry, price } : entry
        );

        // If outlet price not found, add it
        if (!outlet_prices.find((entry: any) => entry.outlet_id === outlet_id)) {
            updated.push({ outlet_id, price });
        }

        setValue('outlet_prices', updated);
    };

    return (
        <Card className="shadow-sm p-3">
            <h2 className="text-center mb-4">Outlet Prices</h2>

            <Row className="mb-3 align-items-end">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Master Price</Form.Label>
                        <Form.Control type="number" {...register('price')} placeholder="Enter Master Price" />
                    </Form.Group>
                </Col>
                <Col md={6} className="d-flex justify-content-start">
                    <Button variant="danger" onClick={applyMasterPrice}>
                        Apply All
                    </Button>
                </Col>
            </Row>

            {selectedOutlets.length > 0 ? (
                <Row>
                    {selectedOutlets.map((outlet) => {
                        const outletPrice = outlet_prices.find(
                            (entry: any) => entry.outlet_id === outlet.outlet_id
                        )?.price;

                        return (
                            <Col md={6} key={outlet.outlet_id} className="mb-3">
                                <Card className="shadow-sm p-3">
                                    <h5>{outlet.outlet_name}</h5>
                                    <Form.Control
                                        type="number"
                                        value={outletPrice || ''}
                                        onChange={(e) => handleOutletPriceChange(e, outlet.outlet_id)}
                                        placeholder="Enter Outlet Price"
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            ) : (
                <p className="text-center text-muted">No outlets selected.</p>
            )}
        </Card>
    );
};

export default StepThree;
