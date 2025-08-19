import { all, fork, put, call, takeEvery } from 'redux-saga/effects';

import {
    recipeIngredientAdd,
    recipeIngredientDelete,
    recipeIngredientList,
    recipeIngredientUpdateStatus,
    recipeIngredientUpdate,
} from '../../helpers/api/auth';

import {
    recipeIngredientAddSuccess,
    recipeIngredientDeleteSuccess,
    recipeIngredientListSuccess,
    recipeIngredientUpdateStatusSuccess,
    recipeIngredientAddError,
    recipeIngredientDeleteError,
    recipeIngredientListError,
    recipeIngredientUpdateStatusError,
    recipeIngredientUpdateSuccess,
    recipeIngredientUpdateError,
} from './actions';

import { RecipeIngredientsManagementActionTypes } from './constants';
import { SagaIterator } from 'redux-saga';
import { AxiosResponse } from 'axios';

function* recipeIngredientAddSaga(action: any): SagaIterator {
    try {
        const response = yield call(recipeIngredientAdd, action.payload);
        yield put(recipeIngredientAddSuccess(response.data.message));
    } catch (error: any) {
        yield put(recipeIngredientAddError(error.message || 'Error Occured'));
    }
}

function* recipeIngredientDeleteSaga(action: any): SagaIterator {
    try {
        const response = yield call(recipeIngredientDelete, action.payload);
        yield put(recipeIngredientDeleteSuccess(response.data.message));
    } catch (error: any) {
        yield put(recipeIngredientDeleteError(error.message || 'Error Occured'));
    }
}

function* recipeIngredientListSaga(action: any): SagaIterator {
    try {
        const response = yield call(recipeIngredientList, action.payload);
        yield put(recipeIngredientListSuccess(response.data.data, response.data.message));
    } catch (error: any) {
        yield put(recipeIngredientListError(error || 'Error Occured'));
    }
}

function* recipeIngredientUpdateStatusSaga(action: any): SagaIterator {
    try {
        const response = yield call(recipeIngredientUpdateStatus, action.payload);
        yield put(recipeIngredientUpdateStatusSuccess(response.data.message));
    } catch (error: any) {
        yield put(recipeIngredientUpdateStatusError(error.message || 'Error Occured'));
    }
}

function* recipeIngredientUpdateSaga(action: any): SagaIterator {
    try {
        const response: AxiosResponse = yield call(recipeIngredientUpdate, action.payload);
        yield put(recipeIngredientUpdateSuccess(response.data.ingredient)); // Assuming API returns updated ingredient
    } catch (error: any) {
        yield put(recipeIngredientUpdateError(error.message || 'Error Occurred'));
    }
}

function* watchRecipeIngredientDelete() {
    yield takeEvery(RecipeIngredientsManagementActionTypes.RECIPE_INGREDIENT_DELETE, recipeIngredientDeleteSaga);
}

function* watchRecipeIngredientList() {
    yield takeEvery(RecipeIngredientsManagementActionTypes.RECIPE_INGREDIENT_LIST, recipeIngredientListSaga);
}
function* watchRecipeIngredientAdd() {
    yield takeEvery(RecipeIngredientsManagementActionTypes.RECIPE_INGREDIENT_ADD, recipeIngredientAddSaga);
}
function* watchRecipeIngredientUpdateStatus() {
    yield takeEvery(
        RecipeIngredientsManagementActionTypes.RECIPE_INGREDIENT_UPDATE_STATUS,
        recipeIngredientUpdateStatusSaga
    );
}
function* watchRecipeIngredientUpdate() {
    yield takeEvery(RecipeIngredientsManagementActionTypes.RECIPE_INGREDIENT_UPDATE, recipeIngredientUpdateSaga);
}

function* recipeIngredientManagementSaga() {
    yield all([
        fork(watchRecipeIngredientAdd),
        fork(watchRecipeIngredientList),
        fork(watchRecipeIngredientDelete),
        fork(watchRecipeIngredientUpdateStatus),
        fork(watchRecipeIngredientUpdate),
    ]);
}

export default recipeIngredientManagementSaga;
