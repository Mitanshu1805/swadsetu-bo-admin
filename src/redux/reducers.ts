import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import PageTitle from './pageTitle/reducers';
import Businesses from './business/reducers';
import Terminal from './terminal/reducers';
import Report from './report/reducers';

export default combineReducers({
    Auth,
    Layout,
    PageTitle,
    Businesses,
    Terminal,
    Report,
});
