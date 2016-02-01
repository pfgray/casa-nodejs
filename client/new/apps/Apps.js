/*
 * A complete list of a user's (scope's) apps.
 */
import React from 'react';

export default class Apps extends React.Component {
  render() {
    return (
      <div className="app-list">
        <ul>
          <li>{"App 1"}</li>
          <li>{"App 2"}</li>
          <li>{"App 3"}</li>
        </ul>
      </div>
    );
  }
}
