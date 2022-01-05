import React from 'react'
import { useRouteMatch } from 'react-router'
import { Container } from '@mui/material'

import CustomHelmet from '../../partials/helpers/CustomHelmet'
import PageTitle from '../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../partials/helpers/PageGrid/PageGrid'


// component content
let componentContent = {
    head: {
        title: 'violation.index.head.title',
        description: 'violation.index.head.description',
    },
    title: "violation.index.section_title",
    links: [
        {
            title: "violation.index.links.slemani.title",
            description: "violation.index.links.slemani.description",
            otherUrl: '',
        },
        {
            title: "violation.index.links.hawler.title",
            description: "violation.index.links.hawler.description",
            otherUrl: ''
        },
        {
            title: "violation.index.links.duhok.title",
            description: "violation.index.links.duhok.description",
            otherUrl: ''
        }
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


            {/* violation page */}
            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={componentContent.title} />

                    {/* page grid */}
                    <OutlinedGrid list={componentContent.links} fullUrl={url} />

                </Container>
            </div>
        </>
    )
}
