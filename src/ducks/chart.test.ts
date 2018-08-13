import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Api from '../utils/Api';
import {
  default as reducer,
  ICandlestick,
  IChartState,
  INITIAL_CHART_STATE,
  INITIAL_STATE,
  LOAD_CHART_FAILED,
  LOAD_CHART_STARTED,
  LOAD_CHART_SUCCEED,
  loadChart,
  loadChartFailed,
  loadChartStarted,
  loadChartSucceed
} from './chart'

export const createFakeCandlestick = ():ICandlestick => ({
  close: 15,
  date: '2018-08-12',
  high: 20,
  label: 'Test label',
  low: 5,
  open: 10,
});

describe('chart duck', () => {
  const symbol = 'TST';

  const data = [createFakeCandlestick()];

  const error = new Error('Testing failure');

  describe('action creators', () => {
    it('should return a new LOAD_CHART_STARTED action', () => {
      expect(loadChartStarted(symbol))
      .toEqual({ symbol, type: LOAD_CHART_STARTED });
    });
    it('should return a new LOAD_CHART_SUCCEED action', () => {
      expect(loadChartSucceed(symbol, data))
      .toEqual({ symbol, type: LOAD_CHART_SUCCEED, data });
    });
    it('should return a new LOAD_CHART_FAILED action', () => {
      expect(loadChartFailed(symbol, error))
      .toEqual({ symbol, type: LOAD_CHART_FAILED, error });
    });
  });

  describe('thunk', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    let store = mockStore(INITIAL_STATE);

    const mockGetChart = jest.fn();
    Api.instance.getChart = mockGetChart;

    beforeEach(() => {
      store = mockStore(INITIAL_STATE);
    });

    afterAll(() => {
      mockGetChart.mockReset();
    });

    it('creates LOAD_CHART_SUCCEED when the list request succeeds', (done) => {
      mockGetChart.mockResolvedValue({ data: { data } });

      const expectedActions = [
        loadChartStarted(symbol),
        loadChartSucceed(symbol, data),
      ];

      store.dispatch<any>(loadChart(symbol))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          mockGetChart.mockClear();
          done();
        })
        .catch(done);
    });

    it('creates LOAD_CHART_FAILED when the list request fails', (done) => {
      mockGetChart.mockRejectedValue(error);

      const expectedActions = [
        loadChartStarted(symbol),
        loadChartFailed(symbol, error),
      ];

      store.dispatch<any>(loadChart(symbol))
        .then(done)
        .catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
          mockGetChart.mockClear();
          done();
        });
    });
  });

  describe('reducer', () => {
    it('it should handle the LOAD_CHART_STARTED action', () => {
      expect(reducer(INITIAL_STATE, loadChartStarted(symbol)))
        .toEqual(
          new Map<string, IChartState>()
            .set(symbol, {
              ...INITIAL_CHART_STATE,
              loading: true,
            }),
        );
    });

    it('it should handle the LOAD_CHART_SUCCEED action', () => {
      expect(reducer(INITIAL_STATE, loadChartSucceed(symbol, data)))
        .toEqual(
          new Map<string, IChartState>()
            .set(symbol, {
              data,
              error: null,
              loading: false,
            })
        );
    });

    it('it should handle the LOAD_CHART_FAILED action', () => {
      expect(reducer(INITIAL_STATE, loadChartFailed(symbol, error)))
        .toEqual(
          new Map<string, IChartState>()
            .set(symbol, {
              data: null,
              error,
              loading: false,
            })
        );
    });
  });
});
