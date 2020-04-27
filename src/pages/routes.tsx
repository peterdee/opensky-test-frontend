import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from './home';
import Login from './login';

const routes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/home',
    component: Home,
    exact: true,
  },
];

export default (): React.ReactElement => {
  const isAuthenticated = Boolean(localStorage.getItem('isAuthenticated')) || false;

  return (
    <Switch>
      {routes.map(({ path, component, exact }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          component={component}
        />
      ))}
      {isAuthenticated ? <Redirect exact from="*" to="/home" /> : <Redirect exact from="*" to="/login" />}
    </Switch>
  );
};
