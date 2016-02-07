import { combineReducers } from 'redux';

import dashboard from '../dashboard/dashboardReducer';
import peers from '../peers/peersReducer';

var apps = (state = {}, action) => {
  return state;
};

export default combineReducers({
  apps,
  dashboard,
  peers
});
