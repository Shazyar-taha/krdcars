import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

import CustomHelmet from '../../../partials/helpers/CustomHelmet'
import DetailsFixer from '../../../partials/helpers/detailsFixer'
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


    // brand and model datas
    const [datas, setDatas] = useState({
        name: { en: '', kr: '' },
        details: [],
        carInformation: { en: '', kr: '' },
        image: '',
        availableYears: [],
    });

    // fetching the model details
    useEffect(() => {
        axios.get(`/apis/info/cars/brand/${brandName}/${modelUid}${search}`)
            .then(res => {
                res.data = DetailsFixer(res.data, 'configs.keywords.', ['name', 'availableYears', 'carInformation', 'img'])
                setDatas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [brandName, modelUid, search])


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
                        image={`data:image/jpg;base64,${datas.img}`}
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
