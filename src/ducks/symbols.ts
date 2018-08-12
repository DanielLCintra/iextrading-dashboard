import { AnyAction, Dispatch } from 'redux';
import Api from '../utils/Api';

export const DUCK_NAME = 'symbols';

// Interfaces

export interface ISymbol {
  symbol: string,
  name: string,
};

export interface ISymbolsState {
  data: ISymbol[] | null,
  error: Error | null,
  loading: boolean,
}

// Action types

export const LOAD_SYMBOLS_STARTED = `${DUCK_NAME}/LOAD_SYMBOLS_STARTED`;
interface ILoadSymbolsStarted {
  type: typeof LOAD_SYMBOLS_STARTED,
}

export const LOAD_SYMBOLS_SUCCEED = `${DUCK_NAME}/LOAD_SYMBOLS_SUCCEED`;
interface ILoadSymbolsSucceed {
  type: typeof LOAD_SYMBOLS_SUCCEED,
  data: ISymbol[],
}

export const LOAD_SYMBOLS_FAILED = `${DUCK_NAME}/LOAD_SYMBOLS_FAILED`;
interface ILoadSymbolsFailed {
  type: typeof LOAD_SYMBOLS_FAILED,
  error: Error,
}

// Action creators

export const loadSymbolsStarted = ():ILoadSymbolsStarted =>
  ({ type: LOAD_SYMBOLS_STARTED });

export const loadSymbolsSucceed = (data:ISymbol[]):ILoadSymbolsSucceed =>
  ({ type: LOAD_SYMBOLS_SUCCEED, data });

export const loadSymbolsFailed = (error:Error):ILoadSymbolsFailed =>
  ({ type: LOAD_SYMBOLS_FAILED, error });

// Thunks

export const loadSymbols = () =>
  async (dispatch:Dispatch) => {
    dispatch(loadSymbolsStarted());
    try {
      const results = await Api.instance.getSymbols();
      dispatch(loadSymbolsSucceed(results.data));
      return Promise.resolve(results);
    } catch (error) {
      dispatch(loadSymbolsFailed(error));
      return Promise.reject(error);
    }
  };

// Reducer

export const INITIAL_STATE:ISymbolsState = {
  data: null,
  error: null,
  loading: false,
};

const reducer = (state = INITIAL_STATE, action:AnyAction) => {
  switch (action.type) {
  case LOAD_SYMBOLS_STARTED:
    return {
      ...state,
      loading: true,
    };
  case LOAD_SYMBOLS_SUCCEED:
    return {
      ...state,
      data: [
        ...(state.data || []),
        ...action.data,
      ],
      loading: false,
    };
  case LOAD_SYMBOLS_FAILED:
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  default: return state;
  }
};

export default reducer;
