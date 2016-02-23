/*
 * A complete list of a user's (scope's) apps.
 */
import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { fetchStorefronts } from './StorefrontActions.ts';
import Storefronts from './Storefronts.tsx';

class StorefrontsContainer extends React.Component<any, any> {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(fetchStorefronts());
  }
  render() {
    return <Storefronts {...this.props}/>;
  }
}

export default connect(
  state => state.storefronts,
  dispatch => ({ dispatch })
)(StorefrontsContainer);
