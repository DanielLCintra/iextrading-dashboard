import * as React from 'react';
import StockCard from '../../components/StockCard';
import { IStock, IStocksState } from '../../ducks/stocks';
import classes from './Home.scss';

export interface IHomeProps {
  loadStocks: () => any;
  stocks: IStocksState,
}

class Home extends React.Component<IHomeProps> {
  public componentDidMount() {
    this.props.loadStocks();
  }

  public render() {
    const stocks = this.props.stocks.data || [];
    return (
      <div className={classes.wrapper}>
        <div className={classes.stocksList}>
          {
            stocks.map((stock:IStock) => (
              <StockCard
                stock={stock}
                key={stock.symbol}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

export default Home;
