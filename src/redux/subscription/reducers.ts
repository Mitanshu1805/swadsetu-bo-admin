import { error } from 'console';
import { messages } from '../../pages/dashboards/DashBoard1/data';
// import { SubscriptionRestrictedList } from './actions';
import { SubscriptionActionTypes } from './constants';

interface SubState {
    subscriptionRestrictedList: any[];
    message: string;
    error: any | null;
    loading: boolean;
}

const initiaLState: any = {
    subscriptionRestrictedList: [],
    message: null,
    error: null,
    loading: false,
};

const subscriptionRestrictedReducer = (state = initiaLState, action: any): SubState => {
    switch (action.type) {
        case SubscriptionActionTypes.SUB_RESTRICTED:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case SubscriptionActionTypes.SUB_RESTRICTED_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        case SubscriptionActionTypes.SUB_RESTRICTED_SUCCESS:
            return {
                ...state,
                SubscriptionRestrictedList: action.payload.data,
                loading: false,
                error: null,
            };

        default:
            return state;
    }
};

export default subscriptionRestrictedReducer;
