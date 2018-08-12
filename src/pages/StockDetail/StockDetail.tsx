import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../../components/Header';
import { ICompanyState } from '../../ducks/company';
import classes from './StockDetail.scss';

export interface IRouterProps {
  symbol: string
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
    return (
      <div className={classes.wrapper}>
        <Header />
        <pre>
          <code>
            {JSON.stringify(this.props.match.params.symbol, null, 2)}
            {JSON.stringify(this.props.company, null, 2)}
          </code>
        </pre>
      </div>
    );
  }
}

export default StockDetail;
