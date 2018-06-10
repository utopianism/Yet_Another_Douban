// @flow

import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
  createNavigationPropConstructor,
  createNavigationReducer,
  createReactNavigationReduxMiddleware,
  initializeListeners,
} from 'react-navigation-redux-helpers';

import Navigator from './Navigator';
import reducers from './reducers';
import { localeMoment } from './config';


const navReducer = createNavigationReducer(Navigator);
const appReducer = combineReducers({
  nav: navReducer,
  ...reducers,
});

// Note: createReactNavigationReduxMiddleware must be run before createNavigationPropConstructor
createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const navigationPropConstructor = createNavigationPropConstructor('root');

class App extends React.Component<{}> {
  componentDidMount() {
    // $FlowFixMe
    initializeListeners('root', this.props.nav);
    localeMoment();
  }

  render() {
    const navigation = navigationPropConstructor(
      // $FlowFixMe
      this.props.dispatch,
      // $FlowFixMe
      this.props.nav,
    );
    return <Navigator navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  appReducer,
  applyMiddleware(...middlewares),
);

export default () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);
