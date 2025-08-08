import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import {
    updateOutletPrice,
    registerItem,
    updateItem,
    deleteItem,
    itemUpdateIsActive,
    itemUpdateDisable,
} from '../../helpers/api/auth';

import {
    updateOutletPriceSuccess,
    updateOutletPriceError,
    registerItemSuccess,
    registerItemError,
    updateItemSuccess,
    updateItemError,
    deleteItemSuccess,
    deleteItemError,
    itemUpdateIsActiveSuccess,
    itemUpdateIsActiveError,
    itemUpdateDisableSuccess,
    itemUpdateDisableError,
} from './actions';

import { MenuManagementItemActionTypes } from './constants';
import { SagaIterator } from '@redux-saga/core';
import { AxiosResponse } from 'axios';

function* updateOutletPriceSaga(action: any): SagaIterator {
    try {
        const response = yield call(updateOutletPrice, action.payload);
        yield put(updateOutletPriceSuccess(response.data.message));
    } catch (error: any) {
        yield put(updateOutletPriceError(error.message || 'Error Occured'));
    }
}

function* registerItemSaga(action: any): SagaIterator {
    try {
        console.log('Saga received action:', action);
        const response = yield call(registerItem, action.payload);
        console.log('API response:', response);

        yield put(registerItemSuccess(response.data.message));
    } catch (error: any) {
        yield put(registerItemError(error.message || 'Error Occured'));
    }
}

function* updateItemSaga(action: any): SagaIterator {
    try {
        const response = yield call(updateItem, action.payload);
        yield put(updateItemSuccess(response.data.message));
    } catch (error: any) {
        yield put(updateItemError(error.message || 'Error Occured'));
    }
}

function* deleteItemSaga(action: any): SagaIterator {
    try {
        const response = yield call(deleteItem, action.payload);
        yield put(deleteItemSuccess(response.data.message));
    } catch (error: any) {
        yield put(deleteItemError(error.message || 'Error Occured'));
    }
}

function* itemUpdateIsActiveSaga(action: any): SagaIterator {
    try {
        const response = yield call(itemUpdateIsActive, action.payload);
        yield put(itemUpdateIsActiveSuccess(response.data.message));
    } catch (error: any) {
        yield put(itemUpdateIsActiveError(error.message || 'Error Occured'));
    }
}

function* itemUpdateDisableSaga(action: any): SagaIterator {
    try {
        const response = yield call(itemUpdateDisable, action.payload);
        yield put(itemUpdateDisableSuccess(response.data.message));
    } catch (error: any) {
        yield put(itemUpdateDisableError(error.message || 'Error Occured'));
    }
}

function* watchUpdateOutletPrice() {
    yield takeEvery(MenuManagementItemActionTypes.UPDATE_OUTLET_PRICE, updateOutletPriceSaga);
}

function* watchRegisterItem() {
    yield takeEvery(MenuManagementItemActionTypes.REGISTER_ITEM, registerItemSaga);
}

function* watchUpdateItem() {
    yield takeEvery(MenuManagementItemActionTypes.UPDATE_ITEM, updateItemSaga);
}

function* watchDeleteItem() {
    yield takeEvery(MenuManagementItemActionTypes.DELETE_ITEM, deleteItemSaga);
}

function* watchItemUpdateIsActive() {
    yield takeEvery(MenuManagementItemActionTypes.ITEM_UPDATE_ISACTIVE, itemUpdateIsActiveSaga);
}

function* watchItemUpdateDisable() {
    yield takeEvery(MenuManagementItemActionTypes.ITEM_UPDATE_DISABLE, itemUpdateDisableSaga);
}

function* menuManagementItemSaga() {
    console.log('rootSaga is running!');
    yield all([
        fork(watchUpdateOutletPrice),
        fork(watchRegisterItem),
        fork(watchUpdateItem),
        fork(watchDeleteItem),
        fork(watchItemUpdateIsActive),
        fork(watchItemUpdateDisable),
    ]);
}

export default menuManagementItemSaga;
