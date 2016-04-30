import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Link } from 'react-router';

export const NewStorefrontButton = () => (
  <Link className='btn link-btn' to='/storefronts/new'>
    <i className='fa fa-plus' />New Store
  </Link>
);

const Storefront = (props) => {
  const { storefront, sync, domain } = props;
  return (
    <div key={storefront._id} className='panel entity'>
      <h3 className='title'>{storefront.name}</h3>
      <div className="storefront-info">
        <ConfigValue label='Lti url'
          value={domain + "/stores/" + storefront._id + "/lti"} />
        <ConfigValue label='Xml config'
          value={domain + "/stores/" + storefront._id + "/config.xml"} />
        {_.flatMap(storefront.keypairs, keypair => [
          <ConfigValue label='key' value={keypair.key} />,
          <ConfigValue label='secret' value={keypair.secret} />
        ])}
      </div>
    </div>
  );
}

const StorefrontList = (props) => {
  return props.storefronts.length < 1 ? (
    <div className='panel jumbotron'>
      <i className="fa fa-database"></i>
      <h1>You don't seem to have any stores.</h1>
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

const ConfigValue = ({label, value}) => (
  <div className='config-pair'>
    <span>{label}:</span>
    <div className='config-value'>
      <div className='input-group'>
        <input type='text' className='form-control' value={value} readOnly/>
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={copyText(value)}>
            <i className='fa fa-clipboard'/>
          </button>
        </span>
      </div>
    </div>
  </div>
);

const copyText = text => (
  () => window.prompt("Copy to clipboard: Ctrl+C, Enter", text)
);
