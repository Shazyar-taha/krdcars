import React from 'react';

import ProtectedRoute from '../../partials/helpers/ProtectedRoute';
import Login from './Login';
import ChangePassword from './Profile/ChangePassword';
import Profile from './Profile/Profile';
import Register from './Register';



/**
 *  @return {Element} : info routes handler component
 */
export default function UserRoutes() {

    // this is a static route url, but cant use 'useRouteMatch' because it will carsh rerendering
    const url = '/user'

    return (
        <>
            {/* profile root route */}
            <ProtectedRoute path={`${url}/profile`} condition="loggedIn" reroutePath={`${url}/login`} exact>
                <Profile />
            </ProtectedRoute>

            {/* login route */}
            <ProtectedRoute path={`${url}/login`} condition="loggedOut" reroutePath={`${url}/profile`} exact>
                <Login />
            </ProtectedRoute>

            {/* register route */}
            <ProtectedRoute path={`${url}/register`} condition="loggedOut" reroutePath={`${url}/profile`} exact>
                <Register />
            </ProtectedRoute>

            {/* change password route */}
            <ProtectedRoute path={`${url}/change-password`} condition="loggedIn" reroutePath={`${url}/login`} exact>
                <ChangePassword />
            </ProtectedRoute>
        </>
    );
}
