import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import businesses from './business/saga';
import terminal from './terminal/saga';
import report from './report/saga';
import staff from './staff/saga';
import menu from './menu/saga';
import item from './item/saga';
import recipe from './recipe/saga';
import recipeIngredients from './recipeIngredients/saga';
import orderManagementSaga from './order/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        layoutSaga(),
        businesses(),
        terminal(),
        report(),
        staff(),
        menu(),
        item(),
        recipe(),
        recipeIngredients(),
        orderManagementSaga(),
    ]);
}
