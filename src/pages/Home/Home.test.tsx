import * as React from 'react';
import Home from './Home';
import { mount } from 'enzyme';

describe('Home', () => {
  const wrapper = mount(<Home />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
})
