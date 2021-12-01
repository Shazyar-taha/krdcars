import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Container } from '@mui/material'

import Language from '../../../partials/helpers/Language'
import { InfoCenteredGrid, InfoTitle } from '../infoHelpers/infoComponents'



// component content
let componentContent = {
    head: {
        title: {
            en: 'Brands',
            kr: 'براندەکان'
        },
        description: {
            en: 'Brands list',
            kr: 'لیستی براندەکان'
        }
    },
    title: {
        en: 'Car Brands',
        kr: 'کۆمپانیاکانی بەرهەمهێنانی ئوتومبێل'
    },
}



/**
 *  @return {Element} : info brands page
 */
export default function InfoBrands() {

    // brand list state
    const [brands, setBrands] = useState([]);

    // get the brands list
    useEffect(() => {
        /**
        * @TODO : fetch from server
        */
        const response = [
            {
                title: { en: 'Mitsubishi', kr: 'میسۆبیشی' },
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/2381px-Mitsubishi_logo.svg.png'
            },
            {
                title: { en: 'Maseraty', kr: 'ماسێراتی' },
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcgsvwop0SIxlaP4knSlTeF8M-0MUQu2hc7g&usqp=CAU'
            },
        ]

        setBrands(response)
    }, [])


    return (
        <>
            {/* overriding document head */}
            <Helmet>
                <title>{componentContent.head.title[Language.getLanguage()]} | KrdCars</title>
                <meta name="description" content={componentContent.head.description[Language.getLanguage()]} />

                <meta property="og:title" content={`${componentContent.head.title[Language.getLanguage()]} | KrdCars`} />
                <meta property="og:description" content={componentContent.head.description[Language.getLanguage()]} />

                <meta name="keywords" content="KrdCars, cars, car pars, car shop, kurdstan cars" />
                <meta property="og:url" content={window.location.href} />
            </Helmet>


            <div className="info-route info-brands" dir="auto">
                <Container>

                    {/* info title */}
                    <InfoTitle title={componentContent.title} />

                    {/* brand list */}
                    <InfoCenteredGrid list={brands} fullUrl="/info/brands" />

                </Container>
            </div>
        </>
    )
}
