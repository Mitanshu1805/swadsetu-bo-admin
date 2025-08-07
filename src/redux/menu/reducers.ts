import { MenuManagementCategoryAction } from './actions';
import { MenuManagementCategoryActionTypes } from './constants';

type State = {
    items: any[]; // Replace `any` with the appropriate type for items
    error: string | null;
    loading: boolean;
    message: string | null;
    categories: Category[]; // Add categories to the state
};

const initialState: State = {
    items: [],
    error: null,
    loading: false,
    message: null,
    categories: [], // Initialize the categories array
};

// Define Category type as before
type Category = {
    category_id: number;
    disable_until?: string;
    is_active: boolean;
    // Add any other fields that a category might have
};

// Your existing reducer follows...

type MenuManagementCategoryActions =
    | {
          type: typeof MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE;
          payload: {
              category_id: string;
              outlet_id: string;
              disable_until: string;
              is_active: boolean;
          };
      }
    | {
          type: typeof MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE_SUCCESS;
          payload: { category_id: number; disable_until: string; is_active: boolean; message: string };
      }
    | { type: typeof MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE_ERROR; payload: { error: string } }
    | {
          type: typeof MenuManagementCategoryActionTypes.REGISTER_CATEGORY;
          payload: FormData;
      }
    | { type: typeof MenuManagementCategoryActionTypes.REGISTER_CATEGORY_SUCCESS; payload: { message: string } }
    | { type: typeof MenuManagementCategoryActionTypes.REGISTER_CATEGORY_ERROR; payload: { error: string } }
    | {
          type: typeof MenuManagementCategoryActionTypes.DELETE_CATEGORY;
          payload: {
              category_id: string;
          };
      }
    | {
          type: typeof MenuManagementCategoryActionTypes.DELETE_CATEGORY_SUCCESS;
          payload: { category_id: number; message: string };
      }
    | { type: typeof MenuManagementCategoryActionTypes.DELETE_CATEGORY_ERROR; payload: { error: string } }
    | { type: typeof MenuManagementCategoryActionTypes.UPDATE_CATEGORY; payload: FormData }
    | { type: typeof MenuManagementCategoryActionTypes.UPDATE_CATEGORY_SUCCESS; payload: { message: string } }
    | { type: typeof MenuManagementCategoryActionTypes.UPDATE_CATEGORY_ERROR; payload: { error: string } }
    | {
          type: typeof MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE;
          payload: {
              category_id: string;
              is_active: boolean;
          };
      }
    | {
          type: typeof MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE_SUCCESS;
          payload: { category_id: number; is_active: boolean; message: string };
      }
    | { type: typeof MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE_ERROR; payload: { error: string } }
    | {
          type: typeof MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS;
          payload: {
              category_id: string;
          };
      }
    | { type: typeof MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS_SUCCESS; payload: { message: string } }
    | { type: typeof MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS_ERROR; payload: { error: string } }
    | {
          type: typeof MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST;
          payload: {
              business_id: string;
          };
      }
    | {
          type: typeof MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST_SUCCESS;
          payload: { categories: Category[]; message: string };
      }
    | { type: typeof MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST_ERROR; payload: { error: string } };

const MenuManagementCategoryReducer = (state = initialState, action: MenuManagementCategoryActions): State => {
    switch (action.type) {
        case MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.map((category) =>
                    category.category_id === action.payload.category_id
                        ? {
                              ...category,
                              disable_until: action.payload.disable_until,
                              is_active: action.payload.is_active,
                          }
                        : category
                ),
                message: action.payload.message,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementCategoryActionTypes.REGISTER_CATEGORY:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementCategoryActionTypes.REGISTER_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            };

        case MenuManagementCategoryActionTypes.REGISTER_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementCategoryActionTypes.DELETE_CATEGORY:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementCategoryActionTypes.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.filter((category) => category.category_id !== action.payload.category_id),
                message: action.payload.message,
            };

        case MenuManagementCategoryActionTypes.DELETE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementCategoryActionTypes.UPDATE_CATEGORY:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementCategoryActionTypes.UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            };

        case MenuManagementCategoryActionTypes.UPDATE_CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: state.categories.map((category) =>
                    category.category_id === action.payload.category_id
                        ? { ...category, is_active: action.payload.is_active }
                        : category
                ),
                message: action.payload.message,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST_SUCCESS:
            console.log('Categories:', action.payload.categories);
            return {
                ...state,
                loading: false,
                categories: action.payload.categories || [],
                message: action.payload.message,
            };

        case MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                categories: [], // Clear categories on error
            };

        default:
            return state;
    }
};

export default MenuManagementCategoryReducer;
