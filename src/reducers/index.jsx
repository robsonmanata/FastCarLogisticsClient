import { combineReducers } from 'redux';

import products from './products';
import categories from './categories';
import transactions from './transactions';

import user from './user';

import auth from './auth';
import ui from './ui';
import orders from './orders';
import notifications from './notifications';
import dashboard from './dashboard';
import finances from './finances';

export default combineReducers({ products, categories, transactions, user, ui, auth, orders, notifications, dashboard, finances });
