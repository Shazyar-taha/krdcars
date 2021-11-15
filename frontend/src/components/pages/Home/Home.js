import React from 'react'

import './home.scoped.scss'
import HomeMain from './HomeMain/HomeMain'
import AdSection from './AdSection/AdSection'



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

        </div>
    )
}
