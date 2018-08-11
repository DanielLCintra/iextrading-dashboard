import 'normalize.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './pages/Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Home />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
