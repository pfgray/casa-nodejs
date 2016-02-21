/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import * as moment from 'moment';

export default ({storefronts}) => {
  return storefronts.length < 1 ? (
    <div>You don't have any stores yet.</div>
  ) : (
    <div className="app-list">
      <table className='info-table'>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {storefronts.slice(0, 5).map((store, i) =>
            <tr key={i}>
              <td className='col-70'>{store.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
