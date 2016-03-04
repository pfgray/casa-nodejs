import React from 'react';
import { Link } from 'react-router';
import FadeIn from '../ui/FadeIn.js';

export default class Welcome extends React.Component {
  render(){
    return (
      <FadeIn>
        <div className="welcome-page">
          <h1>CASA</h1>
          <div className='subtitle'>
            Create a community of applications!
          </div>
          <Link className='btn link-btn clear-btn' to='/login'>
            Login / Signup
          </Link>
        </div>
      </FadeIn>
    );
  }
}
