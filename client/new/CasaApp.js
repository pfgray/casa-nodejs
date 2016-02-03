/*
 * Entry file for the CASA app.
 */
import React from 'react';
import classnames from 'classnames';

import '../styles/flat.less';
import '../styles/layout.less';
import './main.less';

import Header from '../header/Header';
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
        <Header />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
