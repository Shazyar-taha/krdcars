import React from 'react'

import './home.scoped.scss'
import HomeMain from './HomeMain/HomeMain'
import AdSection from './AdSection/AdSection'
import VehicleParts from './VehicleParts/VehicleParts'
import Store from './Store/Store'
import CustomHelmet from '../../partials/helpers/CustomHelmet'



// component content
let componentContent = {
    head: {
        title: {
            en: 'KRDCars | get more information about cars from Kurdistan',
            kr: 'KrdCars | زانیاری دەربارەی ئوتومبێلەکان'
        },
        description: {
            en: 'krdcars website for cars info and service in Kurdistan.',
            kr: 'وێبسایتی KrdCars تایبەت بە زانیاری و ڕێنمایی دەربارەی ئوتومبێلەکان'
        }
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
                <VehicleParts />

                {/* home page store section */}
                <Store />

            </div>
        </>
    )
}
