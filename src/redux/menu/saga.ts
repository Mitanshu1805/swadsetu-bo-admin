import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import {
    categoryUpdateDisable,
    categoryOutletLists,
    categoryRegister,
    categoryDelete,
    categoryUpdate,
    categoryItemList,
    categoryUpdateIsActive,
} from '../../helpers/api/auth';

import {
    categoryUpdateDisableSuccess,
    categoryUpdateDisableError,
    registerCategorySuccess,
    registerCategoryError,
    deleteCategorySuccess,
    deleteCategoryError,
    updateCategorySuccess,
    updateCategoryError,
    categoryUpdateIsActiveSuccess,
    categoryUpdateIsActiveError,
    categoryOutletListsSuccess,
    categoryOutletListsError,
    categoryItemListSuccess,
    categoryItemListError,
} from './actions';

import { MenuManagementCategoryActionTypes } from './constants';
import { SagaIterator } from 'redux-saga';

function* categoryUpdateDisableSaga(action: any): SagaIterator {
    try {
        const response = yield call(categoryUpdateDisable, action.payload);
        yield put(categoryUpdateDisableSuccess(response.data.message));
    } catch (error: any) {
        yield put(categoryUpdateDisableError(error.message || 'Error Occured'));
    }
}

function* categoryOutletListsSaga(action: any): SagaIterator {
    try {
        const response = yield call(categoryOutletLists, action.payload);
        yield put(categoryOutletListsSuccess(response.data.message));
    } catch (error: any) {
        yield put(categoryOutletListsError(error.message || 'Error Occured'));
    }
}

function* categoryRegisterSaga(action: any): SagaIterator {
    try {
        const response = yield call(categoryRegister, action.payload);
        yield put(registerCategorySuccess(response.data.message));
    } catch (error: any) {
        yield put(registerCategoryError(error.message || 'Error Occured'));
    }
}

function* categoryDeleteSaga(action: any): SagaIterator {
    try {
        const response = yield call(categoryDelete, action.payload);
        yield put(deleteCategorySuccess(response.data.message));
    } catch (error: any) {
        yield put(deleteCategoryError(error.message || 'Error Occured'));
    }
}

function* categoryUpdateSaga(action: any): SagaIterator {
    try {
        const response = yield call(categoryUpdate, action.payload);
        yield put(updateCategorySuccess(response.data.message));
    } catch (error: any) {
        yield put(updateCategoryError(error.message || 'Error Occured'));
    }
}

function* categoryItemListSaga(action: any): SagaIterator {
    try {
        console.log('we are here');

        const response = yield call(categoryItemList, action.payload);


        if (response.data && Array.isArray(response.data.data)) {
            
            yield put(categoryItemListSuccess(response.data.data, response.data.message));
            
        } else {
            yield put(categoryItemListError('No categories found'));
        }
    } catch (error: any) {
        console.error('API Error: ', error);
        yield put(categoryItemListError(error.message || 'Error Occurred'));
    }
}

// function* categoryItemListSaga(action: any): SagaIterator {
//     try {
//         const { business_id } = action.payload; // Ensure payload contains business_id
//         const response = yield call(categoryItemList, business_id); // `categoryItemListApi` should be your API call function
//         yield put(categoryItemListSuccess(response.data.message));
//     } catch (error: any) {
//         yield put(categoryItemListError(error.message || 'Error Occurred'));
//     }
// }

function* categoryUpdateIsActiveSaga(action: any): SagaIterator {
    try {
        const response = yield call(categoryUpdateIsActive, action.payload);
        yield put(categoryUpdateIsActiveSuccess(response.data.message));
    } catch (error: any) {
        yield put(categoryUpdateIsActiveError(error.message || 'Error Occured'));
    }
}

function* watchCategoryUpdateDisable() {
    yield takeEvery(MenuManagementCategoryActionTypes.CATEGORY_UPDATE_DISABLE, categoryUpdateDisableSaga);
}

function* watchCategoryOutletLists() {
    yield takeEvery(MenuManagementCategoryActionTypes.CATEGORY_OUTLET_LISTS, categoryOutletListsSaga);
}

function* watchCategoryRegister() {
    yield takeEvery(MenuManagementCategoryActionTypes.REGISTER_CATEGORY, categoryRegisterSaga);
}

function* watchCategoryDelete() {
    yield takeEvery(MenuManagementCategoryActionTypes.DELETE_CATEGORY, categoryDeleteSaga);
}

function* watchCategoryUpdate() {
    yield takeEvery(MenuManagementCategoryActionTypes.UPDATE_CATEGORY, categoryUpdateSaga);
}

function* watchCategoryItemList() {
    yield takeEvery(MenuManagementCategoryActionTypes.CATEGORY_ITEM_LIST, categoryItemListSaga);
}

function* watchCategoryUpdateIsActive() {
    yield takeEvery(MenuManagementCategoryActionTypes.CATEGORY_UPDATE_ISACTIVE, categoryUpdateIsActiveSaga);
}

export default function* MenuManagementCategorySaga() {
    yield all([
        fork(watchCategoryUpdateDisable),
        fork(watchCategoryOutletLists),
        fork(watchCategoryRegister),
        fork(watchCategoryDelete),
        fork(watchCategoryUpdate),
        fork(watchCategoryItemList),
        fork(watchCategoryUpdateIsActive),
    ]);
}
