
import React from 'react';
import ReactDOM from 'react-dom';

import './main.less';

var RootCasaNode = React.createClass({
  render: function() {
    return (
      <div className="casa-app">lulz
      </div>
    );
  }
});

ReactDOM.render(
  <RootCasaNode />,
  document.getElementById('content')
);
