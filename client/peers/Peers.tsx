import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Link } from 'react-router';

import './peers.less';

const Info = (props) => (
  <div className='info'>
    <span className='label'>{props.label}</span>
    <span className='median'>:</span>
    <span className='text'>{props.children}</span>
  </div>
)

const Peer = (peer) => {
  return (
    <div key={peer._id} className='panel peer'>
      <h3 className='title'>{peer.name}</h3>
      <Info label='Payload Url'>{peer.payloadUrl}</Info>
      <Info label='Last Updated'>{peer.lastUpdated ? moment(peer.lastUpdated).fromNow() : 'never'}</Info>
      {/*<Link to={`/peers/edit/${peer._id}`}>edit</Link> TODO: make the server support this*/}
    </div>
  );
}

export default (props) => {
  return props.loading ? (
    <span>Loading...</span>
  ) : (
    <div className='content peer-list'>
      <div className='peer-options'>
        <Link className='btn link-btn' to='/peers/new'>
          <i className='fa fa-plus' />New Peer
        </Link>
      </div>
      {props.peers.map(peer => <Peer {...peer}/>)}
    </div>
  );
}
