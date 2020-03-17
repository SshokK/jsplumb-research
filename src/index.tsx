import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import App from 'Components/App/App';
import store from '~/store';
import history from '~/history';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={'/'}>
        <App />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
