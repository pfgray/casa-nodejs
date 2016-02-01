
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { useBasename } from 'history';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { syncHistory, routeReducer } from 'react-router-redux';

import casaReducer from './store/casaReducer';
import CasaApp from './CasaApp';
import AppsContainer from './apps/AppsContainer';
import Peers from './peers/Peers';
import Stores from './storefronts/StoreFronts';


const browserHistory = useBasename(createBrowserHistory)({
  basename: '/new'
});
const reducer = combineReducers(Object.assign({}, casaReducer, {
  routing: routeReducer
}));
const reduxRouterMiddleware = syncHistory(browserHistory);
const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(reduxRouterMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = finalCreateStore(reducer);

class RootCasaApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={CasaApp}>
            <IndexRoute component={AppsContainer}/>
            <Route path="/peers" component={Peers} />
            <Route path="/stores" component={Stores} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

render(<RootCasaApp />, document.getElementById('content'));
