import React from 'react'
import { Helmet } from 'react-helmet'
import { getLanguage } from './language'




/**
 * Adds react helmet element in a short way
 * 
 * @return {Element} : react helmet element
 */
export default function CustomHelmet(props) {
    return (
        <Helmet>
            {/* titles */}
            <title>{props.title?.[getLanguage()]} | KrdCars</title>
            <meta property="og:title" content={`${props.title?.[getLanguage()]} | KrdCars`} />

            {/* descriptions */}
            <meta property="og:description" content={props.description?.[getLanguage()]} />
            <meta name="description" content={props.description?.[getLanguage()]} />

            {/* other metas */}
            <meta name="keywords" content={`KrdCars, cars, car pars, car shop, kurdstan cars, ${props.keywords?.join(', ')}`} />
            <meta property="og:url" content={window.location.href} />
        </Helmet>
    )
}
