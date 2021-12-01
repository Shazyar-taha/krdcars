import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router'
import { Container } from '@mui/material'

import Language from '../../../partials/helpers/Language'
import { InfoOutlinedGrid, InfoTitle } from '../infoHelpers/infoComponents'



/**
 *  @return {Element} : info brand preview page
 */
export default function InfoBrandPreview() {

    // brand name from the request params
    const { brand } = useParams()

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
                en: brand,
                kr: 'میسۆبیشی'
            },
            models: [
                {
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
            <Helmet>
                <title>{datas.brand[Language.getLanguage()]} | KrdCars</title>
                <meta name="description" content={datas.brand[Language.getLanguage()]} />

                <meta property="og:title" content={`${datas.brand[Language.getLanguage()]} | KrdCars`} />
                <meta property="og:description" content={datas.brand[Language.getLanguage()]} />

                <meta name="keywords" content={`KrdCars, cars, car pars, car shop, kurdstan cars, ${datas.brand.en}`} />
                <meta property="og:url" content={window.location.href} />
            </Helmet>


            <div className="info-route info-brand-preview" dir="auto">
                <Container>

                    {/* info title */}
                    <InfoTitle title={datas.brand} />

                    {/* brand list */}
                    <InfoOutlinedGrid list={datas.models} fullUrl={`/info/brands/${brand}`} />

                </Container>
            </div>
        </>
    )
}
