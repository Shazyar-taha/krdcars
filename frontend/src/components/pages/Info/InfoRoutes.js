import React from 'react'
import { Route, useRouteMatch } from 'react-router'

import InfoIndex from './InfoIndex'
import InfoBrands from './InfoBrands/InfoBrands'
import BrandModels from './InfoBrands/BrandModels'
import InfoCarParts from './InfoCarParts/InfoCarParts'



/**
 *  @return {Element} : info routes handler component
 */
export default function InfoRoutes() {

    // this route path
    const { path } = useRouteMatch()


    return (
        <>
            {/* info root route */}
            <Route path={path} exact>
                <InfoIndex />
            </Route>


            {/* info brands route */}
            <Route path={`${path}/brands`} exact>
                <InfoBrands />
            </Route>
            {/* brand preview */}
            <Route path={`${path}/brands/:brandId`} exact>
                <BrandModels />
            </Route>


            {/* info car parts route */}
            <Route path='/info/parts' exact>
                <InfoCarParts />
            </Route>
        </>
    )
}
