import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { recipeIngredientDelete, recipeIngredientList } from '../../../redux/actions';
import { useRedux } from '../../../hooks';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AppColors } from '../../../utils/Colors';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import ToggleSwitch from '../../../components/ToggleSwitch';

const Ingredients = () => {
    const { dispatch } = useRedux();
    const ingredients = useSelector((state: any) => state?.RecipeIngredients?.ingredients || []);
    const [ingredientToDelete, setIngredientToDelete] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [businessId, setBusinessId] = useState<string>('');

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        setBusinessId(business_id);
        if (business_id) {
            dispatch(recipeIngredientList(business_id));
        }
    }, [dispatch]);

    const handleEditIngredient = (ingredient: any) => {
        console.log('Edit ingredient:', ingredient);
        // navigate to modal or form
    };

    const handleIngredientDelete = (ingredient_id: string) => {
        setIngredientToDelete(ingredient_id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (ingredientToDelete) {
            dispatch(recipeIngredientDelete(ingredientToDelete));
            setTimeout(() => {
                dispatch(recipeIngredientList(businessId));
            }, 200);
            setShowDeleteModal(false);
        }
    };

    const handleIngredientToggle = (ingredient_id: string, is_active: boolean) => {
        // dispatch(updateIngredientIsActive(ingredient_id, is_active));
        setTimeout(() => {
            dispatch(recipeIngredientList(businessId));
        }, 200);
    };

    const cardStyle: React.CSSProperties = {
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px',
    };

    const logoStyle: React.CSSProperties = {
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        borderRadius: '30px',
        marginLeft: '1rem',
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h3>Ingredients List</h3>

            <Row>
                {ingredients.length > 0 ? (
                    ingredients.map((ingredient: any, index: number) => (
                        <Col key={index} md={12}>
                            <Card style={cardStyle}>
                                <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                    {ingredient.image && (
                                        <img src={ingredient.image} alt="Ingredient" style={logoStyle} />
                                    )}

                                    <div style={{ fontSize: '1.25rem', paddingLeft: '14px' }}>
                                        {ingredient.ingredient_name || 'Unnamed Ingredient'}
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
                                                border: 'none',
                                                borderRadius: '4px',
                                                padding: '8px',
                                                cursor: 'pointer',
                                                height: '40px',
                                                width: '40px',
                                            }}
                                            onClick={() => handleEditIngredient(ingredient)}>
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
                                            onClick={() => handleIngredientDelete(ingredient.ingredient_id)}>
                                            <FaRegTrashAlt />
                                        </button>

                                        <ConfirmDeleteModal
                                            show={showDeleteModal}
                                            onClose={() => setShowDeleteModal(false)}
                                            onConfirm={confirmDelete}
                                            title="Delete this Ingredient"
                                            message="Are you sure you want to delete this ingredient? This action cannot be undone."
                                        />

                                        <div onClick={(e) => e.stopPropagation()}>
                                            <ToggleSwitch
                                                checked={ingredient.is_active}
                                                onChange={(checked) =>
                                                    handleIngredientToggle(ingredient.ingredient_id, checked)
                                                }
                                            />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No ingredients found.</p>
                )}
            </Row>

            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="danger"
                    style={{ width: '100%' }}
                    onClick={() => console.log('Add ingredient clicked')}>
                    + Add Ingredient
                </Button>
            </div>
        </div>
    );
};

export default Ingredients;
