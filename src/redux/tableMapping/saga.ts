import { areaCreate, areaAdd, areaDelete, areaTables, areaUpdate } from '../../helpers/api/auth';
import { all, fork, put, call, takeEvery, take } from 'redux-saga/effects';
import {
    areaCreateSuccess,
    areaAddSuccess,
    areaDeleteSuccess,
    areaTablesSuccess,
    areaUpdateSuccess,
    areaCreateError,
    areaAddError,
    areaDeleteError,
    areaTablesError,
    areaUpdateError,
} from './actions';
import { SagaIterator } from 'redux-saga';
import { TableMappingActionTypes } from './constants';

function* areaCreateSaga(action: any): SagaIterator {
    try {
        const response = yield call(areaCreate, action.payload);
        yield put(areaCreateSuccess(response.data));
    } catch (error: any) {
        yield put(areaCreateError(error || 'Something went wrong'));
    }
}

function* areaDeleteSaga(action: any): SagaIterator {
    try {
        const response = yield call(areaDelete, action.payload);
        yield put(areaDeleteSuccess(response.data));
    } catch (error: any) {
        yield put(areaDeleteError(error || 'Something went wrong'));
    }
}

function* areaUpdateSaga(action: any): SagaIterator {
    try {
        const response = yield call(areaUpdate, action.payload);
        yield put(areaUpdateSuccess(response.data));
    } catch (error: any) {
        yield put(areaUpdateError(error || 'Something went wrong'));
    }
}

function* areaAddSaga(action: any): SagaIterator {
    try {
        const response = yield call(areaAdd, action.payload);
        yield put(areaAddSuccess(response.data));
    } catch (error: any) {
        console.log('saga error:', error);

        yield put(areaAddError(error || 'Something went wrong'));
    }
}

function* areaTablesSaga(action: any): SagaIterator {
    try {
        const response = yield call(areaTables, action.payload);
        yield put(areaTablesSuccess(response.data));
    } catch (error: any) {
        yield put(areaTablesError(error || 'Something went wrong'));
    }
}

function* watchAreaDelete() {
    yield takeEvery(TableMappingActionTypes.AREA_DELETE, areaDeleteSaga);
}
function* watchAreaUpdate() {
    yield takeEvery(TableMappingActionTypes.AREA_UPDATE, areaUpdateSaga);
}
function* watchAreaAdd() {
    yield takeEvery(TableMappingActionTypes.AREA_ADD, areaAddSaga);
}
function* watchAreaCreate() {
    yield takeEvery(TableMappingActionTypes.AREA_CREATE, areaCreateSaga);
}
function* watchAreaTabes() {
    yield takeEvery(TableMappingActionTypes.AREA_TABLES, areaTablesSaga);
}

export default function* tableMappingSaga() {
    yield all([
        fork(watchAreaAdd),
        fork(watchAreaDelete),
        fork(watchAreaUpdate),
        fork(watchAreaCreate),
        fork(watchAreaTabes),
    ]);
}
