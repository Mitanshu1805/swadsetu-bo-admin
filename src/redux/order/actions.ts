import { MenuManagementCategoryAction } from '../actions';
import { MenuManagementCategoryActionTypes } from '../menu/constants';
import { OrderManagementActionTypes } from './constants';

export interface OrderList {
    date: string;
    business_id: string;
    outlet_id: string;
    page: number;
}

export type OrderManagementAction =
    | {
          type: typeof OrderManagementActionTypes.ORDER_LIST;
          payload: OrderList;
      }
    | {
          type: typeof OrderManagementActionTypes.ORDER_LIST_SUCCESS;
          payload: any;
      }
    | {
          type: typeof OrderManagementActionTypes.ORDER_LIST_ERROR;
          payload: { error: string };
      };

export const orderList = (data: OrderList): OrderManagementAction => ({
    type: OrderManagementActionTypes.ORDER_LIST,
    payload: data,
});
export const orderListSuccess = (data: any): OrderManagementAction => ({
    type: OrderManagementActionTypes.ORDER_LIST_SUCCESS,
    payload: data,
});
export const orderListError = (error: string): OrderManagementAction => ({
    type: OrderManagementActionTypes.ORDER_LIST_ERROR,
    payload: { error },
});
