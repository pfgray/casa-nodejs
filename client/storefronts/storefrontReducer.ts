
interface Storefront {
  name: string
};

interface StorefrontState {
  stores: Storefront[]
};

const initialState: StorefrontState = {
  stores: []
};

//This only exists for when/if we add auth inside the client (need to set it without refreshing page)
export default function(state: StorefrontState = initialState, action: any): StorefrontState {
  switch(action){
    case PeerActions.RECEIVE_PEERS:
      return {
        loading: false,
        peers: action.peers
      };
  }
  return state;
}
