import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Api from '../utils/Api';
import {
  default as reducer,
  INITIAL_STATE,
  IStock,
  LOAD_STOCKS_FAILED,
  LOAD_STOCKS_STARTED,
  LOAD_STOCKS_SUCCEED,
  loadStocks,
  loadStocksFailed,
  loadStocksStarted,
  loadStocksSucceed
} from './stocks'

export const createFakeStock = ():IStock => ({
  companyName: 'Testing Co',
  latestPrice: 0,
  sector: 'Tests',
  symbol: 'TST',
  ytdChange: 0,
});

describe('stocks duck', () => {
  const data = [
    createFakeStock(),
    createFakeStock(),
  ];

  const error = new Error('Testing failure');

  describe('action creators', () => {
    it('should return a new LOAD_STOCKS_STARTED action', () => {
      expect(loadStocksStarted())
      .toEqual({ type: LOAD_STOCKS_STARTED });
    });
    it('should return a new LOAD_STOCKS_SUCCEED action', () => {
      expect(loadStocksSucceed(data))
      .toEqual({ type: LOAD_STOCKS_SUCCEED, data });
    });
    it('should return a new LOAD_STOCKS_FAILED action', () => {
      expect(loadStocksFailed(error))
      .toEqual({ type: LOAD_STOCKS_FAILED, error });
    });
  });

  describe('thunk', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    let store = mockStore(INITIAL_STATE);

    const mockGetStocks = jest.fn();
    Api.instance.getStocks = mockGetStocks;

    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    afterAll(() => {
      mockGetStocks.mockReset();
    });

    it('creates LOAD_STOCKS_SUCCEED when the list request succeeds', (done) => {
      mockGetStocks.mockResolvedValue({ data });

      const expectedActions = [
        { type: LOAD_STOCKS_STARTED },
        { type: LOAD_STOCKS_SUCCEED, data },
      ];

      store.dispatch<any>(loadStocks())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          mockGetStocks.mockClear();
          done();
        })
        .catch(done);
    });

    it('creates LOAD_STOCKS_FAILED when the list request fails', (done) => {
      mockGetStocks.mockRejectedValue(error);

      const expectedActions = [
        { type: LOAD_STOCKS_STARTED },
        { type: LOAD_STOCKS_FAILED, error },
      ];

      store.dispatch<any>(loadStocks())
        .then(done)
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
          mockGetStocks.mockClear();
          done();
        });
    });
  });

  describe('reducer', () => {
    it('it should handle the LOAD_STOCKS_STARTED action', () => {
      expect(reducer(INITIAL_STATE, loadStocksStarted()))
        .toEqual({
          ...INITIAL_STATE,
          loading: true,
        });
    });

    it('it should handle the LOAD_STOCKS_SUCCEED action', () => {
      expect(reducer(INITIAL_STATE, loadStocksSucceed(data)))
        .toEqual({
          ...INITIAL_STATE,
          data,
          loading: false,
        });
    });

    it('it should handle the LOAD_STOCKS_FAILED action', () => {
      expect(reducer(INITIAL_STATE, loadStocksFailed(error)))
        .toEqual({
          ...INITIAL_STATE,
          error,
          loading: false,
        });
    });
  });
});
