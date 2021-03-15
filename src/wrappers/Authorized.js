import React from 'react';
import { pathToRegexp } from 'path-to-regexp';
import Authorized from '../components/utils/Authorized';
import { Redirect } from 'react-router-dom'

function getRouteAuthority(path, routeData) {
  let authorities;
  routeData.forEach((route) => {
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      authorities = route.authority || authorities;
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
}

const AuthComponent = (props) => {
  const { location, routes = [], children } = props;
  return (
    <Authorized
      routeAuthority={getRouteAuthority(location.pathname, routes)}
      noMatch={<Redirect exact key={404} to='/exception/404' />}
    >
      <div>
        {children}
      </div>
    </Authorized>
  );
};

export default AuthComponent;