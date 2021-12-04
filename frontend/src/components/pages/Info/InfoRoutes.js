import React from 'react'
import { Route, useRouteMatch } from 'react-router'

import InfoIndex from './InfoIndex'
import InfoBrands from './InfoBrands/InfoBrands'
import BrandModels from './InfoBrands/BrandModels'
import InfoCarParts from './InfoCarParts/InfoCarParts'
import InfoDrivingWorks from './InfoDrivingWorks/InfoDrivingWorks'
import InfoCarProblems from './InfoCarProblems/InfoCarProblems'



/**
 *  @return {Element} : info routes handler component
 */
export default function InfoRoutes() {

    // this route path
    const { url } = useRouteMatch()


    return (
        <>
            {/* info root route */}
            <Route path={url} exact>
                <InfoIndex />
            </Route>


            {/* info brands route */}
            <Route path={`${url}/brands`} exact>
                <InfoBrands />
            </Route>
            {/* brand preview */}
            <Route path={`${url}/brands/:brandName`} exact>
                <BrandModels />
            </Route>


            {/* info car parts route */}
            <Route path={`${url}/parts`} exact>
                <InfoCarParts />
            </Route>


            {/* info driving works route */}
            <Route path={`${url}/driving-works`} exact>
                <InfoDrivingWorks />
            </Route>


            {/* info driving works route */}
            <Route path={`${url}/car-problems`} exact>
                <InfoCarProblems />
            </Route>
        </>
    )
}
