import React from 'react'

import './home.scoped.scss'
import HomeMain from './HomeMain/HomeMain'
import AdSection from './AdSection/AdSection'
import VehicleParts from './VehicleParts/VehicleParts'
import Store from './Store/Store'



/**
 *  @return {Element} : home page
 */
export default function Home() {
    return (
        <div className="home-page">

            {/* main section of homepage */}
            <HomeMain />

            {/* ad section */}
            <AdSection />

            {/* vehicle parts */}
            <VehicleParts />

            {/* home page store section */}
            <Store />

        </div>
    )
}
