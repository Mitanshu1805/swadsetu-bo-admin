import { ReportActionTypes } from './constants';
import {
    ReportActionType,
    DashboardEarningReportResponse,
    DashboardSalesReportResponse,
    OrderReportItem,
    IngredientReportItem,
} from './actions';

export interface ReportState {
    dashboardEarningReport: {
        loading: boolean;
        data: DashboardEarningReportResponse | null;
        error: string | null;
    };
    dashboardSalesReport: {
        loading: boolean;
        data: DashboardSalesReportResponse | null;
        error: string | null;
    };
    orderReport: {
        loading: boolean;
        data: OrderReportItem[] | null;
        error: string | null;
    };
    ingredientReport: {
        loading: boolean;
        data: IngredientReportItem[] | null;
        error: string | null;
    };
}

const initialState: ReportState = {
    dashboardEarningReport: {
        loading: false,
        data: null,
        error: null,
    },
    dashboardSalesReport: {
        loading: false,
        data: null,
        error: null,
    },
    orderReport: {
        loading: false,
        data: null,
        error: null,
    },
    ingredientReport: {
        loading: false,
        data: null,
        error: null,
    },
};

const reportReducer = (state = initialState, action: any): ReportState => {
    switch (action.type) {
        // Dashboard Earning Report
        case ReportActionTypes.DASHBOARD_EARNING_REPORT:
            return {
                ...state,
                dashboardEarningReport: {
                    ...state.dashboardEarningReport,
                    loading: true,
                    error: null,
                },
            };
        case ReportActionTypes.DASHBOARD_EARNING_REPORT_SUCCESS:
            return {
                ...state,
                dashboardEarningReport: {
                    loading: false,
                    data: action.payload,
                    error: null,
                },
            };
        case ReportActionTypes.DASHBOARD_EARNING_REPORT_ERROR:
            return {
                ...state,
                dashboardEarningReport: {
                    loading: false,
                    data: null,
                    error: action.payload,
                },
            };

        // Dashboard Sales Report
        case ReportActionTypes.DASHBOARD_SALES_REPORT:
            return {
                ...state,
                dashboardSalesReport: {
                    ...state.dashboardSalesReport,
                    loading: true,
                    error: null,
                },
            };
        case ReportActionTypes.DASHBOARD_SALES_REPORT_SUCCESS:
            return {
                ...state,
                dashboardSalesReport: {
                    loading: false,
                    data: action.payload,
                    error: null,
                },
            };
        case ReportActionTypes.DASHBOARD_SALES_REPORT_ERROR:
            return {
                ...state,
                dashboardSalesReport: {
                    loading: false,
                    data: null,
                    error: action.payload,
                },
            };

        // Order Report
        case ReportActionTypes.ORDER_REPORT_LIST:
            return {
                ...state,
                orderReport: {
                    ...state.orderReport,
                    loading: true,
                    error: null,
                },
            };
        case ReportActionTypes.ORDER_REPORT_LIST_SUCCESS:
            return {
                ...state,
                orderReport: {
                    loading: false,
                    data: action.payload,
                    error: null,
                },
            };
        case ReportActionTypes.ORDER_REPORT_LIST_ERROR:
            return {
                ...state,
                orderReport: {
                    loading: false,
                    data: null,
                    error: action.payload,
                },
            };

        // Ingredient Report
        case ReportActionTypes.INGREDIENT_REPORT_LIST:
            return {
                ...state,
                ingredientReport: {
                    ...state.ingredientReport,
                    loading: true,
                    error: null,
                },
            };
        case ReportActionTypes.INGREDIENT_REPORT_LIST_SUCCESS:
            return {
                ...state,
                ingredientReport: {
                    loading: false,
                    data: action.payload,
                    error: null,
                },
            };
        case ReportActionTypes.INGREDIENT_REPORT_LIST_ERROR:
            return {
                ...state,
                ingredientReport: {
                    loading: false,
                    data: null,
                    error: action.payload,
                },
            };

        default:
            return state;
    }
};

export default reportReducer;
