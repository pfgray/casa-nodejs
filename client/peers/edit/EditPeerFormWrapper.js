/*
 * A complete list of a user's (scope's) apps.
 */
import React from 'react';
import { reduxForm } from 'redux-form';

import { createPeer, updatePeer } from '../PeerActions';
import { initializeEditPeer } from './editPeerReducer';
import EditPeerForm from './EditPeerForm';
import PeerService from '../PeerService';

const peerService = new PeerService();


export const fields = ['name', 'payloadUrl'];

class EditPeerFormWrapper extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    //if we're editing, initialize the peer
    if(this.props.params.peer){
      peerService.getPeer(this.props.params.peer).then(peer =>
        this.props.dispatch(initializeEditPeer(peer))
      );
    }
  }
  submit(values, dispatch){
    console.log('now submitting...', values);
    if(this.props.params.peer){
      dispatch(updatePeer(this.props.params.peer, values));
    } else {
      dispatch(createPeer(values));
    }
  }
  render() {
    return <EditPeerForm {...this.props} createPeer={this.submit.bind(this)}/>;
  }
}

export default reduxForm({
    form: 'editPeer',
    fields
  },
  state => ({ // mapStateToProps
    initialValues: state.formData.editPeer.peer
  }),
  dispatch => ({dispatch})
)(EditPeerFormWrapper);
