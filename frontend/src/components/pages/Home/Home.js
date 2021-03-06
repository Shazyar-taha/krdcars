import React from 'react'

import './home.scoped.scss'
import HomeMain from './HomeMain/HomeMain'
import AdSection from './AdSection/AdSection'
import CarParts from './CarParts/CarParts'
// import Store from './Store/Store'
import CustomHelmet from '../../partials/helpers/CustomHelmet'



// component content
let componentContent = {
    head: {
        title: 'home.head.title',
        description: 'home.head.description',
    }
}



/**
 *  @return {Element} : home page
 */
export default function Home() {
    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            <div className="home-page">

                {/* main section of homepage */}
                <HomeMain />

                {/* ad section */}
                <AdSection />

                {/* vehicle parts */}
                <CarParts />

            </div>
        </>
    )
}
