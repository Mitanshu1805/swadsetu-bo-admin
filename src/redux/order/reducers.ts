import { OrderManagementAction, OrderList } from './actions';
import { OrderManagementActionTypes } from './constants';

// 1️⃣ Define state interface
export interface OrderManagementState {
    orders: any[]; // you can type this more specifically if you know the structure
    loading: boolean;
    error: string | null;
    filters: OrderList | null; // store current filter params if needed
}

// 2️⃣ Initial state
const initialState: OrderManagementState = {
    orders: [],
    loading: false,
    error: null,
    filters: null,
};

// 3️⃣ Reducer function
const OrderManagementReducer = (state = initialState, action: OrderManagementAction): OrderManagementState => {
    switch (action.type) {
        case OrderManagementActionTypes.ORDER_LIST:
            return {
                ...state,
                loading: true,
                error: null,
                filters: action.payload, // save current filter params
            };
        case OrderManagementActionTypes.ORDER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            };
        case OrderManagementActionTypes.ORDER_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default OrderManagementReducer;
