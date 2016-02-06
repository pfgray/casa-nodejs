import * as request from 'superagent';

export interface Peer {
  name: string
  payloadUrl: string
}

export interface PeerAction {
  type: PeerActions
  peers?: Peer[]
}

export enum PeerActions {
  RECEIVE_PEERS,
  FETCH_PEERS
}

export function receivePeers(peers: Peer[]): PeerAction {
  return {
    type: PeerActions.RECEIVE_PEERS,
    peers: peers
  }
}

export function fetchPeers(): (d: any) => PeerAction {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => ({
    type: PeerActions.FETCH_PEERS
  })
}
