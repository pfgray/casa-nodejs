
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

const validate = user => {
  const errors = {};
  if (!user.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)) {
    errors.email = 'Invalid email address';
  }
  if (!user.password) {
    errors.password = 'Required';
  } else if (!user.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (user.password !== user.confirmPassword) {
    errors.confirmPassword = 'Must be a number';
  }
  return errors;
};

const SignupEmail = (props) => {
  const {
    fields: { email, password, confirmPassword},
    handleSubmit,
    submitting
  } = props;
  console.log('rendering: ', fields);
  return (
    <div className='login-container container'>
      <form className='password-form' onSubmit={handleSubmit(onSignup)}>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <input type='text' placeholder='email' {...email} className={email.touched && email.error ? 'error' : ''}/>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <input type='password' placeholder='password' {...password} className={password.touched && password.error ? 'error' : ''}/>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <input type='password' placeholder='confirm password' {...confirmPassword} className={confirmPassword.error ? 'error' : ''}/>
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
  fields,
  validate
})(SignupEmail);
