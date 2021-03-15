import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

const RouterView = (props) => {
  return <Switch>
    {props.routes.map((route, idx) => {
      const { component: Component, redirect, wrapper: Wrapper, routes, path, ...props } = route;
      if (redirect) {
        return <Redirect exact key={idx} from={path} to={redirect} />
      } else {
        return <Route
          {...props}
          path={path}
          key={idx}
          exact={routes ? false : true}
          render={props => {
            const newprops = { ...props, routes};
            const com = Component ? <Component {...newprops} >{
              routes && <RouterView routes={routes} />
            }</Component> : <RouterView routes={routes} />;
            return Wrapper ? <Wrapper {...newprops}>{com}</Wrapper> : com
          }}
        />
      }
    })}
  </Switch>
}

export default RouterView;

