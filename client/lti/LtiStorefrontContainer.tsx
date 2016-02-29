/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import LtiStorefront from './LtiStorefront.tsx';

import { fetchStorefront } from './appStore/AppStoreActions';

class LtiStorefrontContainer extends React.Component<any, any> {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(fetchStorefront(this.props.lti.store));
  }
  render() {
    return <LtiStorefront {...this.props} />;
  }
}

export default connect(
  state => ({
    appStore: state.appStore,
    lti: state.lti,
    env: state.env
  }),
  dispatch => ({ dispatch })
)(LtiStorefrontContainer);
