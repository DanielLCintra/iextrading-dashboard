import * as React from 'react';
import Header from '../../components/Header';
import classes from './StockDetail.scss';

class StockDetail extends React.Component {
  public render() {
    return (
      <div className={classes.StockDetail}>
        <Header />
      </div>
    );
  }
}

export default StockDetail;
