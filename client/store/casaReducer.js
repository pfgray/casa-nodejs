import { combineReducers } from 'redux';

import dashboard from '../dashboard/dashboardReducer';
import peers from '../peers/peersReducer';
import storefronts from '../storefronts/storefrontReducer';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';
import editPeerReducer from '../peers/edit/editPeerReducer';
import editStorefrontReducer from '../storefronts/edit/editStorefrontReducer';
import currentUserReducer from './currentUserReducer';

var apps = (state = {}, action) => {
  console.log('reading action: ', action);
  return state;
};

export default combineReducers({
  currentUser: currentUserReducer,
  apps,
  dashboard,
  peers,
  storefronts,
  form: formReducer,
  routing: routeReducer,
  env: () => ({ domain: window.domain }),
  formData: combineReducers({
    editPeer: editPeerReducer,
    editStorefront: editStorefrontReducer
  })
});
