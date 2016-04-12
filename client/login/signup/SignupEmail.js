
import React from 'react';
import { reduxForm } from 'redux-form';
import SignupService from './SignupService';

export const fields = [ 'email', 'password', 'confirmPassword' ];
const signupService = new SignupService();

const onSignup = (values, dispatch) => {
  console.log('submitting: ', values);
  return new Promise((resolve, reject) => {
    signupService.signup(values).then(resolve, reject);
  });
};

const SignupEmail = (props) => {
  const {
    fields: { email, password, confirmPassword},
    handleSubmit,
    submitting
  } = props;
  return (
    <div className='login-container container'>
      <form className='password-form' onSubmit={handleSubmit(onSignup)}>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <input type='text' placeholder='email' {...email}/>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <input type='password' placeholder='password' {...password}/>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <input type='password' placeholder='confirm password' {...confirmPassword}/>
          </div>
          <div className="col-sm-4 col-sm-offset-4 submit-container">
            <button type="submit" className='btn link-btn clear-btn' disabled={submitting}>
              {submitting ? <i/> : null} Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'emailSignup',
  fields
})(SignupEmail);
