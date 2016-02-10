import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Link } from 'react-router';

import './peers.less';

const Info = (props) => {
  return (
    <div className='info'>
      <span className='label'>{props.label}</span>
      <span className='median'>:</span>
      <span className='text'>{props.children}</span>
    </div>
  );
};

const NewPeerButton = () => (
  <Link className='btn link-btn' to='/peers/new'>
    <i className='fa fa-plus' />New Repository
  </Link>
);

const SyncButton = (props) => (
  <i onClick={() => props.sync(props.peer._id)}
     className={"fa fa-refresh" + (props.peer.syncing ? ' fa-spin' : '')}></i>
);

const Peer = (props) => {
  const { peer, sync } = props;
  return (
    <div key={peer._id} className='panel peer'>
      <h3 className='title'>{peer.name} <SyncButton sync={sync} peer={peer}/></h3>
      <Info label='Payload Url'>{peer.payloadUrl}</Info>
      <Info label='Last Updated'>{peer.lastUpdated !== null ? moment(peer.lastUpdated).fromNow() : 'never'}</Info>
      {/*<Link to={`/peers/edit/${peer._id}`}>edit</Link> TODO: make the server support this*/}
    </div>
  );
}

const PeerList = (props) => {
  return props.peers.length < 1 ? (
    <div className='panel jumbotron'>
      <i className="fa fa-database"></i>
      <h1>You don't seem to have any repositories.</h1>
      <NewPeerButton />
    </div>
  ) : (
    <div>
      {props.peers.map(peer => <Peer key={peer._id} peer={peer} sync={props.syncPeer}/>)}
    </div>
  );
}

export default (props) => {
  return props.loading ? (
    <span>Loading...</span>
  ) : (
    <div className='content peer-list'>
      <div className='peer-options'>
        {props.peers.length > 0 ? (
          <NewPeerButton />
        ) : (<span></span>)}
      </div>
      <PeerList peers={props.peers} />
    </div>
  );
}
