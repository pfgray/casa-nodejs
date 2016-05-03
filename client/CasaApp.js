/*
 * Entry file for the CASA app.
 */
import React from 'react';
import './styles/main.less';
import HeaderContainer from './header/HeaderContainer';
import classNames from 'classnames';

const gradientRoutes = ['/', '/login', '/login/email', '/signup', '/signup/email'];

const inIframe = (function iframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
})();

export default class CasaApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const isGradientRoute = gradientRoutes.indexOf(this.props.location.pathname) > -1;
    return (
      <div className={classNames('main', {
        'iframe': inIframe
      })}>
        <HeaderContainer />
        <div className={classNames('main-content', { 'gradient-route': isGradientRoute })}>
          {this.props.children}
       </div>
      </div>
    );
  }
}
