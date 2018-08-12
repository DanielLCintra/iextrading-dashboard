import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import reducer from '../../ducks';
import Home from '../Home';

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <CssBaseline />
          <Home />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
