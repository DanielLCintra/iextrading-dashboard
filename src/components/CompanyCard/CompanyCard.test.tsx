import { mount } from 'enzyme';
import * as React from 'react';
import { createFakeCompany } from '../../ducks/company.test';
import CompanyCard, { ICompanyCardProps } from './CompanyCard';

describe('CompanyCard', () => {
  const props:ICompanyCardProps = {
    company: createFakeCompany('TST'),
  };

  const wrapper = mount(<CompanyCard {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
