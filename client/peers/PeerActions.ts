import PeerService from './PeerService.ts';
import Peer from './Peer.ts';

const peerService = new PeerService();

export interface PeerAction {
  type: PeerActions
  peers?: Peer[]
}

export enum PeerActions {
  RECEIVE_PEERS,
  FETCH_PEERS,
  CREATE_PEER
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
      });
      dispatch({type: PeerActions.CREATE_PEER});
    };
}
