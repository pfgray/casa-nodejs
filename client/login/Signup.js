
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div className='login-container'>
        <div className='login-box'>
          <div>
            <Link className='btn link-btn clear-btn' to='/signup/email'>
              <i className="fa fa-envelope-o"></i>
              <span>sign up with email</span>
            </Link>
          </div>
          <div>
            <a className='btn link-btn clear-btn' href='/auth/google'>
              <i className="fa fa-google"></i>
              <span>sign up with google</span>
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
