import PeerService from './PeerService.ts';
import Peer from './Peer.ts';
import { routeActions } from 'react-router-redux';

const peerService = new PeerService();

export interface PeerAction {
  type: PeerActions
  peers?: Peer[]
}

export enum PeerActions {
  RECEIVE_PEERS,
  FETCH_PEERS,
  CREATE_PEER,
  EDIT_PEER
}

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
      }));
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
        dispatch(routeActions.push('/peers'));
      });
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
        dispatch(routeActions.push('/peers'));
      });
      dispatch({type: PeerActions.EDIT_PEER});
    };
}
