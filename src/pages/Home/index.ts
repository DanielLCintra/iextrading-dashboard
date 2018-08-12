import { connect } from 'react-redux';
import { DUCK_NAME as STOCKS_DUCK_NAME, loadStocks } from '../../ducks/stocks';
import Home from './Home';

const mapStateToProps = (state:any) => ({
  stocks: state[STOCKS_DUCK_NAME],
});

const mapDispatchToProps = (dispatch:any) => ({
  loadStocks: () => dispatch(loadStocks()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);