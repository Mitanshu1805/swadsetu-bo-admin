import React, { useState, useEffect } from 'react';

interface OutletPriceEditFormProps {
    outletId: string;
    outletName: string;
    itemId: string;
    initialPrice: number;
    onCancel: () => void;
    onSave: (outletId: string, itemId: string, newPrice: number) => void;
}

const OutletPriceEditForm: React.FC<OutletPriceEditFormProps> = ({
    outletId,
    outletName,
    itemId,
    initialPrice,
    onCancel,
    onSave,
}) => {
    const [price, setPrice] = useState<number>(initialPrice);

    useEffect(() => {
        setPrice(initialPrice);
    }, [initialPrice]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (price < 0) {
            alert('Price cannot be negative');
            return;
        }
        onSave(outletId, itemId, price);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ padding: '20px', maxWidth: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Edit Price for Outlet</h3>
            <p>
                <strong>Outlet Name:</strong> {outletName}
            </p>

            <label htmlFor="price" style={{ display: 'block', marginBottom: '8px' }}>
                Price:
            </label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                min="0"
                step="0.01"
                style={{
                    padding: '8px',
                    width: '100%',
                    marginBottom: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={onCancel} style={{ padding: '8px 12px', cursor: 'pointer' }}>
                    Cancel
                </button>
                <button
                    type="submit"
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}>
                    Save
                </button>
            </div>
        </form>
    );
};

export default OutletPriceEditForm;
