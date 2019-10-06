import React from 'react'
import { Route, Redirect } from "react-router-dom";

import { isSignedIn } from '../modules/services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ 
        props => isSignedIn() 
            ? (<Component {...props} />)
            : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
        }
    />
);

export default PrivateRoute