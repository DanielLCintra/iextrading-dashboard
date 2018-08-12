import { connect } from 'react-redux';
import { DUCK_NAME as COMPANY_DUCK_NAME, loadCompany } from '../../ducks/company';
import StockDetail, { IStockDetailProps } from './StockDetail';

const mapStateToProps = (
  state:any,
  ownProps:IStockDetailProps,
) => ({
  company: state[COMPANY_DUCK_NAME].get(ownProps.match.params.symbol) || {},
});

const mapDispatchToProps = (dispatch:any) => ({
  loadCompany: (symbol:string) => dispatch(loadCompany(symbol)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockDetail);
