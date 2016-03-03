/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { fetchPeers, syncPeer,
  deletePeer, confirmDeletePeer,
  cancelConfirmDeletePeer
} from './PeerActions.ts';
import Peers from './Peers.tsx';

class PeersContainer extends React.Component<any, any> {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(fetchPeers());
  }
  render() {
    return <Peers {...this.props}/>;
  }
}

export default connect(
  state => state.peers,
  dispatch => ({
    dispatch,
    syncPeer: id => dispatch(syncPeer(id)),
    deletePeer: id => dispatch(deletePeer(id)),
    confirmDeletePeer: id => dispatch(confirmDeletePeer(id)),
    cancelConfirmDeletePeer: id => dispatch(cancelConfirmDeletePeer())
  })
)(PeersContainer);
