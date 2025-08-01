import { ReportActionTypes } from './constants';

export type ReportActionType = {
    type:
        | ReportActionTypes.DASHBOARD_EARNING_REPORT
        | ReportActionTypes.DASHBOARD_EARNING_REPORT_SUCCESS
        | ReportActionTypes.DASHBOARD_EARNING_REPORT_ERROR
        | ReportActionTypes.DASHBOARD_SALES_REPORT
        | ReportActionTypes.DASHBOARD_SALES_REPORT_SUCCESS
        | ReportActionTypes.DASHBOARD_SALES_REPORT_ERROR
        | ReportActionTypes.ORDER_REPORT_LIST
        | ReportActionTypes.ORDER_REPORT_LIST_SUCCESS
        | ReportActionTypes.ORDER_REPORT_LIST_ERROR
        | ReportActionTypes.INGREDIENT_REPORT_LIST
        | ReportActionTypes.INGREDIENT_REPORT_LIST_SUCCESS
        | ReportActionTypes.INGREDIENT_REPORT_LIST_ERROR;
};

// ================= TYPES =================

// DASHBOARD EARNING REPORT
export interface DashboardEarningReportPayload {
    business_id: string;
}

export interface SalesReportDetail {
    month: string;
    total_orders: number;
    total_items_sold: number;
    total_amount: string;
}

export interface LastOrderDetail {
    outlet_id: string;
    outlet_name: string | null;
    order_id: string;
    order_time: string;
    amount: string;
}

export interface DashboardEarningReportResponse {
    SalesReportDetails: SalesReportDetail[];
    last_order_details: LastOrderDetail[];
}

// DASHBOARD SALES REPORT
export interface DashboardSalesReportPayload {
    business_id: string;
    // date: string;
}

export interface DashboardSalesReportResponse {
    total_orders: string;
    total_amount: string;
}

// ORDER REPORT
export interface OrderReportPayload {
    start_date: string;
    end_date: string;
    outlet_id: string;
    business_id: string;
}

export interface OrderReportItem {
    date: string;
    total_sales: number;
}

// INGREDIENT REPORT
export interface IngredientReportPayload {
    business_id: string;
    start_date: string;
    end_date: string;
    outlet_id: string;
}

export interface IngredientReportItem {
    ingredient_id: string;
    ingredient_name: string;
    unit: string;
    total_quantity: number;
}

// =============== ACTIONS ==================

// Dashboard Earning Report
export const dashboardEarningReport = (payload: DashboardEarningReportPayload) => ({
    type: ReportActionTypes.DASHBOARD_EARNING_REPORT,
    payload,
});

export const dashboardEarningReportSuccess = (data: DashboardEarningReportResponse) => ({
    type: ReportActionTypes.DASHBOARD_EARNING_REPORT_SUCCESS,
    payload: data,
});

export const dashboardEarningReportError = (error: string) => ({
    type: ReportActionTypes.DASHBOARD_EARNING_REPORT_ERROR,
    payload: error,
});

// Dashboard Sales Report
export const dashboardSalesReport = (business_id: string) => ({
    type: ReportActionTypes.DASHBOARD_SALES_REPORT,
    payload: { business_id },
});

export const dashboardSalesReportSuccess = (data: DashboardSalesReportResponse) => ({
    type: ReportActionTypes.DASHBOARD_SALES_REPORT_SUCCESS,
    payload: data,
});

export const dashboardSalesReportError = (error: string) => ({
    type: ReportActionTypes.DASHBOARD_SALES_REPORT_ERROR,
    payload: error,
});

// Order Report
export const orderReportList = (payload: OrderReportPayload) => ({
    type: ReportActionTypes.ORDER_REPORT_LIST,
    payload,
});

export const orderReportListSuccess = (data: OrderReportItem[]) => ({
    type: ReportActionTypes.ORDER_REPORT_LIST_SUCCESS,
    payload: data,
});

export const orderReportListError = (error: string) => ({
    type: ReportActionTypes.ORDER_REPORT_LIST_ERROR,
    payload: error,
});

// Ingredient Report
export const ingredientReportList = (payload: IngredientReportPayload) => ({
    type: ReportActionTypes.INGREDIENT_REPORT_LIST,
    payload,
});

export const ingredientReportListSuccess = (data: IngredientReportItem[]) => ({
    type: ReportActionTypes.INGREDIENT_REPORT_LIST_SUCCESS,
    payload: data,
});

export const ingredientReportListError = (error: string) => ({
    type: ReportActionTypes.INGREDIENT_REPORT_LIST_ERROR,
    payload: error,
});
