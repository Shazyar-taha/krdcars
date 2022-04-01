import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import CustomHelmet from '../../../partials/helpers/CustomHelmet'
import InfoPreview from '../../../partials/helpers/InfoPreview/InfoPreview'
import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'



/**
 *  @return {Element} : info car model preview
 */
export default function PartPreview() {

    // part uid from request param
    const { partUid } = useParams()


    // part datas
    const [datas, setDatas] = useState({
        title: { en: '', kr: '' },
        description: { en: '', kr: '' },
        image: '',
    });

    // fetching part details
    useEffect(() => {
        axios.get(`/apis/info/car-parts/${partUid}`)
            .then(res => {
                // if there was any data, showing them
                if (!res.data.message) setDatas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [partUid])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={datas.title} description={datas.title} external />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={datas.title} external />

                    {/* page infos */}
                    <InfoPreview
                        description={datas.description}
                        image={`data:image/jpg;base64,${datas.image}`}
                        imageAlt={datas.title}
                        external
                    />

                </Container>
            </div>
        </>
    )
}
