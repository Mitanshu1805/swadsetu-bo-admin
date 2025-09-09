import { all, fork, put, call, takeEvery } from 'redux-saga/effects';

import { recipeAdd, recipeList, recipeDelete, recipeUpdate } from '../../helpers/api/auth';

import {
    recipeAddSuccess,
    recipeListSuccess,
    recipeDeleteSuccess,
    recipeUpdateSuccess,
    recipeAddError,
    recipeListError,
    recipeDeleteError,
    recipeUpdateError,
} from './actions';

import { RecipeManagementActionTypes } from './constants';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';

function* recipeAddSaga(action: any): SagaIterator {
    try {
        const response = yield call(recipeAdd, action.payload);
        yield put(recipeAddSuccess(response.data.message));
    } catch (error: any) {
        yield put(recipeAddError(error.message || 'Error Occured'));
    }
}

function* recipeDeleteSaga(action: any): SagaIterator {
    try {
        const response = yield call(recipeDelete, action.payload);
        yield put(recipeDeleteSuccess(response.data.message));
    } catch (error: any) {
        yield put(recipeDeleteError(error.message || 'Error Occured'));
    }
}

function* recipeListSaga(action: any): SagaIterator {
    try {
        const response = yield call(recipeList, action.payload);
        const recipe = response?.data?.data;

        yield put(recipeListSuccess(recipe));
    } catch (error: any) {
        yield put(recipeListError(error.message || 'Error Occured'));
    }
}

function* recipeUpdateSaga(action: any): SagaIterator {
    try {
        const response = yield call(recipeUpdate, action.payload);
        yield put(recipeUpdateSuccess(response.data.message));
    } catch (error: any) {
        yield put(recipeUpdateError(error.message || 'Error Occured'));
    }
}

function* watchRecipeAdd() {
    yield takeEvery(RecipeManagementActionTypes.RECIPE_ADD, recipeAddSaga);
}

function* watchRecipeList() {
    yield takeEvery(RecipeManagementActionTypes.RECIPE_LIST, recipeListSaga);
}

function* watchRecipeDelete() {
    yield takeEvery(RecipeManagementActionTypes.RECIPE_DELETE, recipeDeleteSaga);
}

function* watchRecipeUpdate() {
    yield takeEvery(RecipeManagementActionTypes.RECIPE_UPDATE, recipeUpdateSaga);
}

function* recipeManagementSaga() {
    yield all([fork(watchRecipeAdd), fork(watchRecipeDelete), fork(watchRecipeList), fork(watchRecipeUpdate)]);
}

export default recipeManagementSaga;
