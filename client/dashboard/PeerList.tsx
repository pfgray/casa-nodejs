/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import * as moment from 'moment';
import { NewPeerButton } from '../peers/Peers';

export default ({peers}) => {
  return peers.length < 1 ? (
    <div className="row">
    <div className="info-box col-sm-6 col-sm-offset-3">
      <h1>You don't have any repositories yet.</h1>
      <NewPeerButton />
    </div>
  </div>
  ) : (
    <div className="app-list">
      <table className='info-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='center'>Apps</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {peers.slice(0, 5).map((peer, i) =>
            <tr key={i}>
              <td className='col-60'>{peer.name}</td>
              <td className='col-20 accent center'>{peer.apps ? peer.apps.length : ''}</td>
              <td className='col-20'>{peer.lastUpdated ? moment(peer.lastUpdated).fromNow() : 'never'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
