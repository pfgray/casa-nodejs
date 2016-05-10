import { createStore } from 'redux';


interface UserState {
  user: any
}

const initialState: UserState = {
  user: (<any>window).user
};

//This only exists for when/if we add auth inside the client (need to set it without refreshing page)
const currentUserReducer = function(state: UserState = initialState, action: any): UserState {
  return state;
}
 
export default currentUserReducer;
