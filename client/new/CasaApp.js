/*
 * Entry file for the CASA app.
 */
import React from 'react';

import Header from '../header/Header';
import '../styles/flat.less';

export default class CasaApp extends React.Component {
  render() {
    return (
      <div className="main">
        <Header />
        {this.props.children}
      </div>
    );
  }
}
