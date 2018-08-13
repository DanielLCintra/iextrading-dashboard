import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CompanyCard from '../../components/CompanyCard';
import { ICompanyState } from '../../ducks/company';
import classes from './StockDetail.scss';

export interface IRouterProps {
  symbol: string,
};

export interface IStockDetailProps extends RouteComponentProps<IRouterProps> {
  company: ICompanyState,
  loadCompany: (symbol:string) => any,
}

class StockDetail extends React.Component<IStockDetailProps> {
  public componentDidMount() {
    const {
      loadCompany,
      match: { params: { symbol } },
    } = this.props;

    loadCompany(symbol);
  }

  public componentDidUpdate(prevProps:IStockDetailProps) {
    const {
      loadCompany,
      match: { params: { symbol } },
    } = this.props;

    if (
      prevProps.match.params.symbol !==
      symbol
    ) {
      loadCompany(symbol);
    }
  }

  public render() {
    const {
      loading,
      error,
      data,
    } = this.props.company;

    if (loading || error || !data) {
      return null;
    }

    return (
      <div className={classes.wrapper}>
        <CompanyCard company={data} />
      </div>
    );
  }
}

export default StockDetail;
