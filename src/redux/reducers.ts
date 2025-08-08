import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import PageTitle from './pageTitle/reducers';
import Businesses from './business/reducers';
import Terminal from './terminal/reducers';
import Report from './report/reducers';
import Staff from './staff/reducers';
import Menu from './menu/reducers';
import Item from './item/reducers';
import Recipe from './item/reducers';

export default combineReducers({
    Auth,
    Layout,
    PageTitle,
    Businesses,
    Terminal,
    Report,
    Staff,
    Menu,
    Item,
    Recipe,
});
