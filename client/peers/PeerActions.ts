import { routeActions } from 'react-router-redux';
import PeerService from './PeerService.ts';
import Peer from './Peer.ts';
import { typeName, isType, Action } from '../common/redux-extras.ts';

const peerService = new PeerService();

@typeName("FetchPeersAction")
export class FetchPeersAction extends Action {}
@typeName("ReceivePeersAction")
export class ReceivePeersAction extends Action {
  constructor(public peers: Peer[]){
    super();
  }
}
@typeName("CreatePeerAction")
export class CreatePeerAction extends Action {}
@typeName("EditPeerAction")
export class EditPeerAction extends Action {}
@typeName("SyncPeerAction")
export class SyncPeerAction extends Action {
  constructor(public id: string){
    super();
  }
}
@typeName("EndSyncPeerAction")
export class EndSyncPeerAction extends Action {
  constructor(public id: string){
    super();
  }
}
@typeName("ConfirmDeletePeerAction")
export class ConfirmDeletePeerAction extends Action {
  constructor(public peerId: string){
    super();
  }
}
@typeName("CancelConfirmDeletePeerAction")
export class CancelConfirmDeletePeerAction extends Action {
  constructor(){
    super();
  }
}
@typeName("DeletePeerAction")
export class DeletePeerAction extends Action {
  constructor(public peerId: string){
    super();
  }
}
@typeName("EndDeletePeerAction")
export class EndDeletePeerAction extends Action {
  constructor(public peerId: string){
    super();
  }
}

export function receivePeers(peers: Peer[]): Action {
  return new ReceivePeersAction(peers);
}

export function fetchPeers(): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      peerService.getPeers()
      .then(peers => dispatch(new ReceivePeersAction(peers)))
      .catch(console.error);
      dispatch(new FetchPeersAction());
    };
}

export function createPeer(peer: Peer): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      peerService.createPeer(peer)
      .then(peer => {
        //todo: redirect back to peer list.
        dispatch(routeActions.push('/repos'));
      })
      .catch(console.error);
      dispatch(new CreatePeerAction());
    };
}

export function updatePeer(id: string, peer: Peer): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      peerService.updatePeer(id, peer)
      .then(peer => {
        console.log('updated peer...');
        //todo: redirect back to peer list.
        dispatch(routeActions.push('/repos'));
      });
      dispatch(new EditPeerAction());
    };
}

export function syncPeer(id: string): (d: any) => void {
  console.log('syncing peer:', id);
  return dispatch => {
      peerService.syncPeer(id)
      .then(peer => dispatch(new EndSyncPeerAction(id)))
      .catch(console.error);
      dispatch(new EndSyncPeerAction(id));
    };
}

export function confirmDeletePeer(peerId: string): Action {
  return new ConfirmDeletePeerAction(peerId);
}

export function cancelConfirmDeletePeer(): Action {
  return new CancelConfirmDeletePeerAction();
}

export function deletePeer(peerId: string) {
  return dispatch => {
    peerService.deletePeer(peerId)
    .then(() => {
      dispatch(new EndDeletePeerAction(peerId))
    });
    dispatch(new DeletePeerAction(peerId));
  }
}
