const INITIALIZE_PEER_EDIT = 'INITIALIZE_PEER_EDIT';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_PEER_EDIT:
      return {
        peer: action.peer
      };
    default:
      return state;
  }
};

export const initializeEditPeer = peer => ({type: INITIALIZE_PEER_EDIT, peer});

export default reducer;
