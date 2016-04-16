
import React from 'react';
import { reduxForm } from 'redux-form';
import SignupService from './SignupService';

export const fields = [ 'email', 'password', 'confirmPassword' ];
const signupService = new SignupService();

const onSignup = (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      signupService.signup(values).then(resolve, reject);
    }, 1000);
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
            <button type="submit"
              className={'btn link-btn clear-btn' + (submitting ? ' loading' : '')}
              disabled={submitting}>
              {submitting ? <i className='fa fa-circle-o-notch fa-spin'/> : null} Signup
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
