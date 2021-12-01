import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'

import { InfoCenteredGrid, InfoTitle } from '../infoHelpers/infoComponents'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'



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
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


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
