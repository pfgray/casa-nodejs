/*
 * A complete list of a user's (scope's) apps.
 */
import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPeer } from '../PeerActions';

import EditPeerForm from './EditPeerForm';

export const fields = ['name', 'payloadUrl'];

const submit = (values, dispatch) => {
  console.log('now submitting...', values);
  dispatch(createPeer(values));
};

class EditPeerFormWrapper extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return <EditPeerForm {...this.props} createPeer={submit}/>;
  }
}

const formComponent = reduxForm({
  form: 'editPeer',
  fields
})(EditPeerFormWrapper);

//we also need access to dispatch, & the current pathname
export default connect(
  state => ({
    pathname: state.routing.location.pathname
  }),
  (dispatch) => ({dispatch})
)(formComponent);
