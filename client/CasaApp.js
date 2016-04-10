/*
 * Entry file for the CASA app.
 */
import React from 'react';
import './styles/main.less';
import HeaderContainer from './header/HeaderContainer';
import classNames from 'classnames';

const gradientRoutes = ['/', '/login', '/login/email', '/signup', '/signup/email'];

export default class CasaApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var isGradientRoute = gradientRoutes.indexOf(this.props.location.pathname) > -1;
    return (
      <div className='main'>
        <HeaderContainer />
        <div className={classNames('main-content', {'gradient-route': isGradientRoute})}>
          {this.props.children}
       </div>
      </div>
    );
  }
}
