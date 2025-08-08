import React, { useEffect, useState } from 'react';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { categoryItemList } from '../../../redux/actions';
import { AppColors } from '../../../utils/Colors';
import WhiteColorLogo from '../../../assets/images/pure-white-color-onn79dldw0gujsoa.jpg';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import ToggleSwitch from '../../../components/ToggleSwitch';
import { deleteItem, itemUpdateIsActive } from '../../../redux/item/actions';

const ItemList = () => {
    const itemState = useSelector((state: any) => state?.Menu?.categories || []);
    console.log(itemState);

    const { dispatch } = useRedux();
    const location = useLocation();
    const outletId = location?.state?.outletId;
    const outlet_name = location?.state?.outlet_name;
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [businessId, setBusinessId] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
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

    useEffect(() => {
        if (itemState.length > 0 && !selectedCategoryId) {
            setSelectedCategoryId(itemState[0].category_id);
        }
    }, [itemState, selectedCategoryId]);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        console.log('selectedCategoryId>>>', selectedCategoryId);
    };

    const selectedCategory = itemState.find((cat: any) => cat.category_id === selectedCategoryId);
    const items = selectedCategory?.items || [];

    const handleItemToggle = (item_id: string, is_active: boolean) => {
        dispatch(itemUpdateIsActive(item_id, is_active));

        setTimeout(() => {
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
        }, 100);
    };

    const handleItemDelete = (item_id: string) => {
        setItemToDelete(item_id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            dispatch(deleteItem(itemToDelete));
            setTimeout(() => {
                const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
                const business_id = business.business_id;
                const payload = {
                    business_id,
                    outlet_id: outletId,
                };
                if (payload.outlet_id === 'master') {
                    delete payload.outlet_id;
                }
                dispatch(categoryItemList(payload));
            }, 200);
            setShowDeleteModal(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div
                style={{
                    display: 'flex',
                    gap: '16px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE & Edge
                }}
                className="category-scroll-container">
                {itemState.map((category: any) => (
                    <div
                        key={category.category_id}
                        onClick={() => handleCategoryClick(category.category_id)}
                        style={{
                            // minWidth: '150px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '10px',
                            textAlign: 'center',
                            // backgroundColor: '#fff',
                            backgroundColor:
                                selectedCategoryId === category.category_id ? AppColors.primaryColor : '#fff',
                            color: selectedCategoryId === category.category_id ? '#fff' : '#000',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            flexShrink: 0,
                            height: '150px',
                            width: '110px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}>
                        <img
                            src={category.logo_image || WhiteColorLogo}
                            // alt={WhiteColorLogo}
                            style={{
                                width: '100%',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '50px',
                            }}
                        />
                        <p style={{ marginTop: '8px', fontWeight: 'bold' }}>{category.category_name}</p>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {items.map((item: any) => (
                    <div
                        key={item.item_id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            width: '100%',
                        }}>
                        <img
                            src={item.logo_image || WhiteColorLogo}
                            // alt={item.item_name}
                            style={{
                                width: '80px',
                                height: '80px',
                                objectFit: 'cover',
                                borderRadius: '50px',
                            }}
                        />
                        <div>
                            <h4 style={{ margin: '0 0 8px 0' }}>{item.item_name}</h4>
                            <p style={{ margin: 0, color: '#555' }}>Price: {item.price}</p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                gap: '0.5rem',
                                marginLeft: 'auto',
                                alignItems: 'center',
                            }}>
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
                                onClick={() => handleItemDelete(item.item_id)}>
                                <FaRegTrashAlt />
                            </button>
                            <div onClick={(e) => e.stopPropagation()}>
                                <ToggleSwitch
                                    checked={item.is_active}
                                    onChange={(checked) => handleItemToggle(item.item_id, checked)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <ConfirmDeleteModal
                    show={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDelete}
                    title="Delete this Item"
                    message="Are you sure you want to delete this item? This action cannot be undone."
                />
            </div>
            <style>
                {`
                .category-scroll-container::-webkit-scrollbar {
                    display: none; /* Chrome, Safari */
                }
                `}
            </style>
        </div>
    );
};

export default ItemList;
