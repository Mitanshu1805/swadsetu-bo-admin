import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { outletList } from '../../../../redux/actions';
import { useRedux } from '../../../../hooks';
import { useSelector } from 'react-redux';
import './style.css';
import { AppColors } from '../../../../utils/Colors';

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
                <div
                    onClick={() => setValue('master', true)} // optional if you want to track in form
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `1px solid ${AppColors.primaryColor}`,
                        boxShadow: `0 2px 8px rgba(0,0,0,0.15)`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        marginTop: '8px',
                        width: 'fit-content',
                    }}>
                    <input
                        type="radio"
                        value="master"
                        checked
                        readOnly
                        style={{
                            width: '16px',
                            height: '16px',
                            marginRight: '12px',
                            accentColor: AppColors.primaryColor,
                            cursor: 'pointer',
                        }}
                    />
                    <span>Master</span>
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
                    {outletListData.map((outlet: any) => {
                        const isActive = outlet_id.includes(outlet.outlet_id);
                        return (
                            <div
                                key={outlet.outlet_id}
                                onClick={() => {
                                    // toggle selection
                                    if (isActive) {
                                        setValue(
                                            'outlet_id',
                                            outlet_id.filter((id: string) => id !== outlet.outlet_id)
                                        );
                                    } else {
                                        setValue('outlet_id', [...outlet_id, outlet.outlet_id]);
                                    }
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    marginBottom: '10px',
                                    borderRadius: '10px',
                                    border: `1px solid ${isActive ? AppColors.primaryColor : '#ddd'}`,
                                    boxShadow: isActive ? `0 2px 8px rgba(0,0,0,0.15)` : '0 1px 4px rgba(0,0,0,0.08)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                }}>
                                <input
                                    type="radio"
                                    value={outlet.outlet_id}
                                    checked={isActive}
                                    readOnly
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        marginRight: '12px',
                                        accentColor: AppColors.primaryColor,
                                        cursor: 'pointer',
                                    }}
                                />
                                <span>{outlet.outlet_name}</span>
                            </div>
                        );
                    })}
                </div>

                {errors.outlet_id && <small className="text-danger">{errors.outlet_id.message}</small>}
            </Form.Group>
        </div>
    );
};

export default StepTwo;
