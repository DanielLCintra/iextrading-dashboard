import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import Home from '../Home';
import StockDetail from '../StockDetail';
import classes from './App.scss';

class App extends React.Component {
  public render() {
    return (
      <div className={classes.App}>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/stock/:symbol" component={StockDetail}/>
        </Switch>
      </div>
    );
  }
}

export default App;
