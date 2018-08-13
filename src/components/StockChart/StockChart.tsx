import Card from '@material-ui/core/Card';
import { Data, Layout } from 'plotly.js';
import * as React from 'react';
import Plot from 'react-plotly.js';
import { ICandlestick, IChartState } from '../../ducks/chart';
import classes from './StockChart.scss';

export interface IStockChartProps {
  symbol: string,
  chart: IChartState,
  loadChart: (symbol:string) => any,
};

class StockChart extends React.Component<IStockChartProps> {
  public componentDidMount() {
    this.props.loadChart(this.props.symbol);
  }

  public getChartData() {
    const { data } = this.props.chart;

    if (!data) {
      return [];
    }

    return data.reduce((chartData, candle:ICandlestick) => ({
      ...chartData,
      close: [ ...chartData.close, candle.close ],
      high: [ ...chartData.high, candle.high ],
      low: [ ...chartData.low, candle.low ],
      open: [ ...chartData.open, candle.open ],
      x: [ ...chartData.x, candle.date ],
    }), {
      close: [],
      decreasing: { line: { color: '#7F7F7F' } },
      high: [],
      increasing: { line: { color: '#17BECF' } },
      line: { color: 'rgba(31,119,180,1)' },
      low: [],
      open: [],
      type: 'candlestick',
      x: [],
      xaxis: 'x',
      yaxis: 'y'
    });
  }

  public render() {
    const {
      chart: {
        data,
        error,
        loading,
      },
    } = this.props;

    if (loading || error || !data) {
      return null;
    }

    const chartData = [this.getChartData()] as Data[];

    const chartLayout = {
      dragmode: 'zoom',
      margin: {
        b: 40,
        l: 60,
        r: 10,
        t: 25,
      },
      showlegend: false,
      xaxis: {
        autorange: true,
        domain: [1, 0],
        type: 'date'
      },
      yaxis: {
        autorange: true,
        domain: [1, 0],
        type: 'linear'
      }
    } as Layout;

    return (
      <div className={classes.StockChart}>
        <Card>
          <Plot data={chartData} layout={chartLayout} />
        </Card>
      </div>
    );
  }
}

export default StockChart;
