import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'




/**
 * Adds react helmet element in a short way
 * 
 * @return {Element} : react helmet element
 */
export default function CustomHelmet(props) {

    // translation hook
    const { t } = useTranslation()

    if (props.external) {
        return (
            <Helmet>
                {/* titles */}
                <title>{props.title?.[i18n.language]} | KrdCars</title>
                <meta property="og:title" content={`${props.title?.[i18n.language]} | KrdCars`} />

                {/* descriptions */}
                <meta property="og:description" content={props.description?.[i18n.language]} />
                <meta name="description" content={props.description?.[i18n.language]} />

                {/* other metas */}
                <meta name="keywords" content={`KrdCars, cars, car pars, car shop, kurdstan cars, ${props.keywords?.join(', ')}`} />
                <meta property="og:url" content={window.location.href} />
            </Helmet>
        )
    }
    else {
        return (
            <Helmet>
                {/* titles */}
                <title>{t(props.title)} | KrdCars</title>
                <meta property="og:title" content={`${t(props.title)} | KrdCars`} />

                {/* descriptions */}
                <meta property="og:description" content={`${t(props.description)} | KrdCars`} />
                <meta name="description" content={`${t(props.description)} | KrdCars`} />

                {/* other metas */}
                <meta name="keywords" content={`KrdCars, cars, car pars, car shop, kurdstan cars, ${props.keywords?.join(', ')}`} />
                <meta property="og:url" content={window.location.href} />
            </Helmet>
        )

    }

}
