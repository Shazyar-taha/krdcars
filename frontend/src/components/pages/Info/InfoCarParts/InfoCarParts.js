import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'

import { InfoOutlinedGrid, InfoTitle } from '../infoHelpers/infoComponents'



// component content
let componentContent = {
    head: {
        title: {
            en: 'Car Parts',
            kr: 'بەشەکانی ئوتومبێل'
        },
        description: {
            en: 'list of all car parts',
            kr: 'لیستی بەشەکانی ئوتومبێل'
        }
    },
    title: {
        en: 'Car Parts',
        kr: 'بەشەکانی ئوتومبێل'
    },
}



/**
 *  @return {Element} : info parts page
 */
export default function InfoCarParts() {

    // parts datas
    const [parts, setParts] = useState([]);

    // fetching the parts list
    useEffect(() => {
        /**
        * @TODO : fetch the parts list
        */
        const response = // await fetch(`/api/info/part`)
            [
                {
                    title: { en: 'item1', kr: 'بەرهەمی ١' },
                    description: {
                        en: 'Information about car problems and their best solution',
                        kr: 'باسکردن و خستنەڕووی کێشەکانی ئوتومبێل و خستنەڕووی باشترین چارەسەرەکان بۆی'
                    },
                },
            ]


        // setting the datas
        setParts(response)
    }, [])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            {/* info parts */}
            <div className="info-route info-parts" dir="auto">
                <Container>

                    {/* info title */}
                    <InfoTitle title={componentContent.title} />

                    {/* brand list */}
                    <InfoOutlinedGrid list={parts} fullUrl={`/parts`} />

                </Container>
            </div>
        </>
    )
}
