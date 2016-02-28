import { routeActions } from 'react-router-redux';
import AppStoreService from './AppStoreService.ts';
import { App } from './App.ts';
import { typeName, isType, Action } from '../../common/redux-extras.ts';

const appStoreService = new AppStoreService();

@typeName("FetchAppStoreAction")
export class FetchAppStoreAction extends Action {}
@typeName("ReceiveAppStoreAction")
export class ReceiveAppStoreAction extends Action {
  constructor(public appStore: App[]){
    super();
  }
}

export function fetchStorefront(id: string): (d: any) => void {
  //parentheses are required for typescript here to wrap the returning object.
  return dispatch => {
      appStoreService.getAppStore(id)
      .then(apps => dispatch(new ReceiveAppStoreAction(apps)))
      .catch(console.error);
      dispatch(new FetchAppStoreAction());
    };
}
