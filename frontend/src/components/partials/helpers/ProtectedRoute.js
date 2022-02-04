import React, { useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';




/**
 * proteted route to loged in states
 * 
 * @param {Object} props : protected route props
 * @param {Component} props.children : component to render
 * @param {String} props.condition : route rendering condition {loggedIn | loggedOut}
 * @param {String} props.reroutePath : route to redirect to if condition is not met
 * @param {String} props.rest : rest of the 'react-router-dom' Route props
 * 
 * @return {Component} : protected route
 */
export default function ProtectedRoute({ children, condition, reroutePath, ...rest }) {

    const { pathname } = useLocation()
    const history = useHistory()

    // getting the current user state
    const user = useSelector(state => state.user)


    // checking the condition
    useEffect(() => {
        switch (condition) {

            // logged in condition, reroting user if no user logged in
            case 'loggedIn':
                if (!user) {
                    history.push(reroutePath)
                }
                break

            // logged out condition, reroting user if a user logged in
            case 'loggedOut':
                if (user) {
                    history.push(reroutePath)
                }
                break

            // nothing to show on bad conditions
            default:
                return null
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])


    // if no condition is provided returning null
    if (!condition) {
        return null
    }

    return <Route {...rest}>{children}</Route>;
}
