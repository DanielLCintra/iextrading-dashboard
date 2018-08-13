import { shallow } from 'enzyme';
import * as React from 'react';
import Header from './Header';

describe('Header', () => {
  const wrapper = shallow(<Header />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
