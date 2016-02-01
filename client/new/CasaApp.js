/*
 * Entry file for the CASA app.
 */
import React from 'react';

import '../styles/flat.less';
import '../styles/layout.less';
import './main.less';

import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

export default class CasaApp extends React.Component {
  render() {
    return (
      <div className='main'>
        <Header />
        <div className='container'>
          <div className='sidebar'><Sidebar /></div>
          <div className='content'>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
