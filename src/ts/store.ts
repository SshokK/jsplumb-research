import { createStore, applyMiddleware, combineReducers, CombinedState, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import appReducer from 'Reducers/app-reducer';
import history from '~/ts/history';

const reducers: CombinedState<any> = combineReducers({
  appReducer
});

const store: Store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware.withExtraArgument({ history }))
  )
);

export default store;
