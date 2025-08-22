import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card } from 'react-bootstrap';
import { useRedux } from '../../../../hooks';
import { RootState } from '../../../../redux/store';
import { categoryItemList, outletList } from '../../../../redux/actions';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppColors } from '../../../../utils/Colors';

interface Outlet {
    outlet_id: string;
    outlet_name: string;
}

interface ItemStep2Props {
    selectedOutlets: Outlet[];
    setSelectedOutlets: React.Dispatch<React.SetStateAction<Outlet[]>>;
}

const StepTwo: React.FC<ItemStep2Props> = ({ selectedOutlets, setSelectedOutlets }) => {
    const { setValue } = useFormContext();
    const { dispatch, appSelector } = useRedux();
    const location = useLocation();

    const category_id = location.state?.category_id;
    const outlet_id = location.state?.outletId;

    const categories = appSelector((state: RootState) => state?.Menu?.categories || []);
    const category = categories.find((cat: any) => cat.category_id === category_id);

    const outlets = useSelector((state: any) => state.Businesses.outlets);
    const outletListData = outlets?.OutletsLists ?? [];

    useEffect(() => {
        if (!outletListData?.length) {
            const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
            const business_id = business.business_id;
            dispatch(outletList(business_id));
        }
        if (!category) {
            const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
            const business_id = business.business_id;
            const payload: any = { business_id };
            if (outlet_id === 'master') delete payload.outlet_id;
            dispatch(categoryItemList(payload));
        }
    }, [dispatch, outlet_id]);

    useEffect(() => {
        setValue(
            'outlets',
            selectedOutlets.map((o) => o.outlet_id)
        );
    }, [selectedOutlets, setValue]);

    const isLoading = !outletListData?.length || !category;

    if (isLoading) return <p>Loading outlets...</p>;

    const filteredOutlets = outletListData.filter((o: Outlet) => category.outlets.includes(o.outlet_id));

    const toggleOutletSelection = (outlet: Outlet) => {
        const isSelected = selectedOutlets.some((o) => o.outlet_id === outlet.outlet_id);
        setSelectedOutlets(
            isSelected ? selectedOutlets.filter((o) => o.outlet_id !== outlet.outlet_id) : [...selectedOutlets, outlet]
        );
    };

    const selectAll = () => {
        if (selectedOutlets.length === filteredOutlets.length) {
            setSelectedOutlets([]);
        } else {
            setSelectedOutlets(filteredOutlets);
        }
    };

    return (
        <Card className="shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="fw-bold fs-5 mb-0">Select Outlets</label>
                {filteredOutlets.length > 0 && (
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={selectAll}>
                        {selectedOutlets.length === filteredOutlets.length ? 'Inactive All' : 'Active All'}
                    </button>
                )}
            </div>

            {filteredOutlets.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {filteredOutlets.map((outlet: Outlet) => {
                        const isChecked = selectedOutlets.some((o) => o.outlet_id === outlet.outlet_id);
                        return (
                            <div
                                key={outlet.outlet_id}
                                onClick={() => toggleOutletSelection(outlet)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: `1px solid ${isChecked ? AppColors.primaryColor : '#ddd'}`,
                                    boxShadow: isChecked ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 4px rgba(0,0,0,0.08)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    minWidth: '160px',
                                }}>
                                <input
                                    type="radio"
                                    checked={isChecked}
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
            ) : (
                <p className="text-muted">No outlets available for this category.</p>
            )}
        </Card>
    );
};

export default StepTwo;
