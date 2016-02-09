/*
 * A complete list of a user's (scope's) apps.
 */
import React from 'react';

import moment from 'moment';

export default ({peers}) => {
  return (
    <div className="app-list">
      <table className='info-table'>
        <tr>
          <th>Name</th>
          <th>Last Updated</th>
        </tr>
        {peers.slice(0, 5).map((peer, i) =>
          <tr key={i}>
            <td className='col-70'>{peer.name}</td>
            <td className='col-30'>{peer.lastUpdated ? moment(peer.lastUpdated).fromNow() : 'never'}</td>
          </tr>
        )}
      </table>
    </div>
  );
};
