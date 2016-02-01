/*
 * This Component exists as an interim to wrap the
 * login page so it can be rendered in an it's own page.
 * (and to compose it with a header).
 * When the login page gets added back to the app as it's own
 * route, remove this wrapper.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header/Header';
import Login from './Login';

import '../styles/flat.less';
import './login.less';

class LoginApp extends React.Component {
 render() {
   return (
     <div className="main">
      <Header />
      <Login />
     </div>
   );
 }
}

ReactDOM.render(
  <LoginApp />,
  document.getElementById('content')
);
