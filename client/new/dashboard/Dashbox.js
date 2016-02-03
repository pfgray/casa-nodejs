/*
 * A dashboard with info on apps, peers, & storefronts.
 */
import React from 'react';

export default (props) => (
  <div className='dash-box'>
    <div className='title'>{props.title}</div>
    {props.children}
  </div>
);
