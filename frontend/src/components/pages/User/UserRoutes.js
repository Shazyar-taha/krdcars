import React from 'react';
import { Route } from 'react-router-dom';

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
            <Route path={`${url}/profile`} condition="loggedIn" reroutePath={`${url}/login`} exact>
                <Profile />
            </Route>

            {/* login route */}
            <Route path={`${url}/login`} condition="loggedOut" reroutePath={`${url}/profile`} exact>
                <Login />
            </Route>

            {/* register route */}
            <Route path={`${url}/register`} condition="loggedOut" reroutePath={`${url}/profile`} exact>
                <Register />
            </Route>

            {/* change password route */}
            <Route path={`${url}/change-password`} condition="loggedIn" reroutePath={`${url}/login`} exact>
                <ChangePassword />
            </Route>
        </>
    );
}
