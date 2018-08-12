import { AnyAction, Dispatch } from 'redux';
import Api from '../utils/Api';

export const DUCK_NAME = 'stocks';

// Interfaces

export interface IStock {
  symbol: string,
  companyName: string,
  sector: string,
  latestPrice: number,
  ytdChange: number,
}

export interface IStocksState {
  data: IStock[] | null,
  error: Error | null,
  loading: boolean,
}

// Action types

export const LOAD_STOCKS_STARTED = `${DUCK_NAME}/LOAD_STOCKS_STARTED`;
interface ILoadStocksStarted {
  type: typeof LOAD_STOCKS_STARTED,
}

export const LOAD_STOCKS_SUCCEED = `${DUCK_NAME}/LOAD_STOCKS_SUCCEED`;
interface ILoadStocksSucceed {
  type: typeof LOAD_STOCKS_SUCCEED,
  data: IStock[],
}

export const LOAD_STOCKS_FAILED = `${DUCK_NAME}/LOAD_STOCKS_FAILED`;
interface ILoadStocksFailed {
  type: typeof LOAD_STOCKS_FAILED,
  error: Error,
}

// Action creators

export const loadStocksStarted = ():ILoadStocksStarted =>
  ({ type: LOAD_STOCKS_STARTED });

export const loadStocksSucceed = (data:IStock[]):ILoadStocksSucceed =>
  ({ type: LOAD_STOCKS_SUCCEED, data });

export const loadStocksFailed = (error:Error):ILoadStocksFailed =>
  ({ type: LOAD_STOCKS_FAILED, error });

// Thunks

export const loadStocks = () =>
  async (dispatch:Dispatch) => {
    dispatch(loadStocksStarted());
    try {
      const results = await Api.instance.getStocks();
      dispatch(loadStocksSucceed(results.data));
      return Promise.resolve(results);
    } catch (error) {
      dispatch(loadStocksFailed(error));
      return Promise.reject(error);
    }
  };

// Reducer

export const INITIAL_STATE:IStocksState = {
  data: null,
  error: null,
  loading: false,
};

const reducer = (state = INITIAL_STATE, action:AnyAction) => {
  switch (action.type) {
  case LOAD_STOCKS_STARTED:
    return {
      ...state,
      loading: true,
    };
  case LOAD_STOCKS_SUCCEED:
    return {
      ...state,
      data: [
        ...(state.data || []),
        ...action.data,
      ],
      loading: false,
    };
  case LOAD_STOCKS_FAILED:
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  default: return state;
  }
};

export default reducer;
