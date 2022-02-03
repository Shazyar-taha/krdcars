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

    return (
        <>
            {/* profile root route */}
            <ProtectedRoute path="/user/profile" condition="loggedIn" reroutePath="/user/login" exact>
                <Profile />
            </ProtectedRoute>

            {/* login route */}
            <ProtectedRoute path="/user/login" condition="loggedOut" reroutePath="/user/profile" exact>
                <Login />
            </ProtectedRoute>

            {/* register route */}
            <ProtectedRoute path="/user/register" condition="loggedOut" reroutePath="/user/profile" exact>
                <Register />
            </ProtectedRoute>

            {/* change password route */}
            <ProtectedRoute path="/user/change-password" condition="loggedIn" reroutePath="/user/login" exact>
                <ChangePassword />
            </ProtectedRoute>
        </>
    );
}
