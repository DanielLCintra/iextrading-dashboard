import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { Route } from 'react-router-dom'
import Home from '../Home';
import StockDetail from '../StockDetail';
import classes from './App.scss';

class App extends React.Component {
  public render() {
    return (
      <div className={classes.App}>
        <CssBaseline />
        <Route exact={true} path="/" component={Home}/>
        <Route path="/stock" component={StockDetail}/>
      </div>
    );
  }
}

export default App;
