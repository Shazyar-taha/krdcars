import React from 'react'
import { Route, useRouteMatch } from 'react-router'

import ContactIndex from './ContactIndex'
import AddInfo from './AddInfo'



/**
 *  @return {Element} : contact routes handler component
 */
export default function ContactRoutes() {

    // this route path
    const { url } = useRouteMatch()


    return (
        <>
            {/* contact root route */}
            <Route path={url} exact>
                <ContactIndex />
            </Route>

            {/* feedback route */}
            <Route path={`${url}/add-info`} exact>
                <AddInfo />
            </Route>
        </>
    )
}
