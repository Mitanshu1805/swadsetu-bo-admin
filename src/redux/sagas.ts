import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import businesses from './business/saga';
import terminal from './terminal/saga';
import report from './report/saga';

export default function* rootSaga() {
    yield all([authSaga(), layoutSaga(), businesses(), terminal(), report()]);
}
