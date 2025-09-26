import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    recipeIngredientAdd,
    recipeIngredientDelete,
    recipeIngredientList,
    recipeIngredientUpdate,
    recipeIngredientUpdateStatus,
} from '../../../redux/actions';
import { useRedux } from '../../../hooks';
import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { AppColors } from '../../../utils/Colors';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import ToggleSwitch from '../../../components/ToggleSwitch';
import Lottie from 'lottie-react';
import error404 from '../../../assets/lottie/404-notfound.json';

type IngredientDelete = {
    ingredient_name: string;
    ingredient_id: string;
};

const Ingredients = () => {
    const { dispatch } = useRedux();
    const ingredients = useSelector((state: any) => state?.RecipeIngredients?.ingredients || []);
    const ingredientsError = useSelector((state: any) => state?.RecipeIngredients?.error);

    const [showFormModal, setShowFormModal] = useState(false);
    const [editData, setEditData] = useState<any>(null);
    const [ingredientName, setIngredientName] = useState('');
    const [unit, setUnit] = useState('');
    const [ingredientToDelete, setIngredientToDelete] = useState<IngredientDelete | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
    const [businessId, setBusinessId] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [unitError, setUnitError] = useState('');
    const [nameError, setNameError] = useState('');

    const filteredIngredients = ingredients.filter((ingredient: any) =>
        ingredient?.ingredient_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        setBusinessId(business_id);
        if (business_id) dispatch(recipeIngredientList(business_id));
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
        if (!ingredientName.trim()) {
            setNameError('Please write ingredient name');
            return;
        } else setNameError('');

        if (!unit) {
            setUnitError('Please select a unit');
            return;
        } else setUnitError('');

        const payload = { ingredient_name: ingredientName, unit, business_id: businessId };
        if (editData) {
            dispatch(recipeIngredientUpdate(editData.ingredient_id, ingredientName, unit, businessId));
        } else {
            dispatch(recipeIngredientAdd(payload));
        }
        setShowFormModal(false);
        setTimeout(() => dispatch(recipeIngredientList(businessId)), 200);
    };

    const handleIngredientDelete = (data: IngredientDelete) => {
        setIngredientToDelete(data);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (ingredientToDelete) {
            dispatch(recipeIngredientDelete(ingredientToDelete.ingredient_id));
            setTimeout(() => dispatch(recipeIngredientList(businessId)), 200);
            setShowDeleteModal(false);
        }
    };

    const handleIngredientToggle = (ingredient_id: string, is_active: boolean) => {
        dispatch(recipeIngredientUpdateStatus(ingredient_id, is_active));
        setTimeout(() => dispatch(recipeIngredientList(businessId)), 200);
    };

    function hexToRgb(hex: string) {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }

    const cardBaseStyle: React.CSSProperties = {
        borderRadius: '12px',
        cursor: 'pointer',
        minHeight: '140px',
        // border: `1px solid ${AppColors.primaryColor}`,
        boxShadow: `0 4px 16px rgba(${hexToRgb(AppColors.primaryColor)}, 0.15)`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
    };

    const cardHoverStyle: React.CSSProperties = {
        transform: 'translateY(-4px)',
        boxShadow: `0 8px 20px rgba(${hexToRgb(AppColors.primaryColor)}, 0.25)`,
        // borderColor: AppColors.primaryColor,
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

            <Form.Control
                type="text"
                placeholder="Search ingredient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '1rem' }}
            />

            {ingredientsError ? (
                <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <Lottie animationData={error404} loop style={{ height: 300, width: 300 }} />
                </Col>
            ) : (
                <Row className="g-4">
                    {filteredIngredients.map((ingredient: any) => (
                        <Col key={ingredient.ingredient_id} xs={12} sm={6} md={4} lg={3}>
                            <Card
                                style={{
                                    ...cardBaseStyle,
                                    ...(hoveredCardId === ingredient.ingredient_id ? cardHoverStyle : {}),
                                }}
                                onMouseEnter={() => setHoveredCardId(ingredient.ingredient_id)}
                                onMouseLeave={() => setHoveredCardId(null)}>
                                <Card.Body className="d-flex flex-column justify-content-between p-3">
                                    <div style={{ paddingBottom: '10px' }}>
                                        <div
                                            style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                                            {ingredient.ingredient_name || 'Unnamed'}
                                        </div>
                                        <div style={{ fontSize: '1rem', color: '#555' }}>{ingredient.unit}</div>
                                    </div>

                                    <div className="d-flex gap-2 justify-content-end align-items-center">
                                        <button
                                            style={{
                                                backgroundColor: AppColors.borderColor,
                                                color: AppColors.iconColor,
                                                border: 'none',
                                                borderRadius: '6px',
                                                height: '40px',
                                                width: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleEditIngredient(ingredient)}>
                                            <FaRegEdit />
                                        </button>

                                        <button
                                            style={{
                                                backgroundColor: AppColors.borderColor,
                                                color: AppColors.iconColor,
                                                border: 'none',
                                                borderRadius: '6px',
                                                height: '40px',
                                                width: '40px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                handleIngredientDelete({
                                                    ingredient_id: ingredient.ingredient_id,
                                                    ingredient_name: ingredient.ingredient_name,
                                                })
                                            }>
                                            <FaRegTrashAlt />
                                        </button>

                                        <ToggleSwitch
                                            checked={ingredient?.is_active}
                                            onChange={(checked) =>
                                                handleIngredientToggle(ingredient.ingredient_id, checked)
                                            }
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <ConfirmDeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete this Ingredient"
                message={`Are you sure you want to delete ${ingredientToDelete?.ingredient_name}? This action cannot be undone.`}
            />

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
                            {nameError && <Form.Text style={{ color: 'red' }}>{nameError}</Form.Text>}
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
                            {unitError && <Form.Text style={{ color: 'red' }}>{unitError}</Form.Text>}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFormModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleSaveIngredient}>
                        {editData ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Ingredients;
