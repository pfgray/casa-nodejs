/*
 * A complete list of a user's (scope's) apps.
 */
import React from 'react';

import moment from 'moment';

export default ({peers}) => {
  return (
    <div className="app-list">
      <ul style={{margin: '0'}}>
        {peers.slice(0, 5).map((peer, i) =>
          <li key={i}>{peer.name}, {moment(peer.lastUpdated).fromNow()}</li>
        )}
      </ul>
    </div>
  );
};
