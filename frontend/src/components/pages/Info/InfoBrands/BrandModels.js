import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router'
import { Container } from '@mui/material'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../../partials/helpers/PageGrid/PageGrid'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'



/**
 *  @return {Element} : info brand preview page
 */
export default function InfoBrandPreview() {

    // this route url
    const { url } = useRouteMatch()


    // brand name from the request params
    const { brandName } = useParams()

    // brand and model datas
    const [datas, setDatas] = useState({
        brand: { en: '', kr: '' },
        models: []
    });

    // fetching the models list
    useEffect(() => {
        /**
        * @TODO : send the brand name to server and validate it, then fetch get the models list
        */
        const response = // await fetch(`/api/brand/get-models/${brand}`)
        {
            brand: {
                en: brandName,
                kr: 'میسۆبیشی'
            },
            models: [
                {
                    url: 'item-1',
                    title: { en: 'item1', kr: 'بەرهەمی ١' },
                    description: {
                        en: 'Information about car problems and their best solution',
                        kr: 'باسکردن و خستنەڕووی کێشەکانی ئوتومبێل و خستنەڕووی باشترین چارەسەرەکان بۆی'
                    },
                },
            ]
        }

        // setting the datas
        setDatas({
            brand: response.brand,
            models: response.models
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={datas.brand} description={datas.brand} external />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={datas.brand} external />

                    {/* page list */}
                    <OutlinedGrid list={datas.models} fullUrl={url} external />

                </Container>
            </div>
        </>
    )
}
