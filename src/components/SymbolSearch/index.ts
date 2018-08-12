import { connect } from 'react-redux';
import {
  DUCK_NAME as SYMBOLS_DUCK_NAME,
  loadSymbols,
} from '../../ducks/symbols';
import SymbolSearch from './SymbolSearch';

const mapStateToProps = (state:any) => ({
  symbols: state[SYMBOLS_DUCK_NAME],
});

const mapDispatchToProps = (dispatch:any) => ({
  loadSymbols: () => dispatch(loadSymbols()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SymbolSearch);
