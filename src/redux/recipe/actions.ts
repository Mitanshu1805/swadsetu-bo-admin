import { Post } from '../../pages/apps/Contacts/Profile/types';
import { RecipeManagementActionTypes } from './constants';

// PostPOST PUT DELETE

type AddRecipe = {
    item_id: string;
    business_id: string;
    preparation_time: number;
    // cooking_time: number;
    preparation_type: string;
    instructions: string;
    // is_active: boolean;
    ingredients: { ingredient_id: string; quantity: number }[]; // ✅ Fixed
};

type UpdateRecipe = {
    recipe_id: string;
    item_id: string;
    outlet_id: string;
    preparation_time: number;
    cooking_time: number;
    preparation_type: string;
    instructions: string;
    is_active: boolean;
    ingredients: [recipe_ingredient_id: string, ingredient_name: string, quantity: number, unit: string];
};

export type RecipeManagementAction =
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_ADD;
          payload: AddRecipe;
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_ADD_SUCCESS;
          payload: { message: string };
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_ADD_ERROR;
          payload: { error: string };
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_LIST;
          payload: {
              item_id: string;
              business_id: string;
          };
      }
    | {
          type: typeof RecipeManagementActionTypes.CLEAR_RECIPE;
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_LIST_SUCCESS;
          payload: { recipes: any };
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_LIST_ERROR;
          payload: { error: string };
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_UPDATE;
          payload: UpdateRecipe;
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_UPDATE_SUCCESS;
          payload: { message: string };
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_UPDATE_ERROR;
          payload: { error: string };
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_DELETE;
          payload: {
              recipe_id: string;
          };
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_DELETE_SUCCESS;
          payload: { message: string };
      }
    | {
          type: typeof RecipeManagementActionTypes.RECIPE_DELETE_ERROR;
          payload: { error: string };
      };

export const recipeAdd = (data: AddRecipe): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_ADD,
    payload: data,
});

export const recipeAddSuccess = (message: string): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_ADD_SUCCESS,
    payload: { message },
});

export const recipeAddError = (error: string): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_ADD_ERROR,
    payload: { error },
});

export const recipeList = (business_id: string, item_id: any): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_LIST,
    payload: { item_id, business_id },
});

export const clearRecipe = {};

export const recipeListSuccess = (recipes: any): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_LIST_SUCCESS,
    payload: { recipes },
});

export const recipeListError = (error: string): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_LIST_ERROR,
    payload: { error },
});

export const recipeUpdate = (data: UpdateRecipe): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_UPDATE,
    payload: data,
});

export const recipeUpdateSuccess = (message: string): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_UPDATE_SUCCESS,
    payload: { message },
});

export const recipeUpdateError = (error: string): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_UPDATE_ERROR,
    payload: { error },
});

export const recipeDelete = (recipe_id: string): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_DELETE,
    payload: { recipe_id },
});

export const recipeDeleteSuccess = (message: string): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_DELETE_SUCCESS,
    payload: { message },
});

export const recipeDeleteError = (error: string): RecipeManagementAction => ({
    type: RecipeManagementActionTypes.RECIPE_DELETE_ERROR,
    payload: { error },
});
