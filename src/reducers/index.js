import { combineReducers } from 'redux';

import products from './products';
import categories from './categories';

import ui from './ui';

export default combineReducers({ products, categories, ui });
