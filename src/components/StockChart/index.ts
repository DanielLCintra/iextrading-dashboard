import { connect } from 'react-redux';
import {
  DUCK_NAME as CHART_DUCK_NAME,
  INITIAL_CHART_STATE,
  loadChart,
} from '../../ducks/chart';
import StockChart from './StockChart';

const mapStateToProps = (
  state:any,
  ownProps:any,
) => ({
  chart: state[CHART_DUCK_NAME].get(ownProps.symbol) || INITIAL_CHART_STATE,
});

const mapDispatchToProps = (dispatch:any) => ({
  loadChart: (symbol:string) => dispatch(loadChart(symbol)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockChart);
