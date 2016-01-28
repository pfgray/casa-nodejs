
import React from 'react';
import ReactDOM from 'react-dom';

import './login.less';

var Login = React.createClass({
  loginWithGoogle: function(){
    window.location.href = '/auth/google';
  },
  render: function() {
    return (
      <div className="casa-login">
        <div className='login-container'>
          <button className='btn' onClick={this.loginWithGoogle}>
            <i className="fa fa-google"></i>
            <span>sign in with google</span>
          </button>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Login />,
  document.getElementById('content')
);
