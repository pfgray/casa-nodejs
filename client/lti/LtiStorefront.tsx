
import * as React from 'react';

export default (props) => {
  return <div>...Storefront UI... loading: {props.loading} / {JSON.stringify(props, null, 4)}</div>;
};
