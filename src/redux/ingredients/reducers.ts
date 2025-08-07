import { IngredientsActionTypes } from './constants';

interface IngredientState {
    loading: boolean;
    data: any;
    error: string | null;
}

const initialState: IngredientState = {
    loading: false,
    data: null,
    error: null,
};

const ingredientReducer = (state = initialState, action: any): IngredientState => {
    switch (action.type) {
        case IngredientsActionTypes.INGREDIENT_DAILY_LIST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case IngredientsActionTypes.INGREDIENT_DAILY_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case IngredientsActionTypes.INGREDIENT_DAILY_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ingredientReducer;
