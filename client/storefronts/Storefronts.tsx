/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import { Link } from 'react-router';


const NewPeerButton = () => (
  <Link className='btn link-btn' to='/stores/new'>
    <i className='fa fa-plus' />New Storefront
  </Link>
);

const StorefrontList = () => {
  return <span></span>;
}

export default (props) => {
  return (
    <div className='content peer-list'>
      <div className='peer-options'>
        {props.stores.length > 0 ? (
          <NewPeerButton />
        ) : (<span></span>)}
      </div>
      <StorefrontList {...props} />
    </div>
  );
}
