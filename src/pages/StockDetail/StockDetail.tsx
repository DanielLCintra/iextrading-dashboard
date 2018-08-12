import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import CompanyCard from '../../components/CompanyCard';
import Header from '../../components/Header';
import { ICompanyState } from '../../ducks/company';
import classes from './StockDetail.scss';

export interface IRouterProps {
  symbol: string,
};

export interface IStockDetailProps extends RouteComponentProps<IRouterProps> {
  company: ICompanyState,
  loadCompany: () => any,
}

class StockDetail extends React.Component<any, IStockDetailProps> {
  public componentDidMount() {
    const {
      loadCompany,
      match: {
        params: {
          symbol,
        },
      },
    } = this.props;
    loadCompany(symbol);
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
        <Header />
        <CompanyCard company={data} />
      </div>
    );
  }
}

export default StockDetail;
