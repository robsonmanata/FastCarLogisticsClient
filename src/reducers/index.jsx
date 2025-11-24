import { combineReducers } from 'redux';

import products from './products';
import categories from './categories';
import user from './user';
import warehouses from './warehouses';

import ui from './ui';

export default combineReducers({ products, categories, user, warehouses, ui });
