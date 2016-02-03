/*
 * A dashboard with info on apps, peers, & storefronts.
 */
import React from 'react';
import { connect } from 'react-redux';

import Dashbox from './Dashbox';
import { fetchDashboard } from './DashboardActions';

import './dashboard.less';


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
    //invoke action
    console.log("seeing: ", this.props);
    this.props.dispatch(fetchDashboard());
  }
  render () {
    return (
      <div className='dash'>
        <div className='row'>
          <Dashbox title='Apps'>{JSON.stringify(this.props)}Box #1</Dashbox>
          <Dashbox title='Peers'>Box #2</Dashbox>
        </div>
        <div className='row'>
          <Dashbox  title='Stores'>Box #3</Dashbox>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
