import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isUserAdmin} from "../services/AuthService";

const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        isUserAdmin()
            ? <Component {...props} />
            : <Redirect to='/login'/>
    )}/>
);

export default ProtectedRoute;
