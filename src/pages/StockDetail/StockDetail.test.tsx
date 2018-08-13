import { shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { INITIAL_COMPANY_STATE } from '../../ducks/company';
import StockDetail, { IStockDetailProps } from './StockDetail';

describe('StockDetail', () => {
  const symbol = 'TST';

  const mockLoadCompany = jest.fn();

  const mockMatchProp = {
    isExact: false,
    params: {
      symbol,
    },
    path: `/stock/${symbol}`,
    url: `http://test.com/stock/${symbol}`,
  };

  const props:IStockDetailProps = {
    company: INITIAL_COMPANY_STATE,
    history: createBrowserHistory(),
    loadCompany: mockLoadCompany,
    location: {
      hash: '',
      pathname: `/stock/${symbol}`,
      search: '',
      state: {},
    },
    match: mockMatchProp,
  };

  const wrapper = shallow(<StockDetail {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should try to load the company data for the symbol', () => {
    expect(mockLoadCompany).toBeCalledWith(symbol);
  });

  it('should reload company data if symbol prop changes', () => {
    const newSymbol = 'CHANGE';

    mockLoadCompany.mockClear();

    wrapper.setProps({
      match: {
        ...mockMatchProp,
        params: {
          symbol: newSymbol
        },
      },
    });

    expect(mockLoadCompany).toBeCalledWith(newSymbol);
  });
});
