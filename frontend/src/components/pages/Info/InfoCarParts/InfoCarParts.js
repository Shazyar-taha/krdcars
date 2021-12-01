import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import classNames from 'classnames'
import { kebabCase } from 'lodash'

import Language from '../../../partials/helpers/Language'



// component content
let componentContent = {
    head: {
        title: {
            en: 'Car Parts',
            kr: 'بەشەکانی ئوتومبێل'
        },
        description: {
            en: 'list of all car parts',
            kr: 'لیستی بەشەکانی ئوتومبێل'
        }
    },
    title: {
        en: 'Car Parts',
        kr: 'بەشەکانی ئوتومبێل'
    },
}



/**
 *  @return {Element} : info parts page
 */
export default function InfoCarParts() {

    // parts datas
    const [parts, setParts] = useState([]);

    // fetching the parts list
    useEffect(() => {
        /**
        * @TODO : fetch the parts list
        */
        const response = // await fetch(`/api/info/part`)
        [
                {
                    name: { en: 'item1', kr: 'بەرهەمی ١' },
                    description: {
                        en: 'Information about car problems and their best solution',
                        kr: 'باسکردن و خستنەڕووی کێشەکانی ئوتومبێل و خستنەڕووی باشترین چارەسەرەکان بۆی'
                    },
                },
            ]
        

        // setting the datas
        setParts(response)
    }, [])


    return (
        <>
            {/* overriding document head */}
            <Helmet>
                <title>{componentContent.head.title[Language.getLanguage()]} | KrdCars</title>
                <meta name="description" content={componentContent.head.description[Language.getLanguage()]} />

                <meta property="og:title" content={`${componentContent.head.title[Language.getLanguage()]} | KrdCars`} />
                <meta property="og:description" content={componentContent.head.description[Language.getLanguage()]} />

                <meta name="keywords" content={`KrdCars, cars, car pars, car shop, kurdstan cars, ${componentContent.head.title.en}`} />
                <meta property="og:url" content={window.location.href} />
            </Helmet>


            {/* info parts */}
            <div className="info-route info-parts" dir="auto">
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
                        {parts.map((part, i) => (
                            <Grid key={i} item xs={12} md={6} lg={4}>
                                <Link to={`/info/parts/${kebabCase(part.name.en)}`}>
                                    <Card className="grid-card">
                                        <CardContent>

                                            {/* card title */}
                                            <Typography variant="h5" className={classNames("card-title", Language.getClassName())}>
                                                {part.name[Language.getLanguage()]}
                                            </Typography>

                                            {/* card description */}
                                            <Typography variant="body1" className={classNames("card-description", Language.getClassName())}>
                                                {part.description[Language.getLanguage()]}
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>

                </Container>
            </div>
        </>
    )
}
