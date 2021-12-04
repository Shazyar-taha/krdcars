import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../../partials/helpers/PageGrid/PageGrid'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'



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

    // this route url
    const { url } = useRouteMatch()


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
                    url: 'product-1',
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


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={componentContent.title} />

                    {/* page list */}
                    <OutlinedGrid list={parts} fullUrl={url} />

                </Container>
            </div>
        </>
    )
}
