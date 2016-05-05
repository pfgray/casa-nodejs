import { combineReducers } from 'redux';

import dashboard from '../dashboard/dashboardReducer';
import peers from '../peers/peersReducer';
import storefronts from '../storefronts/storefrontReducer';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';
import editPeerReducer from '../peers/edit/editPeerReducer';
import editStorefrontReducer from '../storefronts/edit/editStorefrontReducer';
import currentUserReducer from './currentUserReducer';
import appStore from '../lti/appStore/appStoreReducer';

export default combineReducers({
  currentUser: currentUserReducer,
  dashboard,
  peers,
  storefronts,
  appStore,
  routing: routeReducer,
  env: () => ({ domain: window.domain }),
  lti: () => (window.casa.lti ? window.casa.lti : {}),
  form: formReducer,
  formData: combineReducers({
    editPeer: editPeerReducer,
    editStorefront: editStorefrontReducer
  })
});
