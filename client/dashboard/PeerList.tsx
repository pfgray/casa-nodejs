/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import * as moment from 'moment';

export default ({peers}) => {
  return peers.length < 1 ? (
    <div>You don't have any repositories yet.</div>
  ) : (
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
