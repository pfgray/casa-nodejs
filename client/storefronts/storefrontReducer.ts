import { StorefrontActions } from './StorefrontActions.ts';
import Storefront from './Storefront.ts';

interface StorefrontState {
  loading: boolean
  storefronts: Storefront[]
}

const initialState: StorefrontState = {
  loading: true,
  storefronts: []
};

export default function(state: StorefrontState = initialState, action: any): StorefrontState {
  console.log('received action:', action);
  switch (action.type) {
    case StorefrontActions.RECEIVE_STOREFRONTS:
      return {
        loading: false,
        storefronts: action.storefronts
      };
    case StorefrontActions.FETCH_STOREFRONTS:
      return {
        loading: true,
        storefronts: state.storefronts
      };
    default:
      return state;
  }
}

const mergeToStorefrontWithId = (id: string, storefronts: any[], data: any) => {
  return storefronts.map(storefront => storefront._id === id ? Object.assign({}, storefront, data) : storefront);
}
