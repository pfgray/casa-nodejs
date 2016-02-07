
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { syncHistory, routeReducer } from 'react-router-redux';


import casaReducer from './store/casaReducer';
import CasaApp from './CasaApp';
//import AppsContainer from './apps/AppsContainer';
import Login from './login/Login';
import Welcome from './welcome/Welcome';
import Dashboard from './dashboard/Dashboard';
import Peers from './peers/PeersContainer';
import Stores from './storefronts/StoreFronts';

var browserHistory = createBrowserHistory();
const reducer = combineReducers({
  casa: casaReducer,
  routing: routeReducer
});
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
            <IndexRoute component={Welcome}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/peers" component={Peers} />
            <Route path="/stores" component={Stores} />
            <Route path="/login" component={Login} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

render(<RootCasaApp />, document.getElementById('content'));
