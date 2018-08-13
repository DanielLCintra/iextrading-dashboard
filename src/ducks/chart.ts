import { AnyAction, Dispatch } from 'redux';
import Api from '../utils/Api';

export const DUCK_NAME = 'chart';

// Interfaces

export interface ICandlestick {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  label: string,
}

export interface IChartState {
  data: ICandlestick[] | null,
  error: Error | null,
  loading: boolean,
}

// Action types

export const LOAD_CHART_STARTED = `${DUCK_NAME}/LOAD_CHART_STARTED`;
interface ILoadChartStarted {
  symbol: string,
  type: typeof LOAD_CHART_STARTED,
}

export const LOAD_CHART_SUCCEED = `${DUCK_NAME}/LOAD_CHART_SUCCEED`;
interface ILoadChartSucceed {
  symbol: string,
  type: typeof LOAD_CHART_SUCCEED,
  data: ICandlestick[],
}

export const LOAD_CHART_FAILED = `${DUCK_NAME}/LOAD_CHART_FAILED`;
interface ILoadChartFailed {
  symbol: string,
  type: typeof LOAD_CHART_FAILED,
  error: Error,
}

// Action creators

export const loadChartStarted = (symbol:string):ILoadChartStarted =>
    ({ symbol, type: LOAD_CHART_STARTED });

export const loadChartSucceed = (symbol:string, data:ICandlestick[]):ILoadChartSucceed =>
    ({ symbol, type: LOAD_CHART_SUCCEED, data });

export const loadChartFailed = (symbol:string, error:Error):ILoadChartFailed =>
  ({ symbol, type: LOAD_CHART_FAILED, error });

// Thunks

export const loadChart = (symbol:string) =>
  async (dispatch:Dispatch) => {
    dispatch(loadChartStarted(symbol));
    try {
      const results = await Api.instance.getChart(symbol);
      dispatch(loadChartSucceed(symbol, results.data.data));
      return Promise.resolve(results);
    } catch (error) {
      dispatch(loadChartFailed(symbol, error));
      return Promise.reject(error);
    }
  };

// Reducer

export const INITIAL_STATE:Map<string, IChartState> = new Map();

export const INITIAL_CHART_STATE:IChartState = {
  data: null,
  error: null,
  loading: false,
};

const reducer = (state = INITIAL_STATE, action:AnyAction) => {
  const company = state[action.symbol] || INITIAL_CHART_STATE;

  switch (action.type) {
  case LOAD_CHART_STARTED:
    return new Map(state)
      .set(action.symbol, {
        ...company,
        loading: true,
      });
  case LOAD_CHART_SUCCEED:
    return new Map(state)
    .set(action.symbol, {
      data: action.data,
      error: null,
      loading: false,
    });
  case LOAD_CHART_FAILED:
    return new Map(state)
    .set(action.symbol, {
      data: null,
      error: action.error,
      loading: false,
    });;
  default: return state;
  }
};

export default reducer;
