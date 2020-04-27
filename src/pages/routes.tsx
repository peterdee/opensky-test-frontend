import React from 'react';
import {
  Route,
  Switch,
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

export default (): React.ReactElement => (
  <Switch>
    {routes.map(({ path, component, exact }) => (
      <Route
        key={path}
        path={path}
        exact={exact}
        component={component}
      />
    ))}
  </Switch>
);
