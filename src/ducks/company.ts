import { AnyAction, Dispatch } from 'redux';
import Api from '../utils/Api';

export const DUCK_NAME = 'company';

// Interfaces

export interface ICompany {
  symbol: string,
  companyName: string,
  industry: string,
  website: string,
  description: string,
  CEO: string,
  sector: string,
  tags: string[],
}

export interface ICompanyState {
  data: ICompany | null,
  error: Error | null,
  loading: boolean,
}

// Action types

export const LOAD_COMPANY_STARTED = `${DUCK_NAME}/LOAD_COMPANY_STARTED`;
interface ILoadCompanyStarted {
  symbol: string,
  type: typeof LOAD_COMPANY_STARTED,
}

export const LOAD_COMPANY_SUCCEED = `${DUCK_NAME}/LOAD_COMPANY_SUCCEED`;
interface ILoadCompanySucceed {
  symbol: string,
  type: typeof LOAD_COMPANY_SUCCEED,
  data: ICompany[],
}

export const LOAD_COMPANY_FAILED = `${DUCK_NAME}/LOAD_COMPANY_FAILED`;
interface ILoadCompanyFailed {
  symbol: string,
  type: typeof LOAD_COMPANY_FAILED,
  error: Error,
}

// Action creators

export const loadCompanyStarted = (symbol:string):ILoadCompanyStarted =>
    ({ symbol, type: LOAD_COMPANY_STARTED });

export const loadCompanySucceed = (symbol:string, data:ICompany[]):ILoadCompanySucceed =>
    ({ symbol, type: LOAD_COMPANY_SUCCEED, data });

export const loadCompanyFailed = (symbol:string, error:Error):ILoadCompanyFailed =>
  ({ symbol, type: LOAD_COMPANY_FAILED, error });

// Thunks

export const loadCompany = (symbol:string) =>
  async (dispatch:Dispatch) => {
    dispatch(loadCompanyStarted(symbol));
    try {
      const results = await Api.instance.getCompany(symbol);
      dispatch(loadCompanySucceed(symbol, results.data));
      return Promise.resolve(results);
    } catch (error) {
      dispatch(loadCompanyFailed(symbol, error));
      return Promise.reject(error);
    }
  };

// Reducer

export const INITIAL_STATE:Map<string, ICompanyState> = new Map();

const reducer = (state = INITIAL_STATE, action:AnyAction) => {
  switch (action.type) {
  case LOAD_COMPANY_STARTED:
    return new Map(state)
      .set(action.symbol, {
        data: null,
        error: null,
        loading: true,
      });
  case LOAD_COMPANY_SUCCEED:
    return new Map(state)
    .set(action.symbol, {
      data: action.data,
      error: null,
      loading: false,
    });
  case LOAD_COMPANY_FAILED:
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
