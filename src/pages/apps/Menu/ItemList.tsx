import React, { useEffect, useState } from 'react';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { categoryItemList, outletList } from '../../../redux/actions';
import { AppColors } from '../../../utils/Colors';
import WhiteColorLogo from '../../../assets/images/pure-white-color-onn79dldw0gujsoa.jpg';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import ToggleSwitch from '../../../components/ToggleSwitch';
import { deleteItem, itemUpdateIsActive, updateOutletPrice } from '../../../redux/item/actions';
import Lottie from 'lottie-react';
import error404 from '../../../assets/lottie/404-notfound.json';
import { Col, Row } from 'react-bootstrap';

type ItemData = {
    item_id: string;
    item_name: string;
};

const ItemList = () => {
    const itemState = useSelector((state: any) => state?.Menu?.categories || []);

    const { dispatch } = useRedux();
    const location = useLocation();
    const navigate = useNavigate();
    const outletId = location?.state?.outletId;
    const outlet_name = location?.state?.outlet_name;

    const [itemToDelete, setItemToDelete] = useState<ItemData | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [businessId, setBusinessId] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const outlets = useSelector((state: any) => state.Businesses.outlets);
    const outletListData = outlets?.OutletsLists ?? [];
    const [priceEditData, setPriceEditData] = useState<{
        outlet_id: string;
        outletName: string;
        item_id: string;
        price: number | '';
    } | null>(null);
    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        setBusinessId(business_id);
        dispatch(outletList(business_id, 'abc'));

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

    const handleItemDelete = (data: ItemData) => {
        setItemToDelete(data);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            dispatch(deleteItem(itemToDelete.item_id));
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

    const handleItemCardClicked = (item_id: string) => {
        navigate('/item-details', {
            state: {
                item_id,
                outletId,
            },
        });
    };

    const handleEditItem = (item_id: string, category_id: string) => {
        navigate('/item-modal', {
            state: {
                item_id,
                category_id,
                editMode: true,
            },
        });
    };

    const handleEditItemNonMaster = (outletId: string, item_id: string) => {
        const outlet = outletListData.find((o: any) => o.outlet_id == outletId);
        if (!outlet) return;

        const categoryWithItem = itemState.find((cat: any) => cat.items.some((item: any) => item.item_id === item_id));
        const foundItem = categoryWithItem?.items.find((item: any) => item.item_id === item_id);
        if (!foundItem) return;

        setPriceEditData({
            outlet_id: outletId,
            outletName: outlet.outlet_name,
            item_id: item_id,
            price: foundItem.price,
        });
    };

    // Handle form input change
    const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!priceEditData) return;

        // Allow only numbers or empty
        if (/^\d*$/.test(val)) {
            setPriceEditData({ ...priceEditData, price: val === '' ? '' : Number(val) });
        }
    };

    // Handle form submit (for now just console.log and close form)
    const onPriceFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!priceEditData) return;

        dispatch(updateOutletPrice(priceEditData.outlet_id, priceEditData.item_id, priceEditData.price));

        // Close form after save
        setPriceEditData(null);

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
        });
    };

    // Handle cancel
    const onPriceFormCancel = () => {
        setPriceEditData(null);
    };

    return (
        <div
            style={{
                padding: '0rem 1rem',
                fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
                paddingTop: '0px',
            }}>
            <div
                className="category-heading"
                style={{
                    // position: 'sticky',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    top: 0,
                    zIndex: 1000000, // make sure it stays on top
                    backgroundColor: AppColors.backgroundColor, // so it doesn't look transparent
                    paddingBottom: '16px',
                    paddingTop: '8px', // optional padding
                    // borderBottom: '1px solid #ddd', // optional border
                }}>
                <div>
                    <h3 style={{ margin: 0 }}>Item List</h3>
                    <h5 style={{ margin: 0 }}>{outlet_name}</h5>
                </div>

                {/* {outletId === 'master' && (
                    <Button
                        variant="danger"
                        onClick={() => {
                            handleRegisterCategory(businessId, outletId);
                        }}>
                        + Add Category
                    </Button>
                )} */}
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: '16px',
                    overflowX: 'auto',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE & Edge
                }}
                className="category-scroll-container">
                {itemState.length === 0 ? (
                    <Col
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '70vh', // centers in the visible area
                        }}>
                        <Lottie animationData={error404} loop={true} style={{ height: 300, width: 300 }} />
                    </Col>
                ) : (
                    <Row style={{ gap: '10px' }}>
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
                                        objectFit: 'contain',
                                        borderRadius: '50px',
                                    }}
                                />

                                <p style={{ marginTop: '8px', fontWeight: 'bold' }}>{category.category_name}</p>
                            </div>
                        ))}
                    </Row>
                )}
            </div>

            <div
            // style={{
            //     display: 'flex',
            //     justifyContent: 'space-between',
            //     alignItems: 'center',
            //     marginBottom: '16px',
            // }}
            >
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    {outletId === 'master' && (
                        <button
                            style={{
                                padding: '6px 12px',
                                backgroundColor: AppColors.primaryColor,
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                            onClick={() =>
                                navigate('/item-modal', {
                                    state: {
                                        businessId,
                                        outletId,
                                        category_id: selectedCategoryId,
                                    },
                                })
                            }>
                            + Add Item
                        </button>
                    )}
                </div>
                {items.length != 0 ? (
                    <div
                        style={{
                            marginTop: '20px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2,1fr)',
                            gap: '16px',
                        }}>
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
                                    // width: '50%',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleItemCardClicked(item.item_id)}>
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
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                                        {outletId == 'master' ? (
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    selectedCategoryId &&
                                                        handleEditItem(item.item_id, selectedCategoryId);
                                                }}>
                                                <FaRegEdit />
                                            </button>
                                        ) : (
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    selectedCategoryId &&
                                                        handleEditItemNonMaster(outletId, item.item_id);
                                                }}>
                                                <FaRegEdit />
                                            </button>
                                        )}
                                        {priceEditData && (
                                            <div
                                                style={{
                                                    position: 'fixed',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    backgroundColor: '#fff',
                                                    padding: 24,
                                                    borderRadius: 8,
                                                    boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                                                    zIndex: 9999,
                                                    width: 320,
                                                }}
                                                onClick={(e) => e.stopPropagation()}>
                                                <h3>Edit Outlet Price</h3>
                                                <form onSubmit={onPriceFormSubmit}>
                                                    <div style={{ marginBottom: 12 }}>
                                                        <label
                                                            style={{
                                                                display: 'block',
                                                                marginBottom: 4,
                                                                fontWeight: 'bold',
                                                            }}>
                                                            {priceEditData.outletName}
                                                        </label>
                                                        {/* <input
                                                        type="text"
                                                        value={priceEditData.outletName}
                                                        readOnly
                                                        style={{
                                                            width: '100%',
                                                            padding: '8px',
                                                            borderRadius: 4,
                                                            border: '1px solid #ccc',
                                                        }}
                                                    /> */}
                                                    </div>
                                                    <div style={{ marginBottom: 12 }}>
                                                        {/* <label
                                                        style={{
                                                            display: 'block',
                                                            marginBottom: 4,
                                                            fontWeight: 'bold',
                                                        }}>
                                                        Price
                                                    </label> */}
                                                        <input
                                                            type="text"
                                                            value={priceEditData.price}
                                                            onChange={onPriceChange}
                                                            style={{
                                                                width: '100%',
                                                                padding: '8px',
                                                                borderRadius: 4,
                                                                border: '1px solid #ccc',
                                                            }}
                                                            autoFocus
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'flex-end',
                                                            gap: '12px',
                                                        }}>
                                                        <button
                                                            type="button"
                                                            onClick={onPriceFormCancel}
                                                            style={{
                                                                padding: '8px 16px',
                                                                backgroundColor: '#ccc',
                                                                border: 'none',
                                                                borderRadius: 4,
                                                                cursor: 'pointer',
                                                            }}>
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            style={{
                                                                padding: '8px 16px',
                                                                backgroundColor: AppColors.primaryColor,
                                                                color: '#fff',
                                                                border: 'none',
                                                                borderRadius: 4,
                                                                cursor: 'pointer',
                                                            }}>
                                                            Save
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}
                                        {outletId == 'master' && (
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleItemDelete({
                                                        item_id: item.item_id,
                                                        item_name: item.item_name,
                                                    });
                                                }}>
                                                <FaRegTrashAlt />
                                            </button>
                                        )}
                                    </div>
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
                            message={`Are you sure you want to delete ${itemToDelete?.item_name}? This action cannot be undone.`}
                        />
                    </div>
                ) : (
                    <Col
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '70vh', // centers in the visible area
                        }}>
                        <Lottie animationData={error404} loop={true} style={{ height: 300, width: 300 }} />
                    </Col>
                )}
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
