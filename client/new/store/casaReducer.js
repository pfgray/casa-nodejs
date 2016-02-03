import { combineReducers } from 'redux';

import dashboard from '../dashboard/dashboardReducer';

var apps = (state = {}, action) => {
  console.log('got action: ', action);
  return state;
};

export default combineReducers({
  apps,
  dashboard
});
