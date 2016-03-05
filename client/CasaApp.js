/*
 * Entry file for the CASA app.
 */
import React from 'react';
import './styles/main.less';
import HeaderContainer from './header/HeaderContainer';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

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
          transitionEnterTimeout={1500}
          transitionLeaveTimeout={1000}>
          {React.cloneElement(this.props.children, {
              key: this.props.location.pathname
            })}
       </ReactCSSTransitionReplace>
      </div>
    );
  }
}
