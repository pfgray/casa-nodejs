/*
 * Entry file for the CASA app.
 */
import React from 'react';
//import classnames from 'classnames';

import './styles/main.less';

import HeaderContainer from './header/HeaderContainer';
//import Sidebar from '../sidebar/Sidebar';

const fadeDelay = 250;

export default class CasaApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: false};
  }
  componentDidMount() {
    setTimeout(() => this.setState({visible: true}), fadeDelay);
  }
  render() {
    return (
      <div className='main'>
        <HeaderContainer />
        {this.props.children}
      </div>
    );
  }
}
