import { StaffActionTypes } from './constants';

interface StaffState {
    staffList: any[];
    staffDetails: any | null;
    message: string | null;
    loading: boolean;
    error: any | null;
}

const initialState: StaffState = {
    staffList: [],
    staffDetails: null,
    message: null,
    loading: false,
    error: null,
};

const staffReducer = (state = initialState, action: any): StaffState => {
    switch (action.type) {
        case StaffActionTypes.STAFF_LIST:
        case StaffActionTypes.STAFF_CREATE:
        case StaffActionTypes.STAFF_DELETE:
        case StaffActionTypes.STAFF_UPDATE:
        case StaffActionTypes.STAFF_DETAILS:
        case StaffActionTypes.STAFF_ALLOCATION_UPDATE:
        case StaffActionTypes.STAFF_ATTENDANCE_UPDATE:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case StaffActionTypes.STAFF_LIST_SUCCESS:
            return {
                ...state,
                staffList: action.payload.data,
                loading: false,
                error: null,
            };

        case StaffActionTypes.STAFF_CREATE_SUCCESS:
        case StaffActionTypes.STAFF_DELETE_SUCCESS:
        case StaffActionTypes.STAFF_UPDATE_SUCCESS:
        case StaffActionTypes.STAFF_ATTENDANCE_UPDATE_SUCCESS:
            return {
                ...state,
                message: action.payload.message,
                loading: false,
                error: null,
            };

        case StaffActionTypes.STAFF_DETAILS_SUCCESS:
            return {
                ...state,
                staffDetails: action.payload.data,
                loading: false,
                error: null,
            };

        case StaffActionTypes.STAFF_ALLOCATION_UPDATE_SUCCESS:
            return {
                ...state,
                staffDetails: {
                    ...state.staffDetails,
                    ...action.payload.data,
                },
                loading: false,
                error: null,
            };

        case StaffActionTypes.STAFF_LIST_ERROR:
        case StaffActionTypes.STAFF_CREATE_ERROR:
        case StaffActionTypes.STAFF_DELETE_ERROR:
        case StaffActionTypes.STAFF_UPDATE_ERROR:
        case StaffActionTypes.STAFF_DETAILS_ERROR:
        case StaffActionTypes.STAFF_ALLOCATION_UPDATE_ERROR:
        case StaffActionTypes.STAFF_ATTENDANCE_UPDATE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };

        default:
            return state;
    }
};

export default staffReducer;
