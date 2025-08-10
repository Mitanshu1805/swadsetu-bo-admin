import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

interface Ingredient {
    ingredient_name: string;
    quantity: string;
    unit: string;
}

interface RecipeFormValues {
    preparation_time: string;
    preparation_type: string;
    instructions: string;
    ingredients: Ingredient[];
}

interface AddRecipeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RecipeFormValues) => void;
}

const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, control, reset } = useForm<RecipeFormValues>({
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

    const submitHandler: SubmitHandler<RecipeFormValues> = (data) => {
        onSubmit(data);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Add Recipe</h2>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {/* Preparation Time */}
                    <div style={styles.formGroup}>
                        <label>Preparation Time</label>
                        <input {...register('preparation_time', { required: true })} />
                    </div>

                    {/* Preparation Type */}
                    <div style={styles.formGroup}>
                        <label>Preparation Type</label>
                        <input {...register('preparation_type')} />
                    </div>

                    {/* Instructions */}
                    <div style={styles.formGroup}>
                        <label>Instructions</label>
                        <textarea {...register('instructions')} />
                    </div>

                    {/* Ingredients */}
                    <div style={styles.formGroup}>
                        <label>Ingredients</label>
                        {fields.map((field, index) => (
                            <div key={field.id} style={styles.ingredientRow}>
                                <input placeholder="Name" {...register(`ingredients.${index}.ingredient_name`)} />
                                <input placeholder="Qty" {...register(`ingredients.${index}.quantity`)} />
                                <input placeholder="Unit" {...register(`ingredients.${index}.unit`)} />
                                <button type="button" onClick={() => remove(index)}>
                                    ❌
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => append({ ingredient_name: '', quantity: '', unit: '' })}>
                            ➕ Add Ingredient
                        </button>
                    </div>

                    {/* Actions */}
                    <div style={styles.actions}>
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Properly typed styles
const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    formGroup: {
        marginBottom: '12px',
    },
    ingredientRow: {
        display: 'flex',
        gap: '8px',
        marginBottom: '8px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
        marginTop: '16px',
    },
};

export default AddRecipeModal;
