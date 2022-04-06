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
    const { problemUid } = useParams()


    // part datas
    const [datas, setDatas] = useState({
        title: { en: '', kr: '' },
        details: [],
        description: { en: '', kr: '' },
        image: '',
    });

    // fetching problem details
    useEffect(() => {
        axios.get(`/apis/info/car-problems/${problemUid}`)
            .then(res => {
                // if the author was not an admin or anonymous, we show it in details
                if (res.data.author.accountType.toUpperCase() !== 'ADMIN' && res.data.author.accountType.toUpperCase() !== 'ANONYMOUS') {
                    res.data.details = [{
                        key: 'configs.keywords.author',
                        value: res.data.author.name,
                        singleValue: true
                    }]
                }

                setDatas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [problemUid])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={datas.title} external />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={datas.title} details={datas.details} external />

                    {/* page infos */}
                    <InfoPreview
                        description={datas.description}
                        image={datas.image}
                        imageAlt={datas.title}
                        external
                    />

                </Container>
            </div>
        </>
    )
}
