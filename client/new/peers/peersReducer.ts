import { Peer, PeerActions, PeerAction } from './PeerActions.ts';

interface PeerState {
  loading: boolean
  peers: Peer[]
}

const initialState: PeerState = {
  loading: false,
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
    default:
      return state;
  }
}
