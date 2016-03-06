/*
 * Entry file for the CASA app.
 */
import React from 'react';
import './styles/main.less';
import HeaderContainer from './header/HeaderContainer';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

const reouteTransitionDuration = 1000;

export default class CasaApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='main'>
        <HeaderContainer />
        <ReactCSSTransitionReplace
          component="div"
          transitionName="route-main"
          transitionEnterTimeout={reouteTransitionDuration * 2}
          transitionLeaveTimeout={reouteTransitionDuration}>
          {React.cloneElement(this.props.children, {
              key: this.props.location.pathname
            })}
       </ReactCSSTransitionReplace>
      </div>
    );
  }
}
