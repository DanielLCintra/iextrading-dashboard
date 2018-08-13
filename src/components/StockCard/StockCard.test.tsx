import { mount } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createFakeStock } from '../../ducks/stocks.test';
import StockCard, { IStockCardProps } from './StockCard';

describe('StockCard', () => {
  const props:IStockCardProps = {
    stock: createFakeStock(),
  };

  const wrapper = mount(
    <MemoryRouter>
      <StockCard {...props} />
    </MemoryRouter>
  );

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a Link for the detail', () => {
    expect(wrapper.find(Link).length).toBeGreaterThan(0);
  });
});
