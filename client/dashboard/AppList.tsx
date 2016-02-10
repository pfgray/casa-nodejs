/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';

export default ({apps}) => {
  return apps.length < 1 ? (
    <div>You don't have any apps yet. Add some repositories to get some.</div>
  ) : (
    <div className="app-list">
      <ul style={{margin: '0'}}>
        {apps.slice(0, 5).map((app, i) =>
          <li key={i}>{app.original.use.title}</li>
        )}
      </ul>
    </div>
  );
};
