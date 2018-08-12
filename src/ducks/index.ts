import { combineReducers } from 'redux';

import stocksReducer, {
    DUCK_NAME as STOCKS_DUCK_NAME
} from './stocks';

import companyReducer, {
    DUCK_NAME as COMPANY_DUCK_NAME
} from './company';

export default combineReducers({
    [STOCKS_DUCK_NAME]: stocksReducer,
    [COMPANY_DUCK_NAME]: companyReducer,
});