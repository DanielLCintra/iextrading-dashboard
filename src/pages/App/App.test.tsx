import { shallow } from 'enzyme';
import * as React from 'react';
import App from './App';

jest.mock('../../components/StockChart', () => () => null);

describe('App', () => {
  const wrapper = shallow(<App />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})
