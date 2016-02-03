/*
 * A dashboard with info on apps, peers, & storefronts.
 */
import React from 'react';
import Dashbox from './Dashbox';

import './dashboard.less';

export default (props) => (
  <div className='dash'>
    <div className='row'>
      <Dashbox title='Apps'>{JSON.stringify(props)}Box #1</Dashbox>
      <Dashbox title='Peers'>Box #2</Dashbox>
    </div>
    <div className='row'>
      <Dashbox  title='Stores'>Box #3</Dashbox>
    </div>
  </div>
);
