import {
  RECEIVE_DASHBOARD
} from './DashboardActions';


export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_DASHBOARD:
      return action.dashboard;
    default:
      return state;
  }
};
