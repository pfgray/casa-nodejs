/*
 * A complete list of a user's (scope's) apps.
 */
import React from 'react';

export default ({apps}) => {
  return (
    <div className="app-list">
      <ul style={{margin: '0'}}>
        {apps.slice(0, 5).map((app, i) =>
          <li key={i}>{app.original.use.title}</li>
        )}
      </ul>
    </div>
  );
};
