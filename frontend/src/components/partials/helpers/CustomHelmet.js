import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'




/**
 * Adds react helmet element in a short way
 * 
 * @param {Object} props : properties of the element
 *      @param {String} props.external : determines if the details is external or not
 *      @param {String} props.title : page title
 *      @param {String} props.description : page description
 * 
 * @return {Element} : react helmet element
 */
export default function CustomHelmet(props) {

    // translation hook
    const { t } = useTranslation()

    return (
        <Helmet>
            {/* titles */}
            <title>
                {
                    typeof props.title === 'string' ? t(props.title) :
                        props.external ? props.title?.[i18n.language] : t(props.title)
                } | KrdCars
            </title>
            <meta property="og:title"
                content={`${typeof props.title === 'string' ? t(props.title) :
                    props.external ? props.title?.[i18n.language] : t(props.title)
                    } | KrdCars`}
            />

            {/* descriptions */}
            <meta property="og:description"
                content={
                    typeof props.description === 'string' ? t(props.description) :
                        props.external ? props.description?.[i18n.language] : t(props.description)
                }
            />
            <meta name="description"
                content={
                    typeof props.description === 'string' ? t(props.description) :
                        props.external ? props.description?.[i18n.language] : t(props.description)
                }
            />

            {/* other metas */}
            <meta name="keywords" content={`KrdCars, cars, car pars, car shop, kurdstan cars, ${props.keywords?.join(', ')}`} />
            <meta property="og:url" content={window.location.href} />
        </Helmet>
    )
}

