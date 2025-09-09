import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { outletList } from '../../../../redux/actions';
import { useRedux } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { AppColors } from '../../../../utils/Colors';

const StepTwo: React.FC = () => {
    const { dispatch } = useRedux();
    const { register, setValue, watch } = useFormContext();

    const outletsState = useSelector((state: any) => state.Businesses.outlets);
    const outletListData = outletsState?.OutletsLists ?? [];

    const outlet_idsRaw = watch('outlet_ids', []);
    const outlet_ids = Array.isArray(outlet_idsRaw) ? outlet_idsRaw : [outlet_idsRaw];

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        if (business_id) dispatch(outletList(business_id, 'abc'));
    }, [dispatch]);

    const handleActiveAll = () => {
        if (outlet_ids.length === outletListData.length) {
            setValue('outlet_ids', []);
        } else {
            setValue(
                'outlet_ids',
                outletListData.map((o: any) => o.outlet_id)
            );
        }
    };

    return (
        <div className="form-container">
            {/* Active/Inactive Master */}
            <Form.Group className="mb-4">
                <Form.Label>Active/Inactive Item</Form.Label>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: `1px solid ${AppColors.primaryColor}`,
                        boxShadow: `0 2px 8px rgba(0,0,0,0.15)`,
                        cursor: 'pointer',
                        marginTop: '8px',
                        width: 'fit-content',
                        background: 'white',
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

            {/* Outlet Name List */}
            <Form.Group>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Form.Label>Outlet Name</Form.Label>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={handleActiveAll}
                        style={{ borderRadius: '8px' }}>
                        {outlet_ids.length === outletListData.length ? 'Inactive All' : 'Active All'}
                    </button>
                </div>

                <div className="outlet-list" style={{ marginTop: '10px' }}>
                    {outletListData.map((outlet: any) => {
                        const isActive = outlet_ids.includes(outlet.outlet_id);
                        return (
                            <div
                                key={outlet.outlet_id}
                                onClick={() => {
                                    if (isActive) {
                                        setValue(
                                            'outlet_ids',
                                            outlet_ids.filter((id: string) => id !== outlet.outlet_id)
                                        );
                                    } else {
                                        setValue('outlet_ids', [...outlet_ids, outlet.outlet_id]);
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
                                    background: 'white',
                                }}>
                                <input
                                    type="radio" // keeps radio style
                                    value={outlet.outlet_id}
                                    checked={isActive}
                                    readOnly // ensures multiple can be selected
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
            </Form.Group>
        </div>
    );
};

export default StepTwo;
