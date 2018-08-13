import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Api from '../utils/Api';
import {
  default as reducer,
  ICompany,
  ICompanyState,
  INITIAL_COMPANY_STATE,
  INITIAL_STATE,
  LOAD_COMPANY_FAILED,
  LOAD_COMPANY_STARTED,
  LOAD_COMPANY_SUCCEED,
  loadCompany,
  loadCompanyFailed,
  loadCompanyStarted,
  loadCompanySucceed
} from './company'

export const createFakeCompany = (symbol:string):ICompany => ({
  CEO: 'Sr. Test',
  companyName: 'Testing Co',
  description: 'Minim do fugiat dolor fugiat excepteur nulla est aliquip.',
  industry: 'Tests',
  sector: 'Tests',
  symbol,
  tags: ['T', 'A', 'G'],
  website: 'http://test.com',
});

describe('company duck', () => {
  const symbol = 'TST';

  const data = createFakeCompany(symbol);

  const error = new Error('Testing failure');

  describe('action creators', () => {
    it('should return a new LOAD_COMPANY_STARTED action', () => {
      expect(loadCompanyStarted(symbol))
      .toEqual({ symbol, type: LOAD_COMPANY_STARTED });
    });
    it('should return a new LOAD_COMPANY_SUCCEED action', () => {
      expect(loadCompanySucceed(symbol, data))
      .toEqual({ symbol, type: LOAD_COMPANY_SUCCEED, data });
    });
    it('should return a new LOAD_COMPANY_FAILED action', () => {
      expect(loadCompanyFailed(symbol, error))
      .toEqual({ symbol, type: LOAD_COMPANY_FAILED, error });
    });
  });

  describe('thunk', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    let store = mockStore(INITIAL_STATE);

    const mockGetCompany = jest.fn();
    Api.instance.getCompany = mockGetCompany;

    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    afterAll(() => {
      mockGetCompany.mockReset();
    });

    it('creates LOAD_COMPANY_SUCCEED when the list request succeeds', (done) => {
      mockGetCompany.mockResolvedValue({ data });

      const expectedActions = [
        loadCompanyStarted(symbol),
        loadCompanySucceed(symbol, data),
      ];

      store.dispatch<any>(loadCompany(symbol))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          mockGetCompany.mockClear();
          done();
        })
        .catch(done);
    });

    it('creates LOAD_COMPANY_FAILED when the list request fails', (done) => {
      mockGetCompany.mockRejectedValue(error);

      const expectedActions = [
        loadCompanyStarted(symbol),
        loadCompanyFailed(symbol, error),
      ];

      store.dispatch<any>(loadCompany(symbol))
        .then(done)
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
          mockGetCompany.mockClear();
          done();
        });
    });
  });

  describe('reducer', () => {
    it('it should handle the LOAD_COMPANY_STARTED action', () => {
      expect(reducer(INITIAL_STATE, loadCompanyStarted(symbol)))
        .toEqual(
          new Map<string, ICompanyState>()
            .set(symbol, {
              ...INITIAL_COMPANY_STATE,
              loading: true,
            }),
        );
    });

    it('it should handle the LOAD_COMPANY_SUCCEED action', () => {
      expect(reducer(INITIAL_STATE, loadCompanySucceed(symbol, data)))
        .toEqual(
          new Map<string, ICompanyState>()
            .set(symbol, {
              data,
              error:null,
              loading: false,
            })
        );
    });

    it('it should handle the LOAD_COMPANY_FAILED action', () => {
      expect(reducer(INITIAL_STATE, loadCompanyFailed(symbol, error)))
        .toEqual(
          new Map<string, ICompanyState>()
            .set(symbol, {
              data: null,
              error,
              loading: false,
            })
        );
    });
  });
});
