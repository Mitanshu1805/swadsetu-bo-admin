import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { TerminalActionTypes } from './constants';
import {
    terminalListSuccess,
    terminalListError,
    terminalCreateSuccess,
    terminalCreateError,
    terminalDeleteError,
    terminalDeleteSuccess,
    terminalUpdateError,
    terminalUpdateSuccess,
} from './actions';

import { SagaIterator } from 'redux-saga';
import { terminalDelete, terminalUpdate, terminalCreate, terminalList } from '../../helpers/api/auth';
import { Route, useNavigate } from 'react-router-dom';

function* terminalListSaga(action: any): SagaIterator {
    try {
        const response = yield call(terminalList, action.payload);

        if (response.data?.data) {
            const terminals = response.data.data;

            yield put(terminalListSuccess(terminals));
        } else {
            yield put(terminalListError('No terminals found.'));
        }
    } catch (error: any) {
        yield put(terminalListError(error || 'Something went wrong'));
    }
}

function* terminalCreateSaga(action: any): SagaIterator {
    try {
        const response = yield call(terminalCreate, action.payload);
        if (response.data?.data) {
            yield put(terminalCreateSuccess(response.data.data));
        } else {
            yield put(terminalCreateError('Terminal creation failed.'));
        }
    } catch (error: any) {
        yield put(terminalCreateError(error || 'Something went wrong'));
    }
}

// UPDATE TERMINAL
function* terminalUpdateSaga(action: any): SagaIterator {
    try {
        const response = yield call(terminalUpdate, action.payload?.data);
        if (response.data?.message) {
            yield put(terminalUpdateSuccess(response.data.message));
        } else {
            yield put(terminalUpdateError('Terminal update failed.'));
        }
    } catch (error: any) {
        yield put(terminalUpdateError(error.message || 'Something went wrong'));
    }
}

// DELETE TERMINAL
function* terminalDeleteSaga(action: any): SagaIterator {
    try {
        const response = yield call(terminalDelete, action.payload);
        if (response.data?.message) {
            yield put(terminalDeleteSuccess(response.data.message));
        } else {
            yield put(terminalDeleteError('Terminal deletion failed.'));
        }
    } catch (error: any) {
        yield put(terminalDeleteError(error.message || 'Something went wrong'));
    }
}

// WATCHER
export function* watchTerminal(): SagaIterator {
    yield takeEvery(TerminalActionTypes.TERMINAL_LIST, terminalListSaga);
    yield takeEvery(TerminalActionTypes.TERMINAL_CREATE, terminalCreateSaga);
    yield takeEvery(TerminalActionTypes.TERMINAL_UPDATE, terminalUpdateSaga);
    yield takeEvery(TerminalActionTypes.TERMINAL_DELETE, terminalDeleteSaga);
}

// ROOT
export default function* rootSaga(): SagaIterator {
    yield all([fork(watchTerminal)]);
}
