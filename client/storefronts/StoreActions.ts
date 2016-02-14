import StorefrontService from './StorefrontService.ts';
import { routeActions } from 'react-router-redux';

const storeService = new StorefrontService();

export interface StoreAction {
  type: StoreActions
  peers?: Peer[]
  id?: string
}

export enum StoreActions {
  RECEIVE_STORES = 'RECEIVE_STORES',
  FETCH_STORES = 'FETCH_STORES'
};

export function receivePeers(peers: Peer[]): PeerAction {
  return {
    type: PeerActions.RECEIVE_PEERS,
    peers: peers
  }
}

export function fetchPeers(): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      peerService.getPeers()
      .then(peers => dispatch({
        type: PeerActions.RECEIVE_PEERS,
        peers: peers
      }))
      .catch(console.error);
      dispatch({type: PeerActions.FETCH_PEERS});
    };
}

export function createPeer(peer: Peer): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      peerService.createPeer(peer)
      .then(peer => {
        console.log('created peer...');
        //todo: redirect back to peer list.
        dispatch(routeActions.push('/repos'));
      })
      .catch(console.error);
      dispatch({type: PeerActions.CREATE_PEER});
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
      dispatch({type: PeerActions.EDIT_PEER});
    };
}

export function syncPeer(id: string): (d: any) => void {
  console.log('syncing peer:', id);
  return dispatch => {
      peerService.syncPeer(id)
      .then(peer => {
        console.log('synced peer...');
        //todo: redirect back to peer list.
        dispatch({type: PeerActions.END_SYNC_PEER, id});
      })
      .catch(console.error);
      dispatch({type: PeerActions.SYNC_PEER, id});
    };
}
