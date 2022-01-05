import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'
import InfoPreview from '../../../partials/helpers/InfoPreview/InfoPreview'
import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'



/**
 *  @return {Element} : info car model preview
 */
export default function ModelPreview() {


    // brand name from the request params
    const { brandName, modelUid } = useParams()

    // this url and query search
    const { pathname, search } = useLocation()
    const searchYear = new URLSearchParams(search).get('year')


    // brand and model datas
    const [datas, setDatas] = useState({
        name: { en: '', kr: '' },
        details: [],
        carInformation: { en: '', kr: '' },
        image: '',
        availableYears: [],
    });

    // get the datas list
    useEffect(() => {
        /**
        * @TODO : fetch from server
        */
        const response = {
            name: {
                en: modelUid,
                kr: 'مۆدێل'
            },
            brandName: {
                en: brandName,
                kr: 'براند'
            },
            carInformation: {
                en: 'car infos',
                kr: 'زانیاری ئوتومبێل'
            },
            image: '',
            carType: {
                en: 'xezani',
                kr: 'خێزانی'
            },
            availableYears: [1990, 2004, 2021]
        }

        // adding details array to model
        response.details = [
            { key: 'configs.keywords.brand_name', value: response.brandName },
            { key: 'configs.keywords.car_type', value: response.carType },
        ]

        // deleting details from the object
        delete response.brandName
        delete response.carType

        setDatas(response)
    }, [search])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={datas.name} description={datas.name} external />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={datas.name} details={datas.details} external />

                    {/* page infos */}
                    <InfoPreview
                        description={datas.carInformation}
                        image={datas.image}
                        imageAlt={datas.name}
                        subText={datas.availableYears}
                        subTextLinkTemplate={pathname}
                        external
                    />

                </Container>
            </div>
        </>
    )
}
