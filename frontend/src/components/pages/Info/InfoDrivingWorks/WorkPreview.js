import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import CustomHelmet from '../../../partials/helpers/CustomHelmet'
import InfoPreview from '../../../partials/helpers/InfoPreview/InfoPreview'
import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'



/**
 *  @return {Element} : info car problem preview
 */
export default function ProblemPreview() {

    // part uid from request param
    const { workUid } = useParams()


    // part datas
    const [datas, setDatas] = useState({
        title: { en: '', kr: '' },
        description: { en: '', kr: '' },
    });

    // fetching work details
    useEffect(() => {
        axios.get(`/apis/info/driving-works/${workUid}`)
            .then(res => {
                // if there was any data, showing them
                if (!res.data.message) setDatas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [workUid])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={datas.title} external />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={datas.title} external />

                    {/* page infos */}
                    <InfoPreview
                        description={datas.description}
                        external
                    />

                </Container>
            </div>
        </>
    )
}
