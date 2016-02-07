import * as React from 'react';
import { Link } from 'react-router';

import './header.less';

let Pathname = ({pathname}) => (
  <span className="pathname">{pathname}</span>
);

let UserProfile = ({currentUser}) => (
  <div className='user-profile'>{currentUser}</div>
);

let LoginButton = () => (
  <Link to='/login'>Login</Link>
);

export default ({currentUser, pathname}) => {
  var profile = currentUser ? UserProfile({currentUser}) : LoginButton();
  return (
    <div className='header'>
      <div className='logo'>CASA</div>
      <Pathname pathname={pathname} />
      <div className="header-right">{profile}</div>
    </div>
  );
};
