/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';

export default ({apps}) => {
  return apps.length < 1 ? (
    <div>You don't have any apps yet. Add some repositories to get some.</div>
  ) : (
    <div className="app-list">
      <table className='info-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {apps.slice(0, 5).map((app, i) =>
            <tr key={i}>
              <td className='col-70'>{app.attributes.use.title}</td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
