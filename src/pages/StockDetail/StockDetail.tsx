import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../../components/Header';
import classes from './StockDetail.scss';

export interface IRouterProps {
  symbol: string
};

class StockDetail extends React.Component<any, RouteComponentProps<IRouterProps>> {
  public render() {
    return (
      <div className={classes.wrapper}>
        <Header />
        {this.props.match.params.symbol}
      </div>
    );
  }
}

export default StockDetail;
