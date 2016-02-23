import StorefrontService from './StorefrontService.ts';
import Storefront from './Storefront.ts';
import { routeActions } from 'react-router-redux';

const storefrontService = new StorefrontService();

export class StorefrontActions {
  public static RECEIVE_STOREFRONTS: string = 'RECEIVE_STOREFRONTS';
  public static FETCH_STOREFRONTS: string = 'FETCH_STOREFRONTS';
  public static CREATE_STOREFRONT: string = 'CREATE_STOREFRONT';
  public static EDIT_STOREFRONT: string = 'EDIT_STOREFRONT';
}

export function receiveStorefronts(storefronts: Storefront[]): any {
  return {
    type: StorefrontActions.RECEIVE_STOREFRONTS,
    storefronts: storefronts
  }
}

export function fetchStorefronts(): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      storefrontService.getStorefronts()
      .then(storefronts => dispatch({
        type: StorefrontActions.RECEIVE_STOREFRONTS,
        storefronts: storefronts
      }))
      .catch(console.error);
      dispatch({type: StorefrontActions.FETCH_STOREFRONTS});
    };
}

export function createStorefront(storefront: Storefront): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      storefrontService.createStorefront(storefront)
      .then(storefront => {
        console.log('created storefront...');
        //todo: redirect back to storefront list.
        dispatch(routeActions.push('/storefronts'));
      })
      .catch(console.error);
      dispatch({type: StorefrontActions.CREATE_STOREFRONT});
    };
}

export function updateStorefront(id: string, storefront: Storefront): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      storefrontService.updateStorefront(id, storefront)
      .then(storefront => {
        console.log('updated storefront...');
        //todo: redirect back to storefront list.
        dispatch(routeActions.push('/storefronts'));
      });
      dispatch({type: StorefrontActions.EDIT_STOREFRONT});
    };
}
