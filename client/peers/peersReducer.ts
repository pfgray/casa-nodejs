import { typeName, isType, Action } from '../common/redux-extras.ts';
import {
  FetchPeersAction,
  ReceivePeersAction,
  CreatePeerAction,
  EditPeerAction,
  SyncPeerAction,
  EndSyncPeerAction
} from './PeerActions.ts';
import Peer from './Peer.ts';

interface PeerState {
  loading: boolean
  peers: Peer[]
}

const initialState: PeerState = {
  loading: true,
  peers: []
};

export default function(state: PeerState = initialState, action: Action): PeerState {
  if(isType(action, ReceivePeersAction)){
    return {
      loading: false,
      peers: action.peers
    };
  } else if (isType(action, FetchPeersAction)){
    return {
      loading: true,
      peers: state.peers
    };
  } else if (isType(action, SyncPeerAction)){
    return Object.assign({}, state, {
      peers: mergeToPeerWithId(action.id, state.peers, {
        syncing: true
      })
    });
  } else if(isType(action, EndSyncPeerAction)){
    return Object.assign({}, state, {
      peers: mergeToPeerWithId(action.id, state.peers, {
        syncing: false
      })
    });
  } else {
    return state;
  }
}

const mergeToPeerWithId = (id: string, peers: any[], data: any) => {
  return peers.map(peer => peer._id === id ? Object.assign({}, peer, data) : peer);
}
