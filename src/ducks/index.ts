import { combineReducers } from 'redux';

import stocks, {
    DUCK_NAME as STOCKS_DUCK_NAME
} from './stocks';

export default combineReducers({
    [STOCKS_DUCK_NAME]: stocks,
});