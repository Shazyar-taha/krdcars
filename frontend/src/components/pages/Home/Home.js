import React from 'react'
import { Helmet } from 'react-helmet'

import './home.scoped.scss'
import HomeMain from './HomeMain/HomeMain'
import AdSection from './AdSection/AdSection'
import VehicleParts from './VehicleParts/VehicleParts'
import Store from './Store/Store'
import Language from '../../partials/helpers/Language'



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
            <Helmet>
                <title>{componentContent.head.title[Language.getLanguage()]}</title>
                <meta name="description" content={componentContent.head.description[Language.getLanguage()]} />

                <meta property="og:title" content={componentContent.head.title[Language.getLanguage()]} />
                <meta property="og:description" content={componentContent.head.description[Language.getLanguage()]} />
                
                <meta name="keywords" content="KrdCars, cars, car pars, car shop, kurdstan cars" />
                <meta property="og:url" content={window.location.href} />
            </Helmet>


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
