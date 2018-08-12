import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { IStock } from '../../ducks/stocks';
import classes from './StockCard.scss';

export interface IStockCardProps {
  stock: IStock,
};

class StockCard extends React.Component<any, IStockCardProps> {
  public render() {
    const stock = this.props.stock;
    return (
      <Card className={classes.StockCard}>
        <CardContent>
          <Typography
            className={classes.StockCardCompanyName}
            color="textSecondary"
          >
            {stock.companyName}
          </Typography>
          <Typography
            className={classes.StockCardCode}
            variant="headline"
            component="h2"
          >
            {stock.symbol}
          </Typography>
          <Typography
            className={classes.StockCardSector}
            color="textSecondary"
          >
            {stock.sector}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default StockCard;
