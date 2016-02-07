import { combineReducers } from 'redux';

import dashboard from '../dashboard/dashboardReducer';
import peers from '../peers/peersReducer';
import { reducer as formReducer } from 'redux-form';
import { syncHistory, routeReducer } from 'react-router-redux';

var apps = (state = {}, action) => {
  console.log('reading action: ', action);
  return state;
};

console.log('mounting...');

export default combineReducers({
  apps,
  dashboard,
  peers,
  form: formReducer,
  routing: routeReducer
});
