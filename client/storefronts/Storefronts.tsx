import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Link } from 'react-router';

const NewStorefrontButton = () => (
  <Link className='btn link-btn' to='/storefronts/new'>
    <i className='fa fa-plus' />New Storefront
  </Link>
);

const Storefront = (props) => {
  const { storefront, sync, domain } = props;
  return (
    <div key={storefront._id} className='panel entity'>
      <h3 className='title'>{storefront.name}</h3>
      <div>
        <span>Lti url: </span>
        <span>{domain + "/stores/" + storefront._id + "/lti"}</span>
        <div>
          {storefront.keypairs.map(keypair =>
            <div>
              <div>key: {keypair.key}</div>
              <div>secret: {keypair.secret}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const StorefrontList = (props) => {
  return props.storefronts.length < 1 ? (
    <div className='panel jumbotron'>
      <i className="fa fa-database"></i>
      <h1>You don't seem to have any storefronts.</h1>
      <NewStorefrontButton />
    </div>
  ) : (
    <div>
      {props.storefronts.map(storefront =>
        <Storefront key={storefront._id} storefront={storefront} domain={props.domain} />)}
    </div>
  );
}

export default (props) => {
  const storefronts = props.storefronts.storefronts;
  const env = props.env;
  return props.loading ? (
    <span>Loading...</span>
  ) : (
    <div className='content entity-list'>
      <StorefrontList storefronts={storefronts} domain={env.domain} />
      <div className='entity-options'>
        {storefronts.length > 0 ? (
          <NewStorefrontButton />
        ) : (<span></span>)}
      </div>
    </div>
  );
}
