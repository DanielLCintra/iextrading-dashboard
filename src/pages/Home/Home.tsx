import * as React from 'react';
import classes from './Home.scss';

import logo from '../../assets/logo.svg';

class Home extends React.Component {
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
      </div>
    );
  }
}

export default Home;
