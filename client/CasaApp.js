/*
 * Entry file for the CASA app.
 */
import React from 'react';
import './styles/main.less';
import HeaderContainer from './header/HeaderContainer';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import classNames from 'classnames';

const routeTransitionDuration = 500;
const gradientRoutes = ['/', '/login'];

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
          <ReactCSSTransitionReplace
            component="div"
            transitionName="route-main"
            transitionEnterTimeout={routeTransitionDuration * 2}
            transitionLeaveTimeout={routeTransitionDuration}>
            {React.cloneElement(this.props.children, {
                key: this.props.location.pathname
              })}
         </ReactCSSTransitionReplace>
       </div>
      </div>
    );
  }
}
