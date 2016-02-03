/*
 * A complete list of a user's (scope's) apps.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchPeers } from './PeerActions';

const mapStateToProps = (state) => {
  return state.casa.peers;
};

const mapDispatchToProps = (dispatch) =>  {
  return {
    dispatch: dispatch
  };
};

class Peers extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(fetchPeers());
  }
  render() {
    var isLoading = !_.has(this.props, 'loading') || this.props.loading;
    return isLoading ? (
      <span>Loading...</span>
    ) : (
      <div className='panel peer-list'>
        {this.props.peers.map(peer =>
          <div key={peer._id}>
            <span>{peer.name}</span>
            <span>{peer.payload_url}</span>
            <span>{peer.last_updated}</span>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Peers);
