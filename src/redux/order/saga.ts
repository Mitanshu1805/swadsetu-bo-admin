import { orderListSuccess, orderListError, OrderList, OrderManagementAction } from './actions';
import { all, fork, put, call, takeEvery } from 'redux-saga/effects';

import { orderList } from '../../helpers/api/auth';

import { OrderManagementActionTypes } from './constants';
import { SagaIterator } from 'redux-saga';

function* orderListSaga(action: any): SagaIterator {
    try {
        const response = yield call(orderList, action.payload);
        yield put(orderListSuccess(response.data.message));
    } catch (error: any) {
        yield put(orderListError(error || 'Something went wrong'));
    }
}

function* watchOrderList() {
    yield takeEvery(OrderManagementActionTypes.ORDER_LIST, orderListSaga);
}

export default function* orderManagementSaga() {
    yield all([fork(watchOrderList)]);
}
