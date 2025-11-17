import {
    // SubscriptionRestrictedList,
    subscriptionRestrictedListSuccess,
    subscriptionRestrictedListError,
} from './actions';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { SubscriptionActionTypes } from './constants';
import { SagaIterator } from 'redux-saga';
import { subscriptionRestrictedList } from '../../helpers/api/auth';

function* subscriptionRestrictedListSaga(action: any): SagaIterator {
    try {
        console.log(action);

        const response = yield call(subscriptionRestrictedList, action.payload);
        if (response?.data?.data) {
            yield put(subscriptionRestrictedListSuccess(response?.data?.data));
        } else {
            yield put(subscriptionRestrictedListError('Something wrong'));
        }
    } catch (error: any) {
        yield put(subscriptionRestrictedListError(error || 'Something wrong'));
    }
}

function* watchSubscriptionRestrictedList() {
    yield takeEvery(SubscriptionActionTypes.SUB_RESTRICTED, subscriptionRestrictedListSaga);
}

function* subscriptionRestrictedSaga(): SagaIterator {
    yield all([fork(watchSubscriptionRestrictedList)]);
}

export default subscriptionRestrictedSaga;
