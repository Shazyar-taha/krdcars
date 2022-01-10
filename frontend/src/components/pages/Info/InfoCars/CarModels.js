import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch } from 'react-router'
import { Container } from '@mui/material'
import axios from 'axios'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../../partials/helpers/PageGrid/PageGrid'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'
import detailsFixer from '../../../partials/helpers/detailsFixer'



/**
 *  @return {Element} : info car brands preview page
 */
export default function InfoCarsBrandsPreview() {

    // this route url
    const { url } = useRouteMatch()

    // brand name from the request params
    const { brandUid } = useParams()

    // page datas
    const [datas, setDatas] = useState({
        brand: { name: { en: '', kr: '' } },
        models: []
    });


    // fetching the brand details and models list
    useEffect(() => {
        axios.get(`/apis/info/cars/${brandUid}`)
            .then(res => {

                // fixing the details for brand
                res.data.brand = detailsFixer(res.data.brand, 'configs.keywords.',)

                setDatas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [brandUid])


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
