import { SubscriptionActionTypes } from './constants';

export const subscriptionRestrictedList = (business_id: string) => ({
    type: SubscriptionActionTypes.SUB_RESTRICTED,
    payload: { business_id },
});

export const subscriptionRestrictedListSuccess = (message: string) => ({
    type: SubscriptionActionTypes.SUB_RESTRICTED_SUCCESS,
    payload: { message },
});

export const subscriptionRestrictedListError = (error: string) => ({
    type: SubscriptionActionTypes.SUB_RESTRICTED_ERROR,
    payload: { error },
});
