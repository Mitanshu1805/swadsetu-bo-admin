import React, { useEffect, useState } from 'react';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { categoryItemList } from '../../../redux/actions';

const ItemList = () => {
    const itemState = useSelector((state: any) => state?.Menu?.categories || []);
    console.log(itemState);

    const { dispatch } = useRedux();
    const location = useLocation();
    const outletId = location?.state?.outletId;
    const outlet_name = location?.state?.outlet_name;
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [businessId, setBusinessId] = useState<string>('');
    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        setBusinessId(business_id);

        const payload = {
            business_id: business_id,
            outlet_id: outletId,
        };
        if (payload.outlet_id === 'master') {
            delete payload.outlet_id;
        }
        dispatch(categoryItemList(payload));
    }, [dispatch]);
    return <div>ItemList LOADED</div>;
};

export default ItemList;
