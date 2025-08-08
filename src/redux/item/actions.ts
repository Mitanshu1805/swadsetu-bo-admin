import { Item } from 'react-nestable';
import { MenuManagementItemActionTypes } from './constants';

interface availableOrderType {
    dine_in: number;
}

type ItemList = {
    item_id: string;
    language_id: string;
    online_display_name: string;
    logo_image: string;
    swiggy_image: string;
    banner_image: string;
    price: number;
    description: string;
    dietery: string;
    available_order_type: availableOrderType[];
    gst_type: string;
    category_id: string;
    business_id: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export type MenuManagementItemAction =
    | {
          type: typeof MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE;
          payload: {
              outlet_id: string;
              item_id: string;
              price: number;
          };
      }
    | {
          type: typeof MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE_SUCCESS;
          payload: { message: string };
      }
    | { type: typeof MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE_ERROR; payload: { error: string } }
    | {
          type: typeof MenuManagementItemActionTypes.REGISTER_ITEM;
          payload: FormData;
      }
    | { type: typeof MenuManagementItemActionTypes.REGISTER_ITEM_SUCCESS; payload: { message: string } }
    | { type: typeof MenuManagementItemActionTypes.REGISTER_ITEM_ERROR; payload: { error: string } }
    | { type: typeof MenuManagementItemActionTypes.UPDATE_ITEM; payload: FormData }
    | { type: typeof MenuManagementItemActionTypes.UPDATE_ITEM_SUCCESS; payload: { message: string } }
    | { type: typeof MenuManagementItemActionTypes.UPDATE_ITEM_ERROR; payload: { error: string } }
    | {
          type: typeof MenuManagementItemActionTypes.DELETE_ITEM;
          payload: {
              item_id: string;
          };
      }
    | { type: typeof MenuManagementItemActionTypes.DELETE_ITEM_SUCCESS; payload: { message: string } }
    | { type: typeof MenuManagementItemActionTypes.DELETE_ITEM_ERROR; payload: { error: string } }
    | {
          type: typeof MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE;
          payload: {
              item_id: string;
              is_active: boolean;
          };
      }
    | { type: typeof MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE_SUCCESS; payload: { message: string } }
    | { type: typeof MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE_ERROR; payload: { error: string } }
    | {
          type: typeof MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE;
          payload: {
              item_id: string;
              outlet_id: string;
              disable_until: string;
              is_active: boolean;
          };
      }
    | { type: typeof MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE_SUCCESS; payload: { message: string } }
    | { type: typeof MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE_ERROR; payload: { error: string } };

export const updateOutletPrice = (outlet_id: string, item_id: string, price: number): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE,
    payload: { outlet_id, item_id, price },
});

export const updateOutletPriceSuccess = (message: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE_SUCCESS,
    payload: { message },
});

export const updateOutletPriceError = (error: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE_ERROR,
    payload: { error },
});

export const registerItem = (data: FormData): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.REGISTER_ITEM,
    payload: data,
});

export const registerItemSuccess = (message: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.REGISTER_ITEM_SUCCESS,
    payload: { message },
});

export const registerItemError = (error: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.REGISTER_ITEM_ERROR,
    payload: { error },
});

export const updateItem = (data: FormData): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.UPDATE_ITEM,
    payload: data,
});

export const updateItemSuccess = (message: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.UPDATE_ITEM_SUCCESS,
    payload: { message },
});

export const updateItemError = (error: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.UPDATE_ITEM_ERROR,
    payload: { error },
});

export const deleteItem = (item_id: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.DELETE_ITEM,
    payload: {
        item_id,
    },
});

export const deleteItemSuccess = (message: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.DELETE_ITEM_SUCCESS,
    payload: { message },
});

export const deleteItemError = (error: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.DELETE_ITEM_ERROR,
    payload: { error },
});

export const itemUpdateIsActive = (item_id: string, is_active: boolean): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE,
    payload: {
        item_id,
        is_active,
    },
});

export const itemUpdateIsActiveSuccess = (message: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE_SUCCESS,
    payload: {
        message,
    },
});

export const itemUpdateIsActiveError = (error: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE_ERROR,
    payload: {
        error,
    },
});

export const itemUpdateDisable = (
    item_id: string,
    outlet_id: string,
    disable_until: string,
    is_active: boolean
): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE,
    payload: {
        item_id,
        outlet_id,
        disable_until,
        is_active,
    },
});

export const itemUpdateDisableSuccess = (message: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE_SUCCESS,
    payload: {
        message,
    },
});

export const itemUpdateDisableError = (error: string): MenuManagementItemAction => ({
    type: MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE_ERROR,
    payload: {
        error,
    },
});
