import { routeActions } from 'react-router-redux';
import PeerService from './PeerService.ts';
import Peer from './Peer.ts';
import { typeName, isType, Action } from '../redux/redux-extras.ts';

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
