import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import appReducer from 'Reducers/app-reducer';
import history from '~/history';

const reducers = combineReducers({
  appReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware.withExtraArgument({ history }))
  )
);

export default store;
