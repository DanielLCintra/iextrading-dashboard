import { mount } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
