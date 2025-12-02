import { combineReducers } from 'redux';

import products from './products';
import categories from './categories';
import user from './user';
import warehouses from './warehouses';
import auth from './auth';
import ui from './ui';
import orders from './orders';

export default combineReducers({ products, categories, user, warehouses, ui, auth, orders });
