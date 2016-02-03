import {
  RECEIVE_PEERS,
  FETCH_PEERS
} from './PeerActions';


export default (state = {}, action) => {
  switch(action.type){
    case FETCH_PEERS:
      return Object.assign({}, {loading:true}, state);
    case RECEIVE_PEERS:
      return Object.assign({}, {
        loading: false,
        peers: action.peers
      });
    default:
      return state;
  }
};
