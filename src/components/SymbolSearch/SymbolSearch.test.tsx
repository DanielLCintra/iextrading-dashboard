import { shallow } from 'enzyme';
import * as React from 'react';
import { INITIAL_STATE } from '../../ducks/symbols';
import { createFakeSymbol } from '../../ducks/symbols.test';
import SymbolSearch, { ISymbolSearchProps } from './SymbolSearch';

describe('SymbolSearch', () => {
  const data = [
    createFakeSymbol('TST1'),
    createFakeSymbol('TST2'),
  ];

  const props:ISymbolSearchProps = {
    loadSymbols: jest.fn(),
    symbols: {
      ...INITIAL_STATE,
      data,
    },
  };

  const wrapper = shallow(<SymbolSearch {...props} />);

  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should try to load symbols to the suggestions', () => {
    expect(props.loadSymbols).toBeCalled();
  });
});
