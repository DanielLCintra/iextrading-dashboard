import { mount } from 'enzyme';
import * as React from 'react';
import StockDetail from './StockDetail';

describe('StockDetail', () => {
  const wrapper = mount(<StockDetail />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
