import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useRedux } from '../../../../hooks';
import { useSelector } from 'react-redux';
import {
    recipeAdd,
    recipeIngredientList,
    RecipeIngredientsManagementAction,
    recipeList,
    recipeUpdate,
} from '../../../../redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';

interface Ingredient {
    ingredient_name: string;
    quantity: string;
    unit: string;
}

type RecipeFormValues = {
    preparation_time: string;
    preparation_type: string;
    instructions: string;
    ingredients: {
        selected?: boolean;
        ingredient_id: string;
        ingredient_name: string;
        unit: string;
        quantity?: string;
    }[];
};

interface AddRecipeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RecipeFormValues) => void;
}

const RecipeModal: React.FC<AddRecipeModalProps> = ({ onSubmit }) => {
    const { dispatch } = useRedux();
    const location = useLocation();
    const [businessId, setBusinessId] = useState<string>('');
    const itemId = location?.state?.itemId;
    const outletId = location?.state?.outletId;
    const recipeId = location?.state?.recipe_id;
    const ingredientsState = useSelector((state: any) => state?.RecipeIngredients?.ingredients);
    const navigate = useNavigate();

    useEffect(() => {
        const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
        const business_id = business.business_id;
        setBusinessId(business_id);
        dispatch(recipeIngredientList(business_id));
    }, [dispatch]);

    const { register, handleSubmit, control, reset, watch } = useForm<RecipeFormValues>({
        defaultValues: {
            preparation_time: '',
            preparation_type: '',
            instructions: '',
            ingredients: [{ ingredient_name: '', quantity: '', unit: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const recipe = useSelector((state: any) => state?.Recipe?.recipes); // whatever your reducer key is

    useEffect(() => {
        if (recipeId) {
            // Fetch recipe when in edit mode
            const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
            const business_id = business.business_id;
            dispatch(recipeList(business_id, itemId));
        } else {
            // Fresh add mode
            reset({
                preparation_time: '',
                preparation_type: '',
                instructions: '',
                ingredients:
                    ingredientsState?.map((ing: any) => ({
                        selected: false,
                        ingredient_id: ing.ingredient_id,
                        ingredient_name: ing.ingredient_name,
                        unit: ing.unit,
                        quantity: '',
                    })) || [],
            });
        }
    }, [recipeId, businessId, itemId, ingredientsState, dispatch, reset]);

    // This effect runs only when recipe details are updated in the store
    // useEffect(() => {
    //     if (recipe && recipe.ingredients) {

    //         reset({
    //             preparation_time: recipe.preparation_time,
    //             preparation_type: recipe.preparation_type,
    //             instructions: recipe.instructions,
    //             ingredients: recipe.ingredients.map((ing: any) => ({
    //                 selected: true,
    //                 ingredient_id: ing.ingredient_id,
    //                 ingredient_name: ing.ingredient_name,
    //                 unit: ing.unit,
    //                 quantity: ing.quantity,
    //             })),
    //         });
    //     }
    // }, [recipe, reset]);

    useEffect(() => {
        if (ingredientsState?.length) {
            const fullIngredients = ingredientsState.map((ing: any) => {
                const recipeIng = recipe?.ingredients?.find((r: any) => r.ingredient_id === ing.ingredient_id);
                return {
                    ingredient_id: ing.ingredient_id,
                    ingredient_name: ing.ingredient_name,
                    unit: ing.unit,
                    quantity: recipeIng ? recipeIng.quantity : '',
                    selected: !!recipeIng,
                };
            });

            reset({
                preparation_time: recipe?.preparation_time || '',
                preparation_type: recipe?.preparation_type || '',
                instructions: recipe?.instructions || '',
                ingredients: fullIngredients,
            });
        }
    }, [ingredientsState, recipe, reset]);

    // useEffect(() => {
    //     if (recipeId) {
    //         const business = JSON.parse(localStorage.getItem('selected_business') || '{}');
    //         const business_id = business.business_id;
    //         dispatch(recipeList(business_id, itemId)).then((recipe: any) => {
    //             reset({
    //                 preparation_time: recipe.preparation_time,
    //                 preparation_type: recipe.preparation_type,
    //                 instructions: recipe.instructions,
    //                 ingredients: recipe.ingredients.map((ing: any) => ({
    //                     selected: true,
    //                     ingredient_id: ing.ingredient_id,
    //                     ingredient_name: ing.ingredient_name,
    //                     unit: ing.unit,
    //                     quantity: ing.quantity,
    //                 })),
    //             });
    //         });
    //     } else {
    //         reset({
    //             preparation_time: '',
    //             preparation_type: '',
    //             instructions: '',
    //             ingredients:
    //                 ingredientsState?.map((ing: any) => ({
    //                     selected: false,
    //                     ingredient_id: ing.ingredient_id,
    //                     ingredient_name: ing.ingredient_name,
    //                     unit: ing.unit,
    //                     quantity: '',
    //                 })) || [],
    //         });
    //     }
    // }, [recipeId, businessId, itemId, ingredientsState, reset, dispatch]);

    const submitHandler: SubmitHandler<RecipeFormValues> = (data) => {
        const selectedIngredients = data.ingredients
            .filter((ing) => ing.selected)
            .map(({ ingredient_id, ingredient_name, unit, quantity }) => ({
                ingredient_id,
                // ingredient_name,
                // unit,
                quantity,
            }));

        let payload: any = {
            preparation_time: data.preparation_time,
            preparation_type: data.preparation_type.toLowerCase(),
            instructions: data.instructions,
            ingredients: selectedIngredients,
            // is_active: true,
        };

        // If creating (no recipeId), include business_id and outletId
        if (!recipeId) {
            payload.business_id = businessId;
            payload.item_id = itemId;
            if (outletId !== 'master') {
                payload.outletId = outletId;
            }
        }

        // If editing, include recipe_id
        if (recipeId) {
            payload.recipe_id = recipeId;
            dispatch(recipeUpdate(payload));
        } else {
            dispatch(recipeAdd(payload)); // or whatever your create action is
        }

        // navigate('/item-details');

        // onSubmit(data);
        // dispatch(recipeAdd(payload));

        reset();
        // onClose();
    };

    // if (!isOpen) return null;

    return (
        <div style={styles.pageContainer}>
            <h2 style={styles.title}>{recipeId ? 'Edit Recipe' : 'Add Recipe'}</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Preparation Time (Minute)</label>
                    <input style={styles.input} {...register('preparation_time', { required: true })} />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Preparation Type</label>
                    <select style={styles.input} {...register('preparation_type', { required: true })}>
                        <option value="">-- Select type --</option>
                        <option value="Grill">Grill</option>
                        <option value="Boil">Boil</option>
                        <option value="Fry">Fry</option>
                        <option value="Bake">Bake</option>
                        <option value="Raw">Raw</option>
                        <option value="Mix">Mix</option>
                    </select>
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Instructions</label>
                    <textarea style={styles.textarea} {...register('instructions')} />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Ingredients</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {fields.map((field, index) => {
                            const isSelected = watch(`ingredients.${index}.selected`);
                            return (
                                <div key={field.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <input type="checkbox" {...register(`ingredients.${index}.selected`)} />
                                    <span>
                                        {field.ingredient_name} ({field.unit})
                                    </span>

                                    {/* Hidden fields */}
                                    <input type="hidden" {...register(`ingredients.${index}.ingredient_id`)} />
                                    <input type="hidden" {...register(`ingredients.${index}.ingredient_name`)} />
                                    <input type="hidden" {...register(`ingredients.${index}.unit`)} />

                                    {/* Quantity input only if selected */}
                                    {isSelected && (
                                        <input
                                            type="number"
                                            placeholder="Qty"
                                            {...register(`ingredients.${index}.quantity`, { required: isSelected })}
                                            style={{ width: '80px' }}
                                            disabled={!isSelected}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div style={styles.actions}>
                    <button type="submit" style={{ ...styles.button, ...styles.saveButton }}>
                        Save
                    </button>
                    <button type="button" style={{ ...styles.button, ...styles.cancelButton }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

// Properly typed styles
const styles: Record<string, React.CSSProperties> = {
    pageContainer: {
        maxWidth: '700px',
        margin: '40px auto',
        padding: '24px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        fontFamily: 'sans-serif',
    },
    title: {
        marginBottom: '20px',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#333',
    },
    formGroup: {
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '6px',
        fontWeight: 500,
        color: '#555',
    },
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        fontSize: '1rem',
    },
    textarea: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        fontSize: '1rem',
        minHeight: '80px',
    },
    ingredientRow: {
        display: 'flex',
        gap: '8px',
        marginBottom: '8px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '20px',
    },
    button: {
        padding: '10px 16px',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    saveButton: {
        background: '#4CAF50',
        color: '#fff',
    },
    cancelButton: {
        background: '#ccc',
        color: '#000',
    },
};

export default RecipeModal;
