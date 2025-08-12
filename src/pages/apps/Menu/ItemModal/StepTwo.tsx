import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
// import { useRedux } from '../../../hooks';
// import { RootState } from '../../../redux/store';
// import { businessList } from '../../../redux/business/actions';
// import { categoryItemList } from '../../../redux/menuManagementCategory/actions';
import { useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useRedux } from '../../../../hooks';
import { RootState } from '../../../../redux/store';
import { categoryItemList, outletList } from '../../../../redux/actions';
import { useSelector } from 'react-redux';

interface Outlet {
    outlet_id: string;
    outlet_name: string;
}

interface Business {
    business_id: string;
    business_name: string;
    outlets: Outlet[];
}

interface Category {
    category_id: string;
    category_name: string;
    outlets: string[]; // array of outlet IDs
}

interface ItemStep2Props {
    selectedOutlets: Outlet[];
    setSelectedOutlets: React.Dispatch<React.SetStateAction<Outlet[]>>;
}

const StepTwo: React.FC<ItemStep2Props> = ({ selectedOutlets, setSelectedOutlets }) => {
    const { setValue } = useFormContext();
    const { dispatch, appSelector } = useRedux();
    const location = useLocation();

    // const business_id = location.state?.business_id;
    const category_id = location.state?.category_id;
    const outlet_id = location.state?.outletId;
    console.log(category_id);
    console.log(outlet_id);

    const categories = appSelector((state: RootState) => state?.Menu?.categories || []);
    console.log(categories);

    const category = categories.find((cat: any) => cat.category_id === category_id);
    console.log(category);

    const outlets = useSelector((state: any) => state.Businesses.outlets);
    const outletListData = outlets?.OutletsLists ?? [];
    console.log(outletListData);

    // const [selectedOutlets, setSelectedOutlets] = useState<Outlet[]>([]);

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
        if (category && outletListData?.length) {
            const initialSelected = outletListData.filter((o: Outlet) => category.outlets.includes(o.outlet_id));
            setSelectedOutlets(initialSelected);
        }
    }, [category, outletListData]);

    useEffect(() => {
        setValue(
            'outlets',
            selectedOutlets.map((o) => o.outlet_id)
        );
    }, [selectedOutlets, setValue]);

    const isLoading = !outletListData?.length || !category;

    if (isLoading) {
        return <p>Loading outlets...</p>;
    }

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
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={selectAll}>
                        {selectedOutlets.length === filteredOutlets.length ? 'Inactive All' : 'Active All'}
                    </button>
                )}
            </div>

            {filteredOutlets.length > 0 ? (
                <div className="list-group">
                    {filteredOutlets.map((outlet: Outlet) => {
                        const isChecked = selectedOutlets.some((o) => o.outlet_id === outlet.outlet_id);
                        return (
                            <label
                                key={outlet.outlet_id}
                                className="list-group-item d-flex align-items-center"
                                style={{ cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    checked={isChecked}
                                    onChange={() => toggleOutletSelection(outlet)}
                                />
                                {outlet.outlet_name}
                            </label>
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
