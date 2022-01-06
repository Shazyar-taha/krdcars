import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import axios from 'axios'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../../partials/helpers/PageGrid/PageGrid'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'



// component content
let componentContent = {
    head: {
        title: 'informations.parts.head.title',
        description: 'informations.parts.head.description',
    },
    title: 'informations.parts.section_title',
}



/**
 *  @return {Element} : info parts page
 */
export default function InfoCarParts() {

    // this route url
    const { url } = useRouteMatch()


    // parts datas
    const [datas, setDatas] = useState([]);

    // fetching the parts list
    useEffect(() => {
        axios.get('/apis/info/car-parts')
            .then(res => {
                setDatas(res.data);
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

                    {/* page title */}
                    <PageTitle title={componentContent.title} />

                    {/* page list */}
                    <OutlinedGrid list={datas} fullUrl={url} external />

                </Container>
            </div>
        </>
    )
}
