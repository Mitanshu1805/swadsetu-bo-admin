import { RecipeManagementAction } from './actions';
import { RecipeManagementActionTypes } from './constants';

type State = {
    recipes: any | null;
    error: string | null;
    loading: boolean;
    message: string | null;
};

const initialState: State = {
    recipes: null,
    error: null,
    loading: false,
    message: null,
};

type RecipeManagementActions =
    | { type: typeof RecipeManagementActionTypes.RECIPE_ADD }
    | { type: typeof RecipeManagementActionTypes.RECIPE_ADD_SUCCESS; payload: { recipe: any } }
    | { type: typeof RecipeManagementActionTypes.RECIPE_ADD_ERROR; payload: { error: string } }
    | { type: typeof RecipeManagementActionTypes.RECIPE_LIST }
    | { type: typeof RecipeManagementActionTypes.RECIPE_LIST_SUCCESS; payload: { recipes: any[] } }
    | { type: typeof RecipeManagementActionTypes.RECIPE_LIST_ERROR; payload: { error: string } }
    | { type: typeof RecipeManagementActionTypes.RECIPE_UPDATE }
    | { type: typeof RecipeManagementActionTypes.RECIPE_UPDATE_SUCCESS; payload: { recipe: any } }
    | { type: typeof RecipeManagementActionTypes.RECIPE_UPDATE_ERROR; payload: { error: string } }
    | { type: typeof RecipeManagementActionTypes.RECIPE_DELETE }
    | { type: typeof RecipeManagementActionTypes.RECIPE_DELETE_SUCCESS; payload: { recipe_id: string } }
    | { type: typeof RecipeManagementActionTypes.RECIPE_DELETE_ERROR; payload: { error: string } }
    | { type: typeof RecipeManagementActionTypes.CLEAR_RECIPE };

const RecipeManagementReducer = (state = initialState, action: RecipeManagementActions): State => {
    switch (action.type) {
        case RecipeManagementActionTypes.RECIPE_ADD:
            return { ...state, loading: true, error: null };

        case RecipeManagementActionTypes.RECIPE_ADD_SUCCESS:
            return { ...state, loading: false, recipes: [...state.recipes, action.payload.recipe] };

        case RecipeManagementActionTypes.RECIPE_ADD_ERROR:
            return { ...state, loading: false, error: action.payload.error };

        case RecipeManagementActionTypes.RECIPE_LIST:
            return { ...state, loading: true, error: null };

        case RecipeManagementActionTypes.CLEAR_RECIPE:
            return {
                ...state,
                recipes: null,
            };

        case RecipeManagementActionTypes.RECIPE_LIST_SUCCESS:
            return { ...state, loading: false, recipes: action.payload.recipes };

        case RecipeManagementActionTypes.RECIPE_LIST_ERROR:
            return { ...state, loading: false, error: action.payload.error };

        case RecipeManagementActionTypes.RECIPE_UPDATE:
            return { ...state, loading: true, error: null };

        case RecipeManagementActionTypes.RECIPE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: state.recipes.map((recipe: any) =>
                    recipe.id === action.payload.recipe.id ? action.payload.recipe : recipe
                ),
            };

        case RecipeManagementActionTypes.RECIPE_UPDATE_ERROR:
            return { ...state, loading: false, error: action.payload.error };

        case RecipeManagementActionTypes.RECIPE_DELETE:
            return { ...state, loading: true, error: null };

        case RecipeManagementActionTypes.RECIPE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: state.recipes.filter((recipe: any) => recipe.id !== action.payload.recipe_id),
            };

        case RecipeManagementActionTypes.RECIPE_DELETE_ERROR:
            return { ...state, loading: false, error: action.payload.error };

        default:
            return state;
    }
};

export default RecipeManagementReducer;
