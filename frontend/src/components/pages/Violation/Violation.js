import React from 'react'
import { useRouteMatch } from 'react-router'
import { Container } from '@mui/material'

import CustomHelmet from '../../partials/helpers/CustomHelmet'
import PageTitle from '../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../partials/helpers/PageGrid/PageGrid'


// component content
let componentContent = {
    head: {
        title: {
            en: 'Violations',
            kr: 'سەرپێچی'
        },
        description: {
            en: 'see your violations',
            kr: 'سەرپێچیەکانت ببینە'
        }
    },
    title: {
        en: 'Violations',
        kr: 'سەرپێچی'
    },
    links: [
        {
            title: { en: 'slemani', kr: 'سلێمانی' },
            description: {
                en: 'violations in slemani',
                kr: 'سەرپێچیەکان لە سنووری پارێزگای سلێمانی'
            },
            /**
            * @TODO : each city violation url
            */
            otherUrl: ''
        },
        {
            title: { en: 'Hawler', kr: 'هەولێر' },
            description: {
                en: 'violations in hawler',
                kr: 'سەرپێچیەکان لە سنووری پارێزگای هەولێر'
            },
            /**
            * @TODO : each city violation url
            */
            otherUrl: ''
        },
        {
            title: { en: 'duhok', kr: 'دهۆک' },
            description: {
                en: 'violations in duhok',
                kr: 'سەرپێچیەکان لە سنووری پارێزگای دهۆک'
            },
            /**
            * @TODO : each city violation url
            */
            otherUrl: ''
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


            {/* violation page */}
            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={componentContent.title} />

                    {/* page grid */}
                    <OutlinedGrid list={componentContent.links} fullUrl={url} />


                    {/**
                    * @TODO : ad
                    */}

                </Container>
            </div>
        </>
    )
}
