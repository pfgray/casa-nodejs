/*
 * A dashboard with info on apps, peers, & storefronts.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import Dashbox from './Dashbox';
import { fetchDashboard } from './DashboardActions';
import AppList from './AppList.tsx';
import PeerList from './PeerList.tsx';
import StorefrontList from './StorefrontList.tsx';

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
      <Grid className='dash'>
        <Row>
          <Col lg={6} md={12}>
            <Dashbox title='Apps'>
              <AppList apps={this.props.apps}/>
            </Dashbox>
          </Col>
          <Col lg={6} md={12}>
            <Dashbox title='Repositories' link='/repos'>
              <PeerList peers={this.props.peers}/>
            </Dashbox>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Dashbox title='Stores' link='/storefronts'>
              <StorefrontList storefronts={this.props.storefronts}/>
            </Dashbox>
          </Col>
        </Row>
      </Grid>
    ) : <span>loading...</span>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
