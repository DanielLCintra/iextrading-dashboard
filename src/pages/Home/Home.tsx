import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import StockCard from '../../components/StockCard';
import { IStock, IStocksState } from '../../ducks/stocks';
import classes from './Home.scss';

export interface IHomeProps {
  loadStocks: () => any;
  stocks: IStocksState,
}

class Home extends React.Component<any, IHomeProps> {
  public componentDidMount() {
    this.props.loadStocks();
  }

  public render() {
    const stocks = this.props.stocks.data || [];
    return (
      <div className={classes.wrapper}>
        <header className={classes.header}>
          <Typography
            className={classes.headerTitle}
            variant="display4"
            component="h1"
          >
            IEX Trading
            <Typography
              className={classes.headerSubTitle}
              variant="display2"
              component="small"
            >
              Bigest stocks
            </Typography>
          </Typography>
        </header>
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
