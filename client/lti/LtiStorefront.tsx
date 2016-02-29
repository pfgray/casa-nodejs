
import * as React from 'react';
import AppList from './AppList.tsx';

export default (props) => {
  const apps = props.appStore.appStore;
  return (
    <div>
      <AppList {...props.appStore} apps={apps} />
    </div>
  );
};
