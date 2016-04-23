
import React from 'react';
import { reduxForm } from 'redux-form';
import LoginService from './LoginService';

export const fields = ['email', 'password'];
const loginService = new LoginService();

const onLogin = ({ email, password }) => {
  console.log('Submitting: ', email, password);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      loginService.login(email, password).then(() => {
        window.location = '/dashboard';
      }, reject);
    }, 1000);
  });
};

const validate = user => {
  const errors = {};
  if (!user.email) {
    errors.email = 'Required';
  }
  if (!user.password) {
    errors.password = 'Required';
  }
  return errors;
};

const LoginEmail = (props) => {
  const {
    fields: { email, password },
    handleSubmit,
    submitting
  } = props;
  return (
    <div className='login-container container'>
      <form className='password-form' onSubmit={handleSubmit(onLogin)}>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-4">
            <input type='text' placeholder='email'
              {...email} className={email.touched && email.error ? 'error' : ''}/>
          </div>
          <div className="col-sm-4 col-sm-offset-4">
            <input type='password' placeholder='password'
              {...password} className={password.touched && password.error ? 'error' : ''}/>
          </div>
          <div className="col-sm-4 col-sm-offset-4 submit-container">
            <button type="submit"
              className={'btn link-btn clear-btn' + (submitting ? ' loading' : '')}
              disabled={submitting}>
              {submitting ? <i className='fa fa-circle-o-notch fa-spin'/> : null} Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'emailLogin',
  fields,
  validate
})(LoginEmail);
