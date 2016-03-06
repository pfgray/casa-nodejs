import * as React from 'react';
import { Link } from 'react-router';

/**
 * Paths which contain login info elsewhere, which shouldn't render topright login button
 */
const loginPaths = ['/', '/login']

const Pathname = ({pathname}) => (
  <span className="pathname">{pathname}</span>
);

const UserProfile = ({currentUser}) => {
  const {user} = currentUser;
  const pic = user && user.picture ? <img className='profile-picture' src={user.picture} /> : '';
  return (
    <div className='user-profile'>
      {/*currentUser.user.name*/}
      {pic}
    </div>
  )
};

const LoginButton = () => (
  <Link to='/login'>Login</Link>
);

export default ({currentUser, pathname}) => {
  console.log('path is:', pathname);
  const login = loginPaths.indexOf(pathname) > -1 ? '' : <LoginButton />;
  const profile = currentUser.user ? UserProfile({currentUser}) : login;
  //if it's the login path don't render
  return (
    <div className='header'>
      <div className='logo'>CASA</div>
      <Pathname pathname={pathname} />
      <div className="header-right">{profile}</div>
    </div>
  );
};
