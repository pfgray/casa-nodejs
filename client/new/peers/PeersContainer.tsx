/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { fetchPeers } from './PeerActions.ts';
import Peers from './Peers.tsx';

const mapStateToProps = (state) => {
  return state.casa.peers;
};

const mapDispatchToProps = (dispatch) =>  {
  return {
    dispatch: dispatch
  };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(PeersContainer);
