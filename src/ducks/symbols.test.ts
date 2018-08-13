import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Api from '../utils/Api';
import {
  default as reducer,
  INITIAL_STATE,
  ISymbol,
  LOAD_SYMBOLS_FAILED,
  LOAD_SYMBOLS_STARTED,
  LOAD_SYMBOLS_SUCCEED,
  loadSymbols,
  loadSymbolsFailed,
  loadSymbolsStarted,
  loadSymbolsSucceed
} from './symbols'

export const createFakeSymbol = (symbol:string):ISymbol => ({
  name: 'Testing',
  symbol,
});

describe('symbols duck', () => {
  const data = [
    createFakeSymbol('TST1'),
    createFakeSymbol('TST2'),
  ];

  const error = new Error('Testing failure');

  describe('action creators', () => {
    it('should return a new LOAD_SYMBOLS_STARTED action', () => {
      expect(loadSymbolsStarted())
      .toEqual({ type: LOAD_SYMBOLS_STARTED });
    });
    it('should return a new LOAD_SYMBOLS_SUCCEED action', () => {
      expect(loadSymbolsSucceed(data))
      .toEqual({ type: LOAD_SYMBOLS_SUCCEED, data });
    });
    it('should return a new LOAD_SYMBOLS_FAILED action', () => {
      expect(loadSymbolsFailed(error))
      .toEqual({ type: LOAD_SYMBOLS_FAILED, error });
    });
  });

  describe('thunk', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    let store = mockStore(INITIAL_STATE);

    const mockGetSymbols = jest.fn();
    Api.instance.getSymbols = mockGetSymbols;

    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    afterAll(() => {
      mockGetSymbols.mockReset();
    });

    it('creates LOAD_SYMBOLS_SUCCEED when the list request succeeds', (done) => {
      mockGetSymbols.mockResolvedValue({ data });

      const expectedActions = [
        loadSymbolsStarted(),
        loadSymbolsSucceed(data),
      ];

      store.dispatch<any>(loadSymbols())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          mockGetSymbols.mockClear();
          done();
        })
        .catch(done);
    });

    it('creates LOAD_SYMBOLS_FAILED when the list request fails', (done) => {
      mockGetSymbols.mockRejectedValue(error);

      const expectedActions = [
        loadSymbolsStarted(),
        loadSymbolsFailed(error),
      ];

      store.dispatch<any>(loadSymbols())
        .then(done)
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
          mockGetSymbols.mockClear();
          done();
        });
    });
  });

  describe('reducer', () => {
    it('it should handle the LOAD_SYMBOLS_STARTED action', () => {
      expect(reducer(INITIAL_STATE, loadSymbolsStarted()))
        .toEqual({
          ...INITIAL_STATE,
          loading: true,
        });
    });

    it('it should handle the LOAD_SYMBOLS_SUCCEED action', () => {
      expect(reducer(INITIAL_STATE, loadSymbolsSucceed(data)))
        .toEqual({
          ...INITIAL_STATE,
          data,
          loading: false,
        });
    });

    it('it should handle the LOAD_SYMBOLS_FAILED action', () => {
      expect(reducer(INITIAL_STATE, loadSymbolsFailed(error)))
        .toEqual({
          ...INITIAL_STATE,
          error,
          loading: false,
        });
    });
  });
});
