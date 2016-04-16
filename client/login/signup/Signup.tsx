
import * as React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div className='login-container container'>
        <div className='login-box row'>
          <div className="col-sm-4 col-sm-offset-4">
            <Link className='btn link-btn clear-btn' to='/signup/email'>
              <i className="fa fa-envelope-o"></i>
              <span>sign up with email</span>
            </Link>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <a className='btn link-btn clear-btn' href='/auth/google'>
              <i className="fa fa-google"></i>
              <span>sign up with google</span>
            </a>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            (more to come).
          </div>
        </div>
      </div>
    );
  }
});
