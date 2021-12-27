import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router'
import { Container } from '@mui/material'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../../partials/helpers/PageGrid/PageGrid'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'



/**
 *  @return {Element} : info car brands preview page
 */
export default function InfoCarsBrandsPreview() {

    // this route url
    const { url } = useRouteMatch()


    // brand name from the request params
    const { brandName } = useParams()

    // brand and model datas
    const [datas, setDatas] = useState({
        brand: { name: { en: '', kr: '' } },
        models: []
    });

    // fetching the models list
    useEffect(() => {
        /**
        * @TODO : send the brand name to server and validate it, then fetch get the models list
        */
        const response = // await fetch(`/api/cars/${brand}/get-models`)
        {
            brand: {
                name: {
                    en: brandName,
                    kr: 'میسۆبیشی'
                },
                founderName: {
                    en: '',
                    kr: ''
                },
                foundDate: '',
                headquartersLocation: {
                    en: '',
                    kr: ''
                },
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

        // adding details array to brand
        response.brand = {
            name: response.brand.name,
            details: [
                { key: 'configs.keywords.founder', value: response.brand.founderName },
                { key: 'configs.keywords.founded', value: 'هەلاو', singleValue: true },
                { key: 'configs.keywords.headquarters_location', value: response.brand.headquartersLocation },
            ]
        }

        // setting the datas
        setDatas(response)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={datas.brand.name} description={datas.brand.name} external />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={datas.brand.name} details={datas.brand.details} external />

                    {/* page list */}
                    <OutlinedGrid list={datas.models} fullUrl={url} external />

                </Container>
            </div>
        </>
    )
}
