
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { useBasename } from 'history';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import CasaApp from './CasaApp';
import Apps from './apps/Apps';

const history = useBasename(createBrowserHistory)({
  basename: '/new'
});

class RootCasaApp extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={CasaApp}>
          <IndexRoute component={Apps}/>
        </Route>
      </Router>
    );
  }
}

render(<RootCasaApp />, document.getElementById('content'));
