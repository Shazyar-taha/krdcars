import React from 'react'

import './home.scoped.scss'
import HomeMain from './HomeMain/HomeMain'



/**
 *  @return {Element} : home page
 */
export default function Home() {
    return (
        <div className="home-page">

            {/* main section of homepage */}
            <HomeMain />

        </div>
    )
}
