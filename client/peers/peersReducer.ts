import { PeerActions, PeerAction } from './PeerActions.ts';
import Peer from './Peer.ts';

interface PeerState {
  loading: boolean
  peers: Peer[]
}

const initialState: PeerState = {
  loading: true,
  peers: []
};

export default function(state: PeerState = initialState, action: PeerAction): PeerState {
  switch(action.type){
    case PeerActions.RECEIVE_PEERS:
      return {
        loading: false,
        peers: action.peers
      };
    case PeerActions.FETCH_PEERS:
      return {
        loading: true,
        peers: state.peers
      };
    case PeerActions.SYNC_PEER:
      return Object.assign({}, state, {
        peers: mergeToPeerWithId(action.id, state.peers, {
          syncing: true
        })
      });
    case PeerActions.END_SYNC_PEER:
      return Object.assign({}, state, {
        peers: mergeToPeerWithId(action.id, state.peers, {
          syncing: false
        })
      });
    default:
      return state;
  }
}

const mergeToPeerWithId = (id: string, peers: any[], data: any) => {
  return peers.map(peer => peer._id === id ? Object.assign({}, peer, data) : peer);
}
