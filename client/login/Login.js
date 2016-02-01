
import React from 'react';

import './login.less';

export default React.createClass({
  render: function() {
    return (
      <div className='login-container'>
        <a className='btn link-btn' href='/auth/google'>
          <i className="fa fa-google"></i>
          <span>sign in with google</span>
        </a>
        <div>
          (more to come).
        </div>
      </div>
    );
  }
});
