
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { syncHistory } from 'react-router-redux';


import reducer from './store/casaReducer';
import CasaApp from './CasaApp';
//import AppsContainer from './apps/AppsContainer';
import Login from './login/Login';
import Welcome from './welcome/Welcome';
import Dashboard from './dashboard/Dashboard';
import Peers from './peers/PeersContainer';
import EditPeer from './peers/edit/EditPeerFormWrapper';
//import Stores from './storefronts/Storefronts.tsx';

var browserHistory = createBrowserHistory();
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
            <Route path="/repos" >
              <IndexRoute component={Peers} />
              <Route path="edit/:peer" component={EditPeer}/>
              <Route path="new" component={EditPeer}/>
            </Route>
            <Route path="/stores" component={() => <span />} />
            <Route path="/login" component={Login} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

render(<RootCasaApp />, document.getElementById('content'));
