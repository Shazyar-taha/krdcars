import React from 'react'
import { Link } from 'react-router-dom'
import { CardContent, Card, Container, Grid, Typography } from '@mui/material'
import classNames from 'classnames'

import '../info.scoped.scss'
import Language from '../../../partials/helpers/Language'


// component content
let componentContent = {
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
        <div className="info" dir="auto">
            <Container>

                {/* info title */}
                <div className="info-title">
                    <Typography variant="h1" className={classNames("title-h1", Language.getClassName())}>
                        {componentContent.title[Language.getLanguage()]}
                    </Typography>
                </div>

                {/* info grid */}
                <Grid container className="info-outlined-grid" spacing={4}>

                    {/* grid card */}
                    {componentContent.infos.map((info, i) => (
                        <Grid key={i} item xs={12} md={6} lg={4}>
                            <Link to={`/info/${info.url}`}>
                                <Card className="grid-card">
                                    <CardContent>

                                        {/* card title */}
                                        <Typography variant="h5" className={classNames("card-title", Language.getClassName())}>
                                            {info.title[Language.getLanguage()]}
                                        </Typography>

                                        {/* card description */}
                                        <Typography variant="body1" className={classNames("card-description", Language.getClassName())}>
                                            {info.description[Language.getLanguage()]}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>


                {/**
                * @TODO : ad
                */}

            </Container>
        </div>
    )
}
