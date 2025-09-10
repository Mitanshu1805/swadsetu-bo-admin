import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { BusinessActionTypes } from './constants';
import { usersBusinessesSuccess, usersBusinessesError, outletListSuccess, outletListError } from './actions';

import { SagaIterator } from 'redux-saga';
import { usersBusinesses, outletList } from '../../helpers/api/auth';
import { Route, useNavigate } from 'react-router-dom';

const navigate = useNavigate;

function* usersBusinessesSaga(): SagaIterator {
    try {
        const response = yield call(usersBusinesses);
        if (response.data?.data) {
            const businesses = response.data.data;
            const selected_business = businesses.list[0];
            if (businesses.count == 1) {
                localStorage.setItem('selected_business', JSON.stringify(selected_business));
            }
            yield put(usersBusinessesSuccess(businesses));
        } else {
            yield put(usersBusinessesError('No businesses found.'));
        }
    } catch (error: any) {
        yield put(usersBusinessesError(error.message || 'Something went wrong'));
    }
}

function* outletListSaga(action: any): SagaIterator {
    try {
        const response = yield call(outletList, action.payload);
        if (response.data?.data) {
            const outlets = response.data.data;

            yield put(outletListSuccess(outlets));
        } else {
            yield put(outletListError('No outlets found.'));
        }
    } catch (error: any) {
        yield put(outletListError(error.message || 'Something went wrong'));
    }
}

function* watchUserBusinesses() {
    yield takeEvery(BusinessActionTypes.USERS_BUSINESSES, usersBusinessesSaga);
}

function* watchOutletList() {
    yield takeEvery(BusinessActionTypes.OUTLET_LIST, outletListSaga);
}

export default function* rootSaga() {
    yield all([fork(watchUserBusinesses), fork(watchOutletList)]);
}
