
import * as React from 'react';
import App from './App.tsx';

function containsStr(str1, str2){
  return str1 && str2 &&
      str1 !== '' && str2 !== '' &&
      str1.toLowerCase().indexOf(str2.toLowerCase()) > -1;
}

export default (props) => {
  /*
  var trimmed = this.state.searchText.trim();
  var searches = this.state.searchText.split(' ');
  var filtered = trimmed === '' ? this.state.apps :
    _.filter(this.state.apps, function(app){
      var title = app.entity.attributes.use.title;
      var desc = app.entity.attributes.use.description;
      var appAttrs = [title, desc];
      return _.some(searches, function(searchTerm){
        return _.some(appAttrs, function(attr){
          return containsStr(attr, searchTerm);
        });
      });
  }.bind(this));
  */



  var apps = props.apps.map(function (app) {
    return (
      <div className='app-list'>
      <App app={app} />

           </div>);
  }.bind(this));
  //onClick={resolveHandler(app).clickHandler}
  //highlights={searches}/>

  var appList = !props.loading ? apps : (
    <div className='loading-container'>
      <i className="fa fa-circle-o-notch fa-spin"></i>
    </div>
  );

  return (
    <div>
      <div className='search-box'>
        <input
          type='text'
          placeholder='Find' />
      </div>
      <div className='box'>
        {appList}
      </div>
    </div>
  );
}
