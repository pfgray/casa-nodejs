/*
 * A dashboard with info on apps, peers, & storefronts.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Dashbox from './Dashbox';
import { fetchDashboard } from './DashboardActions';

import './dashboard.less';

import AppList from './AppList';
import PeerList from './PeerList';

const mapStateToProps = (state) => {
  return state.dashboard;
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
      <div className='dash content'>
        <div className='row'>
          <Dashbox title='Apps'><AppList apps={this.props.apps}/></Dashbox>
          <Dashbox title='Peers' link='/peers'>
            <PeerList peers={this.props.peers}/>
          </Dashbox>
        </div>
        <div className='row'>
          <Dashbox  title='Stores'>Box #3</Dashbox>
        </div>
      </div>
    ) : <span>loading...</span>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
