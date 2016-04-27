import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Link } from 'react-router';
import { Modal, Button } from 'react-bootstrap';

const Info = (props) => {
  return (
    <div className='info'>
      <span className='identifier'>{props.label}</span>
      <span className='median'>:</span>
      <span className='text'>{props.children}</span>
    </div>
  );
};

export const NewPeerButton = () => (
  <Link className='btn link-btn' to='/repos/new'>
    <i className='fa fa-plus' />New Repository
  </Link>
);

const SyncButton = (props) => (
  <i onClick={() => props.sync(props.peer._id)}
     className={"fa fa-refresh" + (props.peer.syncing ? ' fa-spin' : '')}></i>
);

const ConfirmDeletePeerModal = (props) => (
  <Modal show={props.confirmingDeletePeer !== null}
    onHide={props.cancelConfirmDeletePeer}>
    <Modal.Header>
      <Modal.Title>Delete Repository</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete this repository?
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.cancelConfirmDeletePeer} className={'btn-link'}>Cancel</Button>
      <Button bsStyle="primary" onClick={() => props.deletePeer(props.confirmingDeletePeer)}>Yes</Button>
    </Modal.Footer>
  </Modal>
);

const DeleteButton = (props) => (
  <i onClick={() => props.confirmDeletePeer(props.peer._id)}
     className={"fa fa-trash" + (props.peer.deleting ? ' fa-spin' : '')}></i>
);

const Peer = (props) => {
  const { peer, sync, deletePeer, confirmDeletePeer } = props;
  return (
    <div key={peer._id} className='panel peer'>
      <h3 className='title'>
        {peer.name}
        <SyncButton sync={sync} peer={peer}/>
        <DeleteButton deletePeer={deletePeer}
          confirmDeletePeer={confirmDeletePeer} peer={peer} />
      </h3>
      <Info label='Payload Url'>{peer.payloadUrl}</Info>
      <Info label='Last Updated'>{peer.lastUpdated !== null ? moment(peer.lastUpdated).fromNow() : 'never'}</Info>
      {/**/}
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
      {props.peers.map(peer => <Peer key={peer._id}
        peer={peer} sync={props.syncPeer}
        confirmDeletePeer={props.confirmDeletePeer}
        deletePeer={props.deletePeer}/>)}
    </div>
  );
}

export default (props) => {
  console.log('uhhh:', props);
  return props.loading ? (
    <span>Loading...</span>
  ) : (
    <div className='content entity-list'>
      <ConfirmDeletePeerModal {...props} />
      <PeerList {...props} />
      <div className='entity-options'>
        {props.peers.length > 0 ? (
          <NewPeerButton />
        ) : (<span></span>)}
      </div>
    </div>
  );
}
