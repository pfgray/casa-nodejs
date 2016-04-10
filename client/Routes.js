import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { syncHistory } from 'react-router-redux';


import reducer from './store/casaReducer';
import CasaApp from './CasaApp';
//import AppsContainer from './apps/AppsContainer';
import Login from './login/Login';
import LoginEmail from './login/LoginEmail';
import Signup from './login/Signup';
import SignupEmail from './login/SignupEmail';
import Welcome from './welcome/Welcome';
import Dashboard from './dashboard/Dashboard';
import Peers from './peers/PeersContainer';
import EditPeer from './peers/edit/EditPeerFormWrapper';
import Storefronts from './storefronts/StorefrontsContainer';
import EditStorefront from './storefronts/edit/EditStorefrontFormWrapper.js';
import LtiStorefront from './lti/LtiStorefrontContainer';

var browserHistory = createBrowserHistory();
const reduxRouterMiddleware = syncHistory(browserHistory);
const finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(reduxRouterMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = finalCreateStore(reducer);

export default () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={CasaApp}>
        <IndexRoute component={Welcome}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/repos" >
          <IndexRoute component={Peers} />
          <Route path="edit/:peer" component={EditPeer}/>
          <Route path="new" component={EditPeer}/>
        </Route>
        <Route path="/storefronts" >
          <IndexRoute component={Storefronts} />
          <Route path="edit/:storefront" component={EditStorefront}/>
          <Route path="new" component={EditStorefront}/>
        </Route>
        <Route path="/stores" component={() => <span />} />
        <Route path="/login">
          <IndexRoute component={Login} />
          <Route path="email" component={LoginEmail}/>
        </Route>
        <Route path="/signup">
          <IndexRoute component={Signup} />
          <Route path="email" component={SignupEmail}/>
        </Route>
      </Route>
      <Route path="/store" component={LtiStorefront}>
      </Route>
    </Router>
  </Provider>
);
