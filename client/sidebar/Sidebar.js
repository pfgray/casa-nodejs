import React from 'react';

import './sidebar.less';

export default class Header extends React.Component {
  render() {
    return (
      <ul>
        <li>Apps</li>
        <li>Peers</li>
        <li>Storefronts</li>
      </ul>
    );
  }
}
