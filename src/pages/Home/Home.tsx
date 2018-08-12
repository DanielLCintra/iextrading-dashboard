import * as React from 'react';
import { IStocksState } from '../../ducks/stocks';
import classes from './Home.scss';

import logo from '../../assets/logo.svg';

export interface IHomeProps {
  loadStocks: () => any;
  stocks: IStocksState,
}

class Home extends React.Component<any, IHomeProps> {
  public componentDidMount() {
    this.props.loadStocks();
  }

  public render() {
    return (
      <div className={classes.Home}>
        <header className={classes.HomeHeader}>
          <img src={logo} className={classes.HomeLogo} alt="logo" />
          <h1 className={classes.HomeTitle}>Welcome to React</h1>
        </header>
        <p className={classes.HomeIntro}>
          To get started, edit <code>src/Home.tsx</code> and save to reload.
        </p>
        <pre>
          <code>
            {JSON.stringify(this.props.stocks, null, 2)}
          </code>
        </pre>
      </div>
    );
  }
}

export default Home;
