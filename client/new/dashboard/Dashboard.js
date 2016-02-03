/*
 * A dashboard with info on apps, peers, & storefronts.
 */
import React from 'react';
import { connect } from 'react-redux';

import Dashbox from './Dashbox';
import { fetchDashboard } from './DashboardActions';

import './dashboard.less';

import Apps from '../apps/Apps';

const mapStateToProps = (state) => {
  return state.casa.dashboard;
};

const mapDispatchToProps = (dispatch) =>  {
  return {
    dispatch: dispatch
  };
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.dispatch(fetchDashboard());
  }
  render () {
    console.log('rendering with: ', this.props.apps);
    return this.props.apps ? (
      <div className='dash'>
        <div className='row'>
          <Dashbox title='Apps'><Apps apps={this.props.apps}/></Dashbox>
          <Dashbox title='Peers'>Box #2</Dashbox>
        </div>
        <div className='row'>
          <Dashbox  title='Stores'>Box #3</Dashbox>
        </div>
      </div>
    ) : <span>loading...</span>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
