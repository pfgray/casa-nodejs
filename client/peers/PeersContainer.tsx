/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { fetchPeers } from './PeerActions.ts';
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
  state => state.casa.peers,
  dispatch => ({
    dispatch: dispatch
  })
)(PeersContainer);
