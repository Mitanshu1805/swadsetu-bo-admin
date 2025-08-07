import { Outlet } from 'react-router-dom';
import { MenuManagementCategoryActionTypes } from './constants';

export interface CategoryItem {
    id: string;
    name: string;
}

export type MenuManagementCategoryAction =
    | {
          type: typeof MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE;
          payload: {
              category_id: string;
              outlet_id: string;
              disable_until: string;
              is_active: boolean;
          };
      }
    | { type: typeof MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE_SUCCESS; payload: { message: string } }
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
    | { type: typeof MenuManagementCategoryActionTypes.DELETE_CATEGORY_SUCCESS; payload: { message: string } }
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
    | { type: typeof MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE_SUCCESS; payload: { message: string } }
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
              outlet_id?: string;
          };
      }
    | {
          type: typeof MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST_SUCCESS;
          payload: { categories: CategoryItem[]; message: string };
      }
    | { type: typeof MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST_ERROR; payload: { error: string } };

export const categoryUpdateDisable = (
    category_id: string,
    outlet_id: string,
    disable_until: string,
    is_active: boolean
): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE,
    payload: { category_id, outlet_id, disable_until, is_active },
});

// Action for successful category disable update
export const categoryUpdateDisableSuccess = (message: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE_SUCCESS,
    payload: { message },
});

// Action for error in category disable update
export const categoryUpdateDisableError = (error: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE_ERROR,
    payload: { error },
});

// Action to register a new category
export const registerCategory = (formData: FormData): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.REGISTER_CATEGORY,
    payload: formData,
});

// Action for successful category registration
export const registerCategorySuccess = (message: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.REGISTER_CATEGORY_SUCCESS,
    payload: { message },
});

// Action for error in category registration
export const registerCategoryError = (error: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.REGISTER_CATEGORY_ERROR,
    payload: { error },
});

// Action to delete a category
export const deleteCategory = (category_id: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.DELETE_CATEGORY,
    payload: { category_id },
});

// Action for successful category deletion
export const deleteCategorySuccess = (message: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.DELETE_CATEGORY_SUCCESS,
    payload: { message },
});

// Action for error in category deletion
export const deleteCategoryError = (error: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.DELETE_CATEGORY_ERROR,
    payload: { error },
});

// Action to update a category
export const updateCategory = (formData: FormData): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.UPDATE_CATEGORY,
    payload: formData,
});

// Action for successful category update
export const updateCategorySuccess = (message: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.UPDATE_CATEGORY_SUCCESS,
    payload: { message },
});

// Action for error in category update
export const updateCategoryError = (error: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.UPDATE_CATEGORY_ERROR,
    payload: { error },
});

// Action to update category active state
export const categoryUpdateIsActive = (category_id: string, is_active: boolean): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE,
    payload: { category_id, is_active },
});

// Action for successful category active state update
export const categoryUpdateIsActiveSuccess = (message: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE_SUCCESS,
    payload: { message },
});

// Action for error in category active state update
export const categoryUpdateIsActiveError = (error: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE_ERROR,
    payload: { error },
});

// Action to fetch category outlet lists
export const categoryOutletLists = (category_id: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS,
    payload: { category_id },
});

// Action for successful fetch of category outlet lists
export const categoryOutletListsSuccess = (message: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS_SUCCESS,
    payload: { message },
});

// Action for error in fetching category outlet lists
export const categoryOutletListsError = (error: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS_ERROR,
    payload: { error },
});

// Action to fetch category item lists
export const categoryItemList = (data: { business_id: string; outlet_id?: string }): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST,
    payload: data,
});

// Action for successful fetch of category item lists
export const categoryItemListSuccess = (categories: CategoryItem[], message: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST_SUCCESS,
    payload: { categories, message },
});

// Action for error in fetching category item lists
export const categoryItemListError = (error: string): MenuManagementCategoryAction => ({
    type: MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST_ERROR,
    payload: { error },
});
