import React from 'react';
import { Link } from 'react-router';

import './sidebar.less';

const duration = 1000; //milliseconds

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count:0};
  }
  componentDidMount() {
    setInterval(() => {
      console.log("okay");
      this.setState({count: this.state.count+1});
    }, 200);
  }
  render() {
    return (
      <ul>
        <li className={this.state.count > 0 ? 'visible' : ''}>
          <Link to='/new' activeClassName='active'>
            <i className="fa fa-th"></i>
            <span className="label">Apps</span>
          </Link>
        </li>
        <li className={this.state.count > 1 ? 'visible' : ''}>
          <Link to='/peers' activeClassName='active'>
            <i className="fa fa-users"></i>
            <span className="label">Peers</span>
          </Link>
        </li>
        <li className={this.state.count > 2 ? 'visible' : ''}>
          <Link to='stores' activeClassName='active'>
            <i className="fa fa-gift"></i>
            <span className="label">Storefronts</span>
          </Link>
        </li>
      </ul>
    );
  }
}
