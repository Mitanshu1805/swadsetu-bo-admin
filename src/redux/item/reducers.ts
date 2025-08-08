import { MenuManagementItemActionTypes } from './constants';

type State = {
    items: any[]; // Replace `any` with the appropriate type for items
    error: string | null;
    loading: boolean;
    message: string | null;
};

const initialState: State = {
    items: [],
    error: null,
    loading: false,
    message: null,
};

type MenuManagementItemActions =
    | { type: typeof MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE }
    | {
          type: typeof MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE_SUCCESS;
          payload: {
              outlet_id: string;
              item_id: string;
              price: number;
          };
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

const MenuManagementItemReducer = (state = initialState, action: MenuManagementItemActions): State => {
    switch (action.type) {
        case MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.map((item) =>
                    item.item_id === action.payload.item_id
                        ? {
                              ...item,
                              outlet_prices: item.outlet_prices.map((price: any) =>
                                  price.outlet_id === action.payload.outlet_id
                                      ? { ...price, price: action.payload.price }
                                      : price
                              ),
                          }
                        : item
                ),
            };

        case MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementItemActionTypes.REGISTER_ITEM:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementItemActionTypes.REGISTER_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            };

        case MenuManagementItemActionTypes.REGISTER_ITEM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementItemActionTypes.UPDATE_ITEM:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementItemActionTypes.UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
            };

        case MenuManagementItemActionTypes.UPDATE_ITEM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementItemActionTypes.DELETE_ITEM:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementItemActionTypes.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.filter((item) => item.item_id !== action.payload),
                message: action.payload.message,
            };

        case MenuManagementItemActionTypes.DELETE_ITEM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.map((item) =>
                    item.item_id === action.payload ? { ...item, is_active: action.payload } : item
                ),
                message: action.payload.message,
            };

        case MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: state.items.map((item) =>
                    item.item_id === action.payload
                        ? {
                              ...item,
                              disable_until: action.payload,
                              is_active: action.payload,
                          }
                        : item
                ),
                message: action.payload.message,
            };

        case MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        default:
            return state;
    }
};

export default MenuManagementItemReducer;
