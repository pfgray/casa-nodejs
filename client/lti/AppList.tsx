
import * as React from 'react';
import App from './App.tsx';
import { Input } from 'react-bootstrap';
import { UpdateSearchTextAction } from './appStore/AppStoreActions.ts'; 

function containsStr(str1, str2){
  return str1 && str2 &&
      str1 !== '' && str2 !== '' &&
      str1.toLowerCase().indexOf(str2.toLowerCase()) > -1;
}

const updateSearch = dispatch => event => 
  dispatch(new UpdateSearchTextAction(event.target.value));

export default ({ dispatch, loading, apps, searchText }) => {
  const trimmed = searchText.trim();
  const terms = searchText.split(' ');
  var filtered = trimmed === '' ? apps :
    _.filter(apps as any[], app => {
      var { title, description } = app.casaDescriptor.attributes.use;
      return _.some([title, description], attr => {
        return _.some(terms, term => containsStr(attr, term));
      });
  });



  var apps = filtered.map(app => <App app={app} highlights={terms}/>);

  var appList = !loading ? apps : (
    <div className='loading-container'>
      <i className="fa fa-circle-o-notch fa-spin"></i>
    </div>
  );

  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-8 col-sm-offset-2'>
          <div className='search-box'>
            <Input type='text' placeholder='Find' 
                   value={searchText} onChange={updateSearch(dispatch)} />
          </div>
        </div>
      </div>
      <div>
        <div className='app-store-list'>
          {appList}
        </div>
      </div>
    </div>
  );
}
