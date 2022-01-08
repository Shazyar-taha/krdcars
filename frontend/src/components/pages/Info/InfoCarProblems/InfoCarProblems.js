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
        title: 'informations.car_problems.head.title',
        description: 'informations.car_problems.head.description',
    },
    title: 'informations.car_problems.section_title',
}



/**
 *  @return {Element} : info driving works page
 */
export default function InfoCarProblems() {

    // this route url
    const { url } = useRouteMatch()


    // page datas
    const [datas, setDatas] = useState([]);

    // fetching the problems list
    useEffect(() => {
        axios.get('/apis/info/car-problems')
            .then(res => {
                setDatas(res.data);
            })
            .catch(err => {
                console.log(err);
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
