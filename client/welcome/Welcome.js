import React from 'react';
import { Link } from 'react-router';

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome-page container">
        <div className='row'>
          <h1>CASA</h1>
          <div className='subtitle'>
            Create a community of applications!
          </div>
          <div className='col-sm-4 col-sm-offset-4'>
            <Link className='btn link-btn clear-btn fill' to='/signup'>
              Signup
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
