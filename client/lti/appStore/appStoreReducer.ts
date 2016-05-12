import { isType, Action } from '../../common/redux-extras.ts';
import { App } from './App.ts';
import {
  FetchAppStoreAction,
  ReceiveAppStoreAction,
  UpdateSearchTextAction
} from './AppStoreActions.ts';

interface AppStoreState {
  loading: boolean,
  appStore: App[],
  searchText: string
}

const initialState: AppStoreState = {
  loading: true,
  appStore: [],
  searchText: ''
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
  } else if(isType(action, UpdateSearchTextAction)){
    return Object.assign({}, state, {
      searchText: action.searchText
    });
  }
  return state;
}
