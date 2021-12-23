import React from 'react'
import { useRouteMatch } from 'react-router'
import { Container } from '@mui/material'

import CustomHelmet from '../../partials/helpers/CustomHelmet'
import PageTitle from '../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../partials/helpers/PageGrid/PageGrid'


// component content
let componentContent = {
    head: {
        title: 'informations.head.title',
        description: 'informations.head.description',
    },
    title: "informations.section_title",
    infos: [
        {
            title: "informations.infos.cars.title",
            description: "informations.infos.cars.description",
            url: 'brands'
        },
        {
            
            title: "informations.infos.car_parts.title",
            description: "informations.infos.car_parts.description",
            url: 'parts'
        },
        {
            
            title: "informations.infos.legall_of_ministry_of_transport.title",
            description: "informations.infos.legall_of_ministry_of_transport.description",
            url: 'driving-works'
        },
        {
            
            title: "informations.infos.car_problems.title",
            description: "informations.infos.car_problems.description",
            url: 'car-problems'
        },
    ]
}



/**
 *  @return {Element} : info index page
 */
export default function InfoIndex() {

    // this route path
    const { url } = useRouteMatch()


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            {/* info inex page */}
            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* info title */}
                    <PageTitle title={componentContent.title} />

                    {/* info grid */}
                    <OutlinedGrid list={componentContent.infos} fullUrl={url} />


                    {/**
                    * @TODO : ad
                    */}

                </Container>
            </div>
        </>
    )
}
