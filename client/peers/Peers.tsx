import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';

import './peers.less';

export default (props) => {
  return props.loading ? (
    <span>Loading...</span>
  ) : (
    <div className='content peer-list'>
      {props.peers.map(peer =>
        <div key={peer._id} className='panel peer'>
          <h3 className='title'>{peer.name}</h3>
          <p>{peer.payloadUrl}</p>
          <p>{moment(peer.lastUpdated).fromNow()}</p>
        </div>
      )}
    </div>
  );
}
