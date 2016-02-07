/*
 * A dashboard with info on apps, peers, & storefronts.
 */
import React from 'react';
import { Link } from 'react-router';

export default (props) => (
  <div className='panel dash-box'>
    {props.link ? (
      <Link to={props.link}><div className='title'>{props.title}</div></Link>
    ) : (
      <div className='title'>{props.title}</div>
    )}
    {props.children}
  </div>
);
