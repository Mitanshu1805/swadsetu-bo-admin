import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { categoryItemList, categoryUpdateIsActive, deleteCategory } from '../../../redux/menu/actions';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AppColors } from '../../../utils/Colors';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import ToggleSwitch from '../../../components/ToggleSwitch';
import Lottie from 'lottie-react';
import error404 from '../../../assets/lottie/404-notfound.json';
import { StringOptionsWithImporter } from 'sass';

type CategoryData = {
    category_id: string;
    category_name: string;
};

const CategoryList = () => {
    const categoryState = useSelector((state: any) => state?.Menu?.categories || []);
    console.log('categoryState>>>>>', categoryState);

    const { dispatch } = useRedux();
    const location = useLocation();
    const outletId = location?.state?.outletId;
    const outlet_name = location?.state?.outlet_name;
    const [categoryToDelete, setCategoryToDelete] = useState<CategoryData | null>(null);
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

    const navigate = useNavigate();

    const cardStyle: React.CSSProperties = {
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        transition: 'background 0.2s',
    };

    const cardBodyStyle: React.CSSProperties = {
        padding: '12px 16px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
        // width: '100%',
    };

    const cardContentStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        // marginLeft: '1rem',
    };

    const cardTitleStyle: React.CSSProperties = {
        fontSize: '1.25rem',
        marginBottom: '0.25rem',
        paddingLeft: '14px',
    };

    const logoStyle: React.CSSProperties = {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '30px',
        marginLeft: '1rem',
    };

    const buttonGroupStyle: React.CSSProperties = {
        position: 'absolute',
        top: '20px',
        right: '16px',
        display: 'flex',
        // flexDirection: 'column',
        gap: '0.5rem',
    };

    const handleEdit = (category: any) => {
        console.log('Edit category:', category);
        // Navigate or open modal etc.
    };

    const handleCategoryDelete = (data: CategoryData) => {
        setCategoryToDelete(data);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            dispatch(deleteCategory(categoryToDelete.category_id));
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
            });
            setShowDeleteModal(false);
        }
    };

    const handleRegisterCategory = (business_id: string, outletId: string) => {
        console.log('register category clicked for business_id:', business_id, 'and outlet id:', outletId);
        navigate('/category-modal', {
            state: {
                business_id,
                outletId,
            },
        });
    };

    const handleEditCategory = (business_id: string, outletId: string, category_id: string) => {
        console.log('edit category clicked for business_id:', business_id, 'and outlet id:', outletId);
        navigate('/category-modal', {
            state: {
                business_id,
                outletId,
                editMode: true,
                category_id,
            },
        });
    };

    const handleCategoryToggle = (category_id: string, is_active: boolean) => {
        dispatch(categoryUpdateIsActive(category_id, is_active));

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
                    <h3 style={{ margin: 0 }}>Category List</h3>
                    <h5 style={{ margin: 0 }}>{outlet_name}</h5>
                </div>

                {outletId === 'master' && (
                    <Button
                        variant="danger"
                        onClick={() => {
                            handleRegisterCategory(businessId, outletId);
                        }}>
                        + Add Category
                    </Button>
                )}
            </div>
            {categoryState.length === 0 ? (
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
                <Row>
                    {categoryState.map((category: any, index: number) => (
                        <Col key={index} xs="auto" style={{ marginBottom: '1rem' }}>
                            <Card
                                style={{
                                    width: '180px', // standing rectangle
                                    height: '230px',
                                    borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    textAlign: 'center',
                                }}>
                                {/* Logo */}
                                {category.logo_image && (
                                    <img
                                        src={category.logo_image}
                                        alt="Category Logo"
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginBottom: '0.75rem',
                                        }}
                                    />
                                )}

                                {/* Name */}
                                <div
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        // marginBottom: '0.75rem',
                                        minHeight: '40px', // keep height consistent
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    {category.category_names?.english || 'Unnamed'}
                                </div>

                                {/* Action Buttons */}
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '0.5rem',
                                        // marginBottom: '0.75rem',
                                    }}>
                                    {outletId === 'master' && (
                                        <>
                                            <button
                                                style={{
                                                    backgroundColor: AppColors.borderColor,
                                                    color: AppColors.iconColor,
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '6px',
                                                    cursor: 'pointer',
                                                    height: '36px',
                                                    width: '36px',
                                                }}
                                                onClick={() =>
                                                    handleEditCategory(businessId, outletId, category.category_id)
                                                }>
                                                <FaRegEdit />
                                            </button>

                                            <button
                                                style={{
                                                    backgroundColor: AppColors.borderColor,
                                                    color: AppColors.iconColor,
                                                    height: '36px',
                                                    width: '36px',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() =>
                                                    handleCategoryDelete({
                                                        category_id: category.category_id,
                                                        category_name: category.category_name,
                                                    })
                                                }>
                                                <FaRegTrashAlt />
                                            </button>
                                            <ConfirmDeleteModal
                                                show={showDeleteModal}
                                                onClose={() => setShowDeleteModal(false)}
                                                onConfirm={confirmDelete}
                                                title="Delete this Terminal"
                                                message={`Are you sure you want to delete ${categoryToDelete?.category_name}? This action cannot be undone.`}
                                            />
                                        </>
                                    )}
                                </div>

                                {/* Status */}
                                <div style={{ marginTop: '10px' }}>
                                    <ToggleSwitch
                                        checked={category.is_active}
                                        onChange={(checked) => handleCategoryToggle(category.category_id, checked)}
                                    />
                                    <div
                                        style={{
                                            fontSize: '0.85rem',
                                            marginTop: '10px',
                                            color: category.is_active ? 'green' : 'red',
                                        }}></div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default CategoryList;
