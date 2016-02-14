import { combineReducers } from 'redux';

import dashboard from '../dashboard/dashboardReducer';
import peers from '../peers/peersReducer';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';
import editPeerReducer from '../peers/edit/editPeerReducer';
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
  form: formReducer,
  routing: routeReducer,
  formData: combineReducers({
    editPeer: editPeerReducer
  })
});
