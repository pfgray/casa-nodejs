import { isType, Action } from '../../common/redux-extras.ts';
import { App } from './App.ts';
import {
  FetchAppStoreAction,
  ReceiveAppStoreAction
} from './AppStoreActions.ts';

interface AppStoreState {
  loading: boolean,
  appStore: App[]
}

const initialState: AppStoreState = {
  loading: true,
  appStore: []
};

//This only exists for when/if we add auth inside the client (need to set it without refreshing page)
export default function(state: AppStoreState = initialState, action: Action): AppStoreState {
  if(isType(action, FetchAppStoreAction)){
    return Object.assign({}, state, {
      loading: true
    });
  } else if(isType(action, ReceiveAppStoreAction)){
    return Object.assign({}, state, {
      loading: false,
      appStore: action.appStore
    });
  }
  return state;
}
