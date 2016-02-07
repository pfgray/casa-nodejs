import * as React from 'react';
import * as _ from 'lodash';

export default (props) => {
  console.log("rendering peers with: ", props);
  return props.loading ? (
    <span>Loading...</span>
  ) : (
    <div className='panel peer-list'>
      {props.peers.map(peer =>
        <div key={peer._id}>
          <span>{peer.name}</span>
          <span>{peer.payload_url}</span>
          <span>{peer.last_updated}</span>
        </div>
      )}
    </div>
  );
}
