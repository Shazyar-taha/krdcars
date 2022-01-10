import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import { Container } from '@mui/material'
import axios from 'axios'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { CenteredGrid } from '../../../partials/helpers/PageGrid/PageGrid'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'



// component content
let componentContent = {
    head: {
        title: 'informations.cars.head.title',
        description: 'informations.cars.head.description',
    },
    title: 'informations.cars.section_title',
}



/**
 *  @return {Element} : info Cars page
 */
export default function InfoCars() {

    // this route path
    const { url } = useRouteMatch()


    // brands list
    const [datas, setDatas] = useState([]);

    // fetching the brands list
    useEffect(() => {
        axios.get('/apis/info/cars/brands')
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

                    {/* page title */}
                    <PageTitle title={componentContent.title} />

                    {/* page list */}
                    <CenteredGrid list={datas} fullUrl={url} external />

                </Container>
            </div>
        </>
    )
}
