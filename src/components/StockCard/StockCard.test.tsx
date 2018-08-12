import { mount } from 'enzyme';
import * as React from 'react';
import { createFakeStock } from '../../ducks/stocks.test';
import StockCard, { IStockCardProps } from './StockCard';

describe('StockCard', () => {
  const props:IStockCardProps = {
    stock: createFakeStock(),
  };

  const wrapper = mount(<StockCard {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
