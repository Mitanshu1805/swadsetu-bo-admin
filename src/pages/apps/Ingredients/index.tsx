import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    recipeIngredientAdd,
    recipeIngredientDelete,
    recipeIngredientList,
    // recipeIngredientCreate,
    recipeIngredientUpdate,
    recipeIngredientUpdateStatus,
} from '../../../redux/actions';
import { useRedux } from '../../../hooks';
import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AppColors } from '../../../utils/Colors';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import ToggleSwitch from '../../../components/ToggleSwitch';

const Ingredients = () => {
    const { dispatch } = useRedux();
    const ingredients = useSelector((state: any) => state?.RecipeIngredients?.ingredients || []);

    const [showFormModal, setShowFormModal] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [ingredientName, setIngredientName] = useState('');
    const [unit, setUnit] = useState('');

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

    const handleAddIngredient = () => {
        setEditData(null);
        setIngredientName('');
        setUnit('');
        setShowFormModal(true);
    };

    const handleEditIngredient = (ingredient: any) => {
        setEditData(ingredient);
        setIngredientName(ingredient.ingredient_name || '');
        setUnit(ingredient.unit || '');
        setShowFormModal(true);
    };

    const handleSaveIngredient = () => {
        if (!ingredientName.trim()) return;

        const payload = {
            ingredient_name: ingredientName,
            unit: unit,
            business_id: businessId,
        };

        if (editData) {
            // update
            dispatch(recipeIngredientUpdate(editData.ingredient_id, ingredientName, unit, businessId));
        } else {
            // create
            dispatch(recipeIngredientAdd(payload));
        }

        setShowFormModal(false);
        setTimeout(() => {
            dispatch(recipeIngredientList(businessId));
        }, 200);
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
        dispatch(recipeIngredientUpdateStatus(ingredient_id, is_active));
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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}>
                <h3 style={{ margin: 0 }}>Ingredients List</h3>
                <Button variant="danger" onClick={handleAddIngredient}>
                    + Add Ingredient
                </Button>
            </div>

            <Row>
                {ingredients.length > 0 ? (
                    ingredients.map((ingredient: any, index: number) => (
                        <Col key={index} md={12}>
                            <Card style={cardStyle}>
                                <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* {ingredient.image && (
                                        <img src={ingredient.image} alt="Ingredient" style={logoStyle} />
                                    )} */}

                                    <div
                                        style={{
                                            fontSize: '1.25rem',
                                            paddingLeft: '14px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>
                                        <div>
                                            <strong>{ingredient?.ingredient_name || 'Unnamed Ingredient'}</strong>
                                        </div>
                                        <div>{ingredient?.unit}</div>
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
                                                checked={ingredient?.is_active}
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

            {/* Add/Edit Modal */}
            <Modal show={showFormModal} onHide={() => setShowFormModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editData ? 'Edit Ingredient' : 'Add Ingredient'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingredient Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={ingredientName}
                                onChange={(e) => setIngredientName(e.target.value)}
                                placeholder="Enter ingredient name"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Unit</Form.Label>
                            <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)}>
                                <option value="">Select Unit</option>
                                <option value="gm">GM</option>
                                <option value="kg">KG</option>
                                <option value="ml">ML</option>
                                <option value="l">L</option>
                                <option value="piece">Piece</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFormModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleSaveIngredient}>
                        {editData ? 'Update' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Ingredients;
