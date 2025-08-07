import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { categoryItemList, deleteCategory } from '../../../redux/menu/actions';
import { useRedux } from '../../../hooks';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AppColors } from '../../../utils/Colors';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

const CategoryList = () => {
    const categoryState = useSelector((state: any) => state?.Menu?.categories || []);
    const { dispatch } = useRedux();
    const location = useLocation();
    const outletId = location?.state?.outletId;
    const outlet_name = location?.state?.outlet_name;
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
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
    }, [dispatch]);

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

    const handleCategoryDelete = (category_id: string) => {
        setCategoryToDelete(category_id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            dispatch(deleteCategory(categoryToDelete));
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

    const handleDeleteCategory = (category_id: string) => {
        dispatch(deleteCategory(category_id));
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
                    top: 0,
                    zIndex: 1000000, // make sure it stays on top
                    backgroundColor: AppColors.backgroundColor, // so it doesn't look transparent
                    paddingBottom: '16px',
                    paddingTop: '8px', // optional padding
                    borderBottom: '1px solid #ddd', // optional border
                }}>
                <h3>Category List</h3>
                <h5>{outlet_name}</h5>
            </div>

            <Row>
                {categoryState.map((category: any, index: number) => (
                    <Col key={index} md={12}>
                        <Card style={cardStyle}>
                            <Card.Body style={cardBodyStyle}>
                                {/* Category Image */}
                                {category.logo_image && (
                                    <img src={category.logo_image} alt="Outlet Logo" style={logoStyle} />
                                )}

                                {/* Name */}
                                <div style={cardContentStyle}>
                                    <div style={cardTitleStyle}>
                                        {category.category_names.english || 'Unnamed Outlet'}
                                    </div>
                                </div>
                                {/* Edit/Delete Button Column */}
                                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                                    <button
                                        style={{
                                            backgroundColor: AppColors.borderColor,
                                            color: AppColors.iconColor,
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '8px',
                                            cursor: 'pointer',
                                            height: '40px',
                                            width: '40px',
                                        }}
                                        // onClick={() => handleTerminalEdit(item.terminal_id)}
                                    >
                                        <FaRegEdit />
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
                                        onClick={() => handleCategoryDelete(category.category_id)}>
                                        <FaRegTrashAlt />
                                    </button>
                                    <ConfirmDeleteModal
                                        show={showDeleteModal}
                                        onClose={() => setShowDeleteModal(false)}
                                        onConfirm={confirmDelete}
                                        title="Delete this Category"
                                        message="Are you sure you want to delete this category? This action cannot be undone."
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div
                style={{
                    // paddingTop: '16px',
                    // borderTop: '1px solid #ddd',
                    marginTop: '12px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                <Button
                    variant="danger"
                    style={{
                        width: '100%',
                    }}
                    onClick={() => {
                        // Navigate to register category or open modal
                        console.log('Register New Category');
                    }}>
                    + Add Category
                </Button>
            </div>
        </div>
    );
};

export default CategoryList;
