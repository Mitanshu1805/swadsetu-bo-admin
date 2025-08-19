import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { StaffActionTypes } from './constants';

import {
    staffListSuccess,
    staffDetailsSuccess,
    staffUpdateSuccess,
    staffDeleteSuccess,
    staffRegisterSuccess,
    staffAllocationUpdateSuccess,
    staffAttendanceUpdateSuccess,
    staffListError,
    staffDetailsError,
    staffUpdateError,
    staffDeleteError,
    staffRegisterError,
    staffAllocationUpdateError,
    staffAttendanceUpdateError,
} from './actions';

import { SagaIterator } from 'redux-saga';
import {
    staffList,
    staffDelete,
    staffUpdate,
    staffDetails,
    staffRegister,
    staffAllocationUpdate,
    staffAttendanceUpdate,
} from '../../helpers/api/auth';

/**
 * Staff List Saga
 */
function* staffListSaga(action: any): SagaIterator {
    try {
        const response = yield call(staffList, action.payload.data);
        if (response?.data?.data) {
            yield put(staffListSuccess(response.data.data));
        } else {
            yield put(staffListError('No staff found'));
        }
    } catch (error: any) {
        yield put(staffListError(error || 'Something went wrong'));
    }
}

/**
 * Staff Register Saga
 */
function* staffRegisterSaga(action: any): SagaIterator {
    try {
        const response = yield call(staffRegister, action.payload.data);
        if (response?.data?.message) {
            yield put(staffRegisterSuccess(response.data.message));
        } else {
            yield put(staffRegisterError('Failed to register staff'));
        }
    } catch (error: any) {
        yield put(staffRegisterError(error.message || 'Something went wrong'));
    }
}

/**
 * Staff Update Saga
 */
function* staffUpdateSaga(action: any): SagaIterator {
    try {
        const response = yield call(staffUpdate, action.payload.data);
        if (response?.data?.message) {
            yield put(staffUpdateSuccess(response.data.message));
        } else {
            yield put(staffUpdateError('Failed to update staff'));
        }
    } catch (error: any) {
        yield put(staffUpdateError(error.message || 'Something went wrong'));
    }
}

/**
 * Staff Delete Saga
 */
function* staffDeleteSaga(action: any): SagaIterator {
    try {
        const response = yield call(staffDelete, action.payload.data);
        if (response?.data?.message) {
            yield put(staffDeleteSuccess(response.data.message));
        } else {
            yield put(staffDeleteError('Failed to delete staff'));
        }
    } catch (error: any) {
        yield put(staffDeleteError(error.message || 'Something went wrong'));
    }
}

/**
 * Staff Details Saga
 */
function* staffDetailsSaga(action: any): SagaIterator {
    try {
        const response = yield call(staffDetails, action.payload.data);
        if (response?.data?.data) {
            yield put(staffDetailsSuccess(response.data.data));
        } else {
            yield put(staffDetailsError('No staff details found'));
        }
    } catch (error: any) {
        yield put(staffDetailsError(error.message || 'Something went wrong'));
    }
}

/**
 * Staff Allocation Update Saga
 */
function* staffAllocationUpdateSaga(action: any): SagaIterator {
    try {
        const response = yield call(staffAllocationUpdate, action.payload.data);
        if (response?.data?.data) {
            yield put(staffAllocationUpdateSuccess(response.data.data));
        } else {
            yield put(staffAllocationUpdateError('Failed to update allocation'));
        }
    } catch (error: any) {
        yield put(staffAllocationUpdateError(error.message || 'Something went wrong'));
    }
}

function* staffAttendanceUpdateSaga(action: any): SagaIterator {
    try {
        const response = yield call(staffAttendanceUpdate, action.payload.data);
        if (response?.data?.data) {
            yield put(staffAttendanceUpdateSuccess(response.data.data));
        } else {
            yield put(staffAttendanceUpdateError('Failed to update allocation'));
        }
    } catch (error: any) {
        yield put(staffAttendanceUpdateError(error.message || 'Something went wrong'));
    }
}

/**
 * Watcher Sagas
 */
function* watchStaffList() {
    yield takeEvery(StaffActionTypes.STAFF_LIST, staffListSaga);
}

function* watchStaffRegister() {
    yield takeEvery(StaffActionTypes.STAFF_CREATE, staffRegisterSaga);
}

function* watchStaffUpdate() {
    yield takeEvery(StaffActionTypes.STAFF_UPDATE, staffUpdateSaga);
}

function* watchStaffDelete() {
    yield takeEvery(StaffActionTypes.STAFF_DELETE, staffDeleteSaga);
}

function* watchStaffDetails() {
    yield takeEvery(StaffActionTypes.STAFF_DETAILS, staffDetailsSaga);
}

function* watchStaffAllocationUpdate() {
    yield takeEvery(StaffActionTypes.STAFF_ALLOCATION_UPDATE, staffAllocationUpdateSaga);
}

function* watchStaffAttendanceUpdate() {
    yield takeEvery(StaffActionTypes.STAFF_ATTENDANCE_UPDATE, staffAttendanceUpdateSaga);
}

/**
 * Root Saga
 */
function* staffSaga(): SagaIterator {
    yield all([
        fork(watchStaffList),
        fork(watchStaffRegister),
        fork(watchStaffUpdate),
        fork(watchStaffDelete),
        fork(watchStaffDetails),
        fork(watchStaffAllocationUpdate),
        fork(watchStaffAttendanceUpdate),
    ]);
}

export default staffSaga;
