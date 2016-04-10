
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div className='login-container'>
        <div className='login-box'>
          <div>
            <Link className='btn link-btn clear-btn' to='/login/password'>
              <i className="fa fa-lock"></i>
              <span>password</span>
            </Link>
          </div>
          <div>
            <a className='btn link-btn clear-btn' href='/auth/google'>
              <i className="fa fa-google"></i>
              <span>sign in with google</span>
            </a>
          </div>
          <div>
            (more to come).
          </div>
        </div>
      </div>
    );
  }
});
