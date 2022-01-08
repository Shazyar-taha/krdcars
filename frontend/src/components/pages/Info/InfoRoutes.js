import React from 'react'
import { Route, useRouteMatch } from 'react-router'

import InfoIndex from './InfoIndex'
import InfoCars from './InfoCars/InfoCars'
import CarModels from './InfoCars/CarModels'
import ModelPreview from './InfoCars/ModelPreview'
import InfoCarParts from './InfoCarParts/InfoCarParts'
import CarPartPreview from './InfoCarParts/CarPartPreview'
import InfoDrivingWorks from './InfoDrivingWorks/InfoDrivingWorks'
import InfoCarProblems from './InfoCarProblems/InfoCarProblems'
import ProblemPreview from './InfoCarProblems/ProblemPreview'



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


            {/* info cars route */}
            <Route path={`${url}/cars`} exact>
                <InfoCars />
            </Route>
            {/* car brand preview */}
            <Route path={`${url}/cars/:brandUid`} exact>
                <CarModels />
            </Route>
            {/* car model preview */}
            <Route path={`${url}/cars/:brandUid/:modelUid`} exact>
                <ModelPreview />
            </Route>


            {/* info car parts route */}
            <Route path={`${url}/car-parts`} exact>
                <InfoCarParts />
            </Route>
            {/* car parts preview */}
            <Route path={`${url}/car-parts/:partUid`} exact>
                <CarPartPreview />
            </Route>


            {/* info driving works route */}
            <Route path={`${url}/driving-works`} exact>
                <InfoDrivingWorks />
            </Route>


            {/* info driving works route */}
            <Route path={`${url}/car-problems`} exact>
                <InfoCarProblems />
            </Route>
            {/* info driving works route */}
            <Route path={`${url}/car-problems/:problemUid`} exact>
                <ProblemPreview />
            </Route>
        </>
    )
}
