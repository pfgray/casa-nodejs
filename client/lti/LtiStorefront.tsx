
import * as React from 'react';
import AppList from './AppList.tsx';

import './appStore.less';

export default (props) => {
  const apps = props.appStore.appStore;
  return (
    <div>
      <AppList {...props.appStore} apps={apps} />
    </div>
  );
};
