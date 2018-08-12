import { combineReducers } from 'redux';

import stocksReducer, {
  DUCK_NAME as STOCKS_DUCK_NAME
} from './stocks';

import symbolsReducer, {
  DUCK_NAME as SYMBOLS_DUCK_NAME
} from './symbols';

import companyReducer, {
  DUCK_NAME as COMPANY_DUCK_NAME
} from './company';

export default combineReducers({
  [STOCKS_DUCK_NAME]: stocksReducer,
  [SYMBOLS_DUCK_NAME]: symbolsReducer,
  [COMPANY_DUCK_NAME]: companyReducer,
});
