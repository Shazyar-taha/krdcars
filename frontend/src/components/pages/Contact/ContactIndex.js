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
            en: 'Contact',
            kr: 'پەیوەندی'
        },
        description: {
            en: 'contact KrdCars website',
            kr: 'پەیوەندی بە وێبسایتی KrdCars'
        }
    },
    title: {
        en: 'Contact',
        kr: 'پەیوەندی'
    },
    infos: [
        // {
        //     title: { en: 'Feedback', kr: 'فیدباک' },
        //     description: {
        //         en: 'Give our feedback or suggestions about the website',
        //         kr: 'فیدباک و پێشنیارەکانی بخەرە ڕوو دەربارەی وێبسایتەکە'
        //     },
        //     url: 'feedback'
        // },
        {
            title: { en: 'Add Info', kr: 'زیادکردنی زانیاری' },
            description: {
                en: 'Add info to the website',
                kr: 'زانیاری زیادبکە بۆ وێبسایتەکە'
            },
            url: 'add-info'
        },
        // {
        //     title: { en: 'Request Application', kr: 'داواکردنی پڕۆگرام' },
        //     description: {
        //         en: 'Ask for an application for your company or work',
        //         kr: 'داوای ئەپلیکەیشن بکە بۆ کۆمپانیا یاخود کارەکەت'
        //     },
        //     url: 'request-for-app'
        // },
        // {
        //     title: { en: 'Publish Ad', kr: 'ڕیکلام بکە' },
        //     description: {
        //         en: 'Publish your ad on the website',
        //         kr: 'ڕیکلامەکەت لەم وێبسایتە بڵاوبکەرەوە'
        //     },
        //     url: 'create-ad'
        // },
    ]
}



/**
 *  @return {Element} : info index page
 */
export default function ContactIndex() {

    // this route path
    const { url } = useRouteMatch()


    return (
        <div>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} external />


            {/* contact inex page */}
            <div className="about-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* contact title */}
                    <PageTitle title={componentContent.title} external />

                    {/* contact grid */}
                    <OutlinedGrid list={componentContent.infos} fullUrl={url} external />

                </Container>
            </div>
        </div>
    )
}
