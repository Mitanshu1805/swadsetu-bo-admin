import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { ReportActionTypes } from './constants';
import {
    dashboardEarningReportSuccess,
    dashboardEarningReportError,
    dashboardSalesReportSuccess,
    dashboardSalesReportError,
    orderReportListSuccess,
    orderReportListError,
    ingredientReportListSuccess,
    ingredientReportListError,
} from './actions';

import {
    dashboardEarningReport,
    dashboardSalesReport,
    ingredientReportList,
    orderReportList,
} from '../../helpers/api/auth';

import {
    DashboardEarningReportPayload,
    DashboardSalesReportPayload,
    OrderReportPayload,
    IngredientReportPayload,
} from './actions';
import { SagaIterator } from 'redux-saga';

// ========== Worker Sagas ==========

function* dashboardEarningReportSaga(action: any): SagaIterator {
    try {
        const response = yield call(dashboardEarningReport, action.payload);
        yield put(dashboardEarningReportSuccess(response));
    } catch (error: any) {
        yield put(dashboardEarningReportError(error.message || 'Something went wrong'));
    }
}

function* dashboardSalesReportSaga(action: any): SagaIterator {
    try {
        console.log(action);

        const response = yield call(dashboardSalesReport, action.payload);
        yield put(dashboardSalesReportSuccess(response));
    } catch (error: any) {
        yield put(dashboardSalesReportError(error.message || 'Something went wrong'));
    }
}

function* ingredientReportListSaga(action: any): SagaIterator {
    try {
        const response = yield call(ingredientReportList, action.payload);
        yield put(ingredientReportListSuccess(response));
    } catch (error: any) {
        yield put(ingredientReportListError(error.message || 'Something went wrong'));
    }
}

function* orderReportListSaga(action: any): SagaIterator {
    try {
        const response = yield call(orderReportList, action.payload);
        yield put(orderReportListSuccess(response));
    } catch (error: any) {
        yield put(orderReportListError(error.message || 'Something went wrong'));
    }
}

// ========== Watcher Sagas ==========

function* watchDashboardEarningReport() {
    yield takeLatest(ReportActionTypes.DASHBOARD_EARNING_REPORT, dashboardEarningReportSaga);
}

function* watchDashboardSalesReport() {
    yield takeLatest(ReportActionTypes.DASHBOARD_SALES_REPORT, dashboardSalesReportSaga);
}

function* watchOrderReportList() {
    yield takeLatest(ReportActionTypes.ORDER_REPORT_LIST, orderReportListSaga);
}

function* watchIngredientReportList() {
    yield takeLatest(ReportActionTypes.INGREDIENT_REPORT_LIST, ingredientReportListSaga);
}

// ========== Root Saga ==========

export default function* reportSaga() {
    yield all([
        fork(watchDashboardEarningReport),
        fork(watchDashboardSalesReport),
        fork(watchOrderReportList),
        fork(watchIngredientReportList),
    ]);
}
