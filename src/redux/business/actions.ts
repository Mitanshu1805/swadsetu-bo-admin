import { BusinessActionTypes } from './constants';

export type BusinessActionType = {
    type:
        | BusinessActionTypes.USERS_BUSINESSES
        | BusinessActionTypes.USERS_BUSINESSES_SUCCESS
        | BusinessActionTypes.USERS_BUSINESSES_ERROR
        | BusinessActionTypes.OUTLET_LIST
        | BusinessActionTypes.OUTLET_LIST_SUCCESS
        | BusinessActionTypes.OUTLET_LIST_ERROR;

    payload: {} | string;
};

export const usersBusinesses = (): BusinessActionType => ({
    type: BusinessActionTypes.USERS_BUSINESSES,
    payload: {},
});

export const usersBusinessesSuccess = (message: string): BusinessActionType => ({
    type: BusinessActionTypes.USERS_BUSINESSES_SUCCESS,
    payload: { message },
});

export const usersBusinessesError = (error: string): BusinessActionType => ({
    type: BusinessActionTypes.USERS_BUSINESSES_ERROR,
    payload: { error },
});

export const outletList = (business_id: string, module_key: string): BusinessActionType => ({
    type: BusinessActionTypes.OUTLET_LIST,
    payload: { business_id, module_key },
});

export const outletListSuccess = (message: string): BusinessActionType => ({
    type: BusinessActionTypes.OUTLET_LIST_SUCCESS,
    payload: { message },
});

export const outletListError = (error: string): BusinessActionType => ({
    type: BusinessActionTypes.OUTLET_LIST_ERROR,
    payload: { error },
});
