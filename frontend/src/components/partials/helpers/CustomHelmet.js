import React from 'react'
import { Helmet } from 'react-helmet'
import Language from './Language'




/**
 * Adds react helmet element in a short way
 * 
 * @return {Element} : react helmet element
 */
export default function CustomHelmet(props) {
    return (
        <Helmet>
            {/* titles */}
            <title>{props.title?.[Language.getLanguage()]} | KrdCars</title>
            <meta property="og:title" content={`${props.title?.[Language.getLanguage()]} | KrdCars`} />

            {/* descriptions */}
            <meta property="og:description" content={props.description?.[Language.getLanguage()]} />
            <meta name="description" content={props.description?.[Language.getLanguage()]} />

            {/* other metas */}
            <meta name="keywords" content={`KrdCars, cars, car pars, car shop, kurdstan cars, ${props.keywords?.join(', ')}`} />
            <meta property="og:url" content={window.location.href} />
        </Helmet>
    )
}
