import React from 'react';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';

import './sidebar.less';

const links = [{
  path: '',
  label: 'Apps',
  comp: IndexLink,
  icon: 'fa-th'
},{
  path: '/peers',
  label: 'Peers',
  comp: Link,
  icon: 'fa-users'
},{
  path: '/stores',
  label: 'Storefronts',
  comp: Link,
  icon: 'fa-gift'
}];

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log('hmm:', links.length, props);
    this.fadeInterval = props.duration / links.length;
    this.state = {count: 0};
  }
  componentDidMount() {
    let increment = () => {
      if(this.state.count < links.length){
        console.log('incrementing', this.fadeInterval);
        this.setState({count: this.state.count + 1});
        setTimeout(increment, this.fadeInterval);
      }
    };
    setTimeout(increment);
  }
  render() {
    let liClasses = (i) => classNames({
      'visible': this.state.count > i
    });
    return (
      <ul>
        {links.map((link, i) =>
          <li key={link.path} className={liClasses(i)}>
            <link.comp to={link.path} activeClassName='active'>
              <i className={'fa ' + link.icon}></i>
              <span className='label'>{link.label}</span>
            </link.comp>
          </li>
        )}
      </ul>
    );
  }
}
