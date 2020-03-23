import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import App from 'Components/App/App.tsx';
import store from './store';
import history from './history';

import 'Styles/jsplumbtoolkit-defaults.css';
import 'Styles/jsplumbtoolkit-demo.css';
import 'Styles/jsplumbtoolkit-syntax-highlighter.css';
import './index.css';

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={'/'}>
        <App />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
