import { connect } from 'react-redux';

import Apps from './Apps';
//import { increment } from '../actionsCreators';

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    value: state.apps
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    dispatch:dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Apps);
