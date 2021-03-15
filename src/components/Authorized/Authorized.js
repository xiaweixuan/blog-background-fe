import React, { Fragment } from 'react';
import { CURRENT_USER_AUTHORITY } from './renderAuthorize';
import checkPermissions from './checkPermissions';

const Authorized = (props) => {
  const { routeAuthority, noMatch = null, children } = props;

  const childrenRenderer = typeof children === 'undefined' ? null : children;
  const dom = checkPermissions(routeAuthority, CURRENT_USER_AUTHORITY, childrenRenderer, noMatch);
  return <Fragment>{dom}</Fragment>;
};

export default Authorized;