import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from '../pages/dashboard/Dashboard';
import SignIn from '../pages/login/SignIn';
import Splash from '../pages/splash/Splash';
import Products from '../pages/products/Products';
import PageError from '../pages/error/PageError';

import PrivateRoute from './PrivateRoute';

const routes = {
    open: [
        {
          path: "/",
          exact: true,
          component: () => <Splash />,
        },
        {
          path: "/signin",
          component: () => <SignIn />,
        },
    ],
    private: [
        {
          path: "/dashboard",
          exact: true,
          component: () => <Dashboard />,
        },
        {
          path: "/products",
          component: () => <Products />,
        },
    ]
};

const Routes = () => (
    <BrowserRouter>
        <Switch>
            {routes.open.map((route, index) => <Route key={`Open-${index}`} path={route.path} exact={route.exact} component={route.component} />)}
            {routes.private.map((route, index) => <PrivateRoute key={`Private-${index}`} path={route.path} component={route.component} />)}
            <Route path="*" component={() => <PageError code="404" text="Page not found" />} />
        </Switch>
    </BrowserRouter>
)

    
export default Routes;