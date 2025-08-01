import { BusinessActionType } from './actions';
import { BusinessActionTypes } from './constants';

type BusinessDetails = {
    business_id: string;
    business_name: string;
    equity_percentage: string;
};

type OutletList = {
    outlet_id: string;
    outlet_name: string;
    outlet_type: string;
    outlet_address: string;
    gst_no: string;
    business_id: string;
    language_id: string;
    currency: string;
};

type Businesses = {
    count: number;
    list: BusinessDetails[];
};

type State = {
    loading: boolean;
    error: string | null;
    message: string | null;
    businesses: Businesses;
    outlets: OutletList[];
};

const INIT_STAT: State = {
    loading: false,
    error: null,
    message: null,
    businesses: {
        count: 0,
        list: [],
    },
    outlets: [],
};

const Businesses = (state: State = INIT_STAT, action: BusinessActionType): State => {
    switch (action.type) {
        case BusinessActionTypes.USERS_BUSINESSES:
            return {
                ...state,
                loading: true,
                error: null,
                message: null,
            };

        case BusinessActionTypes.USERS_BUSINESSES_SUCCESS:
            console.log('API Response payload:', action.payload); // Keep this for now

            const payload = action.payload as any;

            return {
                ...state,
                loading: false,
                businesses: payload.message, // This is correct - the businesses data is in payload.message
                message: 'Businesses loaded successfully', // Set your own success message
            };

        case BusinessActionTypes.USERS_BUSINESSES_ERROR:
            return {
                ...state,
                loading: false,
                error: (action.payload as any).error || 'Something went wrong',
            };

        case BusinessActionTypes.OUTLET_LIST:
            return {
                ...state,
                loading: true,
                error: null,
                message: null,
            };

        case BusinessActionTypes.OUTLET_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                outlets: (action.payload as any).message, // expecting an array of outlets
                message: 'Outlets loaded successfully',
            };

        case BusinessActionTypes.OUTLET_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: (action.payload as any).error || 'Something went wrong while loading outlets',
            };

        default:
            return state;
    }
};

export default Businesses;
