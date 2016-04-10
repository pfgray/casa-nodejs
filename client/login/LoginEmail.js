
import React from 'react';

export default () => (
    <div className='login-container container'>
      <form className='password-form'>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <input type='text' placeholder='email'/>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <input type='password' placeholder='password'/>
          </div>
        </div>
      </form>
    </div>
);
