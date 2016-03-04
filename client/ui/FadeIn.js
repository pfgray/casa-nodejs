
import React from 'react';

export default React.createClass({
  getInitialState: function(){
    return {
      visible:false
    };
  },
  componentDidMount:function(){
    setTimeout(() => {
      this.setState({
        visible:true
      });
    }, this.props.timeout);
  },
  render: function() {
    return (
      <div className={this.props.className + ' fadein' + (this.state.visible ? ' visible': '')}>
          {this.props.children}
      </div>
    );
  }
});
