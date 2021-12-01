import React from 'react'
import { Container } from '@mui/material'

import './infoHelpers/info.scss'
import { InfoTitle, InfoOutlinedGrid } from './infoHelpers/infoComponents'
import CustomHelmet from '../../partials/helpers/CustomHelmet'


// component content
let componentContent = {
    head: {
        title: {
            en: 'Informations',
            kr: 'زانیاریەکان'
        },
        description: {
            en: 'Informations list provided by KrdCars',
            kr: 'لیستی زانیاریەکان'
        }
    },
    title: {
        en: 'Informations',
        kr: 'زانیاریەکان'
    },
    infos: [
        {
            title: { en: 'Cars', kr: 'ئوتومبێلەکان' },
            description: {
                en: 'Information about car brands and models, and their quality',
                kr: 'زانیاری دەربارەی براند و مۆدێلەکانی ئوتومبێل و ناساندن و خستنەڕووی کوالێتیەکان'
            },
            url: 'brands'
        },
        {
            title: { en: 'Car Parts', kr: 'بەشەکانی ئوتومبێل' },
            description: {
                en: 'Information about car parts and their qualifications',
                kr: 'باسکردن و خستنەڕووی هەر بەشێکی ئوتومبێل و ناساندنێکی ورد بۆیان'
            },
            url: 'parts'
        },
        {
            title: { en: 'Legall of ministry of transport', kr: 'کارەکانی وەزارەتی هاتوچۆ' },
            description: {
                en: 'Advice with legall works of ministry of transport',
                kr: 'ڕێنوێنی کردن بۆ کار و بارە یاساییەکانی وەزارەتی هاتوچۆ'
            },
            url: 'driving-works'
        },
        {
            title: { en: 'Car problems', kr: 'کێشەکانی ئوتومبێل' },
            description: {
                en: 'Information about car problems and their best solution',
                kr: 'باسکردن و خستنەڕووی کێشەکانی ئوتومبێل و خستنەڕووی باشترین چارەسەرەکان بۆی'
            },
            url: 'car-problems'
        },
    ]
}



/**
 *  @return {Element} : info page
 */
export default function Info() {
    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            {/* info inex page */}
            <div className="info-route" dir="auto">
                <Container>

                    {/* info title */}
                    <InfoTitle title={componentContent.title} />

                    {/* info grid */}
                    <InfoOutlinedGrid list={componentContent.infos} fullUrl="/info" />


                    {/**
                    * @TODO : ad
                    */}

                </Container>
            </div>
        </>
    )
}
