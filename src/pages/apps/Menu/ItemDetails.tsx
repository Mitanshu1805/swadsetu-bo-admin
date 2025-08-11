import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRedux } from '../../../hooks';
import { useLocation } from 'react-router-dom';
import { categoryItemList } from '../../../redux/actions';
import WhiteColorLogo from '../../../assets/images/pure-white-color-onn79dldw0gujsoa.jpg';
import { AppColors } from '../../../utils/Colors';
import { recipeList } from '../../../redux/recipe/actions';
import { FaRegTrashAlt } from 'react-icons/fa';
import { RecipeManagementActionTypes } from '../../../redux/recipe/constants';

import { useNavigate } from 'react-router-dom';
// import AddRecipeModal from './RecipeModal';

const ItemDetails = () => {
    const itemState = useSelector((state: any) => state?.Menu?.categories || []);
    const { dispatch } = useRedux();
    const location = useLocation();

    const recipeState = useSelector((state: any) => state?.Recipe?.recipes);
    console.log('recipe??', recipeState);

    const outletId = location?.state?.outletId;
    const itemId = location?.state?.item_id; // passed when navigating here

    const [businessId, setBusinessId] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'general' | 'tax' | 'quantity'>('general');

    // const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        setBusinessId(business_id);

        const payload = {
            business_id,
            outlet_id: outletId,
        };
        if (payload.outlet_id === 'master') {
            delete payload.outlet_id;
        }
        dispatch({ type: RecipeManagementActionTypes.CLEAR_RECIPE });

        dispatch(categoryItemList(payload));
        dispatch(recipeList(business_id, itemId));
    }, [dispatch, outletId, itemId]);

    // Find the selected item in categories
    useEffect(() => {
        if (itemState.length > 0 && itemId) {
            for (const category of itemState) {
                const found = category.items.find((i: any) => i.item_id === itemId);
                if (found) {
                    setSelectedItem(found);
                    break;
                }
            }
        }
    }, [itemState, itemId]);

    if (!selectedItem) {
        return <div>Loading item details...</div>;
    }

    const handleEditRecipe = (recipe_id: string, outletId: string, itemId: string) => {
        console.log('edit recipe clicked for recipeID:', recipe_id, 'outlet_id:', outletId, 'item_id:', itemId);

        navigate('/recipe-modal', {
            state: {
                itemId,
                outletId,
                recipe_id,
            },
        });
    };

    const handleAddRecipe = () => {
        console.log('add recipe clicked for recipeID:', outletId, 'item_id:', itemId);
        navigate('/recipe-modal', {
            state: {
                itemId,
                outletId,
            },
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Images */}
            <div
                style={{
                    display: 'flex',
                    gap: '16px',
                    marginBottom: '20px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
                className="image-scroll-container">
                {[
                    { src: selectedItem.logo_image, label: 'Menu Image' },
                    { src: selectedItem.swiggy_image, label: 'Swiggy Image' },
                    { src: selectedItem.banner_image, label: 'Banner Image' },
                ].map(({ src, label }, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexShrink: 0,
                        }}>
                        <img
                            src={src || WhiteColorLogo}
                            // alt={label}
                            style={{
                                width: '90px',
                                height: '90px',
                                objectFit: 'cover',
                                borderRadius: '50px',
                                border: '1px solid #ddd',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                marginBottom: '6px',
                            }}
                        />
                        <span style={{ fontSize: '14px', color: '#555' }}>{label}</span>
                    </div>
                ))}
            </div>
            {/* Heading */}
            <h2 style={{ marginBottom: '16px' }}>Item Details</h2>
            {/* Tabs for General, Tax, Quantity */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                {[
                    { key: 'general', label: 'General Info' },
                    { key: 'tax', label: 'Tax Info' },
                    { key: 'quantity', label: 'Quantity Info' },
                ].map(({ key, label }) => {
                    const isActive = activeTab === key;
                    return (
                        <div
                            key={key}
                            onClick={() => setActiveTab(key as any)}
                            style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '12px 0',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                backgroundColor: isActive ? AppColors.primaryColor : '#f0f0f0',
                                color: isActive ? '#fff' : '#333',
                                boxShadow: isActive ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
                                fontWeight: isActive ? '600' : '400',
                                userSelect: 'none',
                            }}>
                            {label}
                        </div>
                    );
                })}
            </div>
            {/* Tab content box */}
            <div
                style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '20px',
                    minHeight: '150px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}>
                {activeTab === 'general' && (
                    <div>
                        <p>
                            <strong>Name:</strong> {selectedItem.item_name}
                        </p>
                        <p>
                            <strong>Status:</strong> {selectedItem.is_active ? 'Active' : 'Inactive'}
                        </p>
                        <p>
                            <strong>Price:</strong> {selectedItem.price}
                        </p>
                        <p>
                            <strong>Dietary:</strong>{' '}
                            {Array.isArray(selectedItem.dietary)
                                ? selectedItem.dietary.join(', ')
                                : selectedItem.dietary || 'N/A'}
                        </p>
                        <p>
                            <strong>Loose:</strong> {selectedItem.is_loose ? 'Yes' : 'No'}
                        </p>
                        <p>
                            <strong>Created At:</strong>{' '}
                            {selectedItem.created_at ? new Date(selectedItem.created_at).toLocaleString() : 'N/A'}
                        </p>
                    </div>
                )}

                {activeTab === 'tax' && (
                    <div>
                        <p>
                            <strong>GST Type:</strong> {selectedItem.gst_type}
                        </p>
                    </div>
                )}

                {activeTab === 'quantity' && (
                    <div>
                        <p>
                            <strong>Quantity Params:</strong> {selectedItem.quantity_params}
                        </p>
                        <p>
                            <strong>Quantity Type:</strong> {selectedItem.quantity_type}
                        </p>
                        <p>
                            <strong>Quantity Value:</strong> {selectedItem.quantity_value}
                        </p>
                    </div>
                )}
            </div>
            {/* Available Order Type heading */}
            <h3 style={{ marginTop: '30px', marginBottom: '12px' }}>Available Order Type</h3>
            {/* Order types horizontal scroll container */}
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    overflowX: 'auto',
                    paddingBottom: '10px',
                }}
                className="order-type-scroll">
                {selectedItem.available_order_type && selectedItem.available_order_type.length > 0 ? (
                    selectedItem.available_order_type.map((orderType: string, idx: number) => (
                        <div
                            key={idx}
                            style={{
                                minWidth: '120px',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                backgroundColor: '#fff',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                cursor: 'default',
                                userSelect: 'none',
                                textTransform: 'capitalize',
                                fontWeight: '500',
                                color: '#333',
                            }}>
                            {orderType}
                        </div>
                    ))
                ) : (
                    <p style={{ color: '#666' }}>No available order types.</p>
                )}
            </div>
            {/* Recipe Details heading */}
            {recipeState && Object.keys(recipeState).length > 0 ? (
                <div>
                    <h3 style={{ marginTop: '30px', marginBottom: '12px' }}>Recipe Details</h3>
                    <div
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            maxWidth: '400px',
                            position: 'relative',
                        }}>
                        {/* Action Buttons */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                display: 'flex',
                                gap: '6px',
                            }}>
                            <button
                                onClick={() => handleEditRecipe(recipeState.recipe_id, outletId, itemId)}
                                style={{
                                    backgroundColor: AppColors.primaryColor,
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    cursor: 'pointer',
                                }}>
                                Edit Recipe
                            </button>
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
                                // onClick={() => handleDelete(recipeState.id)}
                            >
                                <FaRegTrashAlt />
                            </button>
                        </div>

                        <p>
                            <strong>Preparation Time:</strong> {recipeState.preparation_time || 'N/A'}
                        </p>
                        <p>
                            <strong>Preparation Type:</strong> {recipeState.preparation_type || 'N/A'}
                        </p>
                        <p>
                            <strong>Instructions:</strong> {recipeState.instructions || 'N/A'}
                        </p>

                        {/* Ingredients Cards */}
                        {recipeState.ingredients?.length > 0 && (
                            <div style={{ marginTop: '16px' }}>
                                <h5>Ingredients:</h5>
                                {recipeState.ingredients.map((ing: any, index: any) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            border: '1px solid #eee',
                                            borderRadius: '6px',
                                            padding: '8px 12px',
                                            marginBottom: '8px',
                                            backgroundColor: '#f9f9f9',
                                        }}>
                                        <span style={{ fontWeight: '500' }}>{ing.ingredient_name}</span>
                                        <span style={{ color: '#555' }}>
                                            {ing.quantity} {ing.unit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => handleAddRecipe()}
                    style={{
                        backgroundColor: AppColors.primaryColor,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 16px',
                        cursor: 'pointer',
                    }}></button>
            )}
            {/* <AddRecipeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddRecipe} /> */}
            Add Recipe
            <style>{`
  .order-type-scroll::-webkit-scrollbar {
    display: none;
  }
`}</style>
        </div>
    );
};

export default ItemDetails;
