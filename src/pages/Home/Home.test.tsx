import { mount } from 'enzyme';
import * as React from 'react';
import Home, { IHomeProps } from './Home';

describe('Home Page', () => {
  const mockLoadStocks = jest.fn();
  const props:IHomeProps = {
    loadStocks: mockLoadStocks,
    stocks: {
      data: null,
      error: null,
      loading: false,
    }
  };

  const wrapper = mount(<Home {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should try to load stocks', () => {
    wrapper.mount();
    expect(mockLoadStocks).toBeCalled();
  });
});
