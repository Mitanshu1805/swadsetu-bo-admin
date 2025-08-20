import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { outletList } from '../../../../redux/actions';
import { useRedux } from '../../../../hooks';
import { useSelector } from 'react-redux';
import './style.css';

const StepTwo: React.FC = () => {
    const { dispatch } = useRedux();
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const outletsState = useSelector((state: any) => state.Businesses.outlets);
    const outletListData = outletsState?.OutletsLists ?? [];

    // Watch outlet_id
    // const outlet_id = watch('outlet_id', []);
    const outlet_idRaw = watch('outlet_id', []);
    const outlet_id = Array.isArray(outlet_idRaw) ? outlet_idRaw : [outlet_idRaw];

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        if (business_id) {
            dispatch(outletList(business_id));
        }
    }, [dispatch]);

    // ✅ Handle "Active All"
    const handleActiveAll = () => {
        if (outlet_id.length === outletListData.length) {
            setValue('outlet_id', []); // Uncheck all
        } else {
            setValue(
                'outlet_id',
                outletListData.map((o: any) => o.outlet_id)
            ); // Select all
        }
    };

    return (
        <div className="form-container">
            {/* ✅ Active/Inactive Master */}
            <Form.Group className="mb-4">
                <Form.Label>Active/Inactive Item</Form.Label>
                <div className="radio-group">
                    <label className="radio-box active" style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="radio" value="master" checked readOnly />
                        Master
                    </label>
                </div>
            </Form.Group>

            {/* ✅ Outlet Name List */}
            <Form.Group>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Form.Label>Outlet Name</Form.Label>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={handleActiveAll}
                        style={{ borderRadius: '8px' }}>
                        {outlet_id.length === outletListData.length ? 'Inactive All' : 'Active All'}
                    </button>
                </div>

                <div className="outlet-list">
                    {outletListData.map((outlet: any) => (
                        <label
                            key={outlet.outlet_id}
                            className={`radio-box ${outlet_id.includes(outlet.outlet_id) ? 'active' : ''}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px',
                                marginBottom: '10px',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                            }}>
                            <input
                                type="checkbox"
                                value={outlet.outlet_id}
                                {...register('outlet_id', { required: 'Select at least one outlet' })}
                                style={{ marginRight: '12px' }}
                            />
                            {outlet.outlet_name}
                        </label>
                    ))}
                </div>
                {errors.outlet_id && <small className="text-danger">{errors.outlet_id.message}</small>}
            </Form.Group>
        </div>
    );
};

export default StepTwo;
