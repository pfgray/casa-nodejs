import React from 'react';

import './header.less';

let Header = ({user}) => {
  var profile = user ? (
    <div className='user-profile'>{user.name}</div>
  ) : null;
  return (
    <div className='header'>
      <div className='logo'>CASA</div>
      {profile}
    </div>
  );
};

export default Header;
