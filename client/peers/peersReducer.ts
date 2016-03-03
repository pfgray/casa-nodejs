import { typeName, isType, Action } from '../common/redux-extras.ts';
import {
  FetchPeersAction,
  ReceivePeersAction,
  CreatePeerAction,
  EditPeerAction,
  SyncPeerAction,
  EndSyncPeerAction,
  ConfirmDeletePeerAction,
  DeletePeerAction,
  EndDeletePeerAction,
  CancelConfirmDeletePeerAction
} from './PeerActions.ts';
import Peer from './Peer.ts';

interface PeerState {
  loading: boolean
  peers: Peer[],
  confirmingDeletePeer: string
}

const initialState: PeerState = {
  loading: true,
  peers: [],
  confirmingDeletePeer: null
};

export default function(state: PeerState = initialState, action: Action): PeerState {
  if(isType(action, ReceivePeersAction)){
    return Object.assign({}, state, {
      loading: false,
      peers: action.peers
    });
  } else if (isType(action, FetchPeersAction)){
    return Object.assign({}, state, {
      loading: true,
      peers: state.peers
    });
  } else if (isType(action, SyncPeerAction)){
    return Object.assign({}, state, {
      peers: mergeToPeerWithId(action.id, state.peers, {
        syncing: true
      })
    });
  } else if (isType(action, EndSyncPeerAction)){
    return Object.assign({}, state, {
      peers: mergeToPeerWithId(action.id, state.peers, {
        syncing: false
      })
    });
  } else if (isType(action, ConfirmDeletePeerAction)){
    return Object.assign({}, state, {
      confirmingDeletePeer: action.peerId
    });
  } else if (isType(action, CancelConfirmDeletePeerAction)){
    console.log('yeah?')
    return Object.assign({}, state, {
      confirmingDeletePeer: null
    });
  } else if (isType(action, DeletePeerAction)){
    return Object.assign({}, state, {
      peers: mergeToPeerWithId(action.peerId, state.peers, {
        deleting: true
      })
    });
  } else if (isType(action, EndDeletePeerAction)){
    return Object.assign({}, state, {
      peers: state.peers.filter((peer:any) => peer._id !== action.peerId),
      confirmingDeletePeer: null
    });
  }  else {
    return state;
  }
}

const mergeToPeerWithId = (id: string, peers: any[], data: any) => {
  return peers.map(peer => peer._id === id ? Object.assign({}, peer, data) : peer);
}
