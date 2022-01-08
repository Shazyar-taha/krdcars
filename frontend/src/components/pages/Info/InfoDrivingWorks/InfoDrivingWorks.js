import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import axios from 'axios'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'
import { OutlinedGrid } from '../../../partials/helpers/PageGrid/PageGrid'



// component content
let componentContent = {
    head: {
        title: 'informations.driving_works.head.title',
        description: 'informations.driving_works.head.description',
    },
    title: 'informations.driving_works.section_title',
}



/**
 *  @return {Element} : info driving works page
 */
export default function InfoDrivingWorks() {

    // this route url
    const { url } = useRouteMatch()


    // page datas
    const [datas, setDatas] = useState([]);

    // fetching the works list
    useEffect(() => {
        axios.get('/apis/info/driving-works')
            .then(res => {
                setDatas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* info title */}
                    <PageTitle title={componentContent.title} />

                    {/* info list */}
                    <OutlinedGrid list={datas} fullUrl={url} external />

                </Container>
            </div>
        </>
    )
}
