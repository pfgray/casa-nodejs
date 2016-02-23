/*
 * A complete list of a user's (scope's) apps.
 */
import React from 'react';
import { reduxForm } from 'redux-form';

import { createStorefront, updateStorefront } from '../StorefrontActions';
import { initializeEditStorefront } from './editStorefrontReducer';
import EditStorefrontForm from './EditStorefrontForm';
import StorefrontService from '../StorefrontService';

const storefrontService = new StorefrontService();


export const fields = ['name'];

class EditStorefrontFormWrapper extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    //if we're editing, initialize the storefront
    if(this.props.params.storefront){
      storefrontService.getStorefront(this.props.params.storefront).then(storefront =>
        this.props.dispatch(initializeEditStorefront(storefront))
      );
    }
  }
  submit(values, dispatch){
    console.log('now submitting...', values);
    if(this.props.params.storefront){
      dispatch(updateStorefront(this.props.params.storefront, values));
    } else {
      dispatch(createStorefront(values));
    }
  }
  render() {
    return <EditStorefrontForm {...this.props} createStorefront={this.submit.bind(this)}/>;
  }
}

export default reduxForm({
    form: 'editStorefront',
    fields
  },
  state => ({ // mapStateToProps
    initialValues: state.formData.editStorefront.storefront
  }),
  dispatch => ({dispatch})
)(EditStorefrontFormWrapper);
