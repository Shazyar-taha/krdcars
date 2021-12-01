import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { kebabCase } from 'lodash'
import classNames from 'classnames'

import Language from '../../../partials/helpers/Language'
import { Helmet } from 'react-helmet'



/**
 *  @return {Element} : info brand preview page
 */
export default function InfoBrandPreview() {

    // brand name from the request params
    const { brand } = useParams()

    // brand and model datas
    const [datas, setDatas] = useState({
        brand: { en: '', kr: '' },
        models: []
    });

    // fetching the models list
    useEffect(() => {
        /**
        * @TODO : send the brand name to server and validate it, then fetch get the models list
        */
        const response = // await fetch(`/api/brand/get-models/${brand}`)
        {
            brand: {
                en: brand,
                kr: 'میسۆبیشی'
            },
            models: [
                {
                    name: { en: 'item1', kr: 'بەرهەمی ١' },
                    description: {
                        en: 'Information about car problems and their best solution',
                        kr: 'باسکردن و خستنەڕووی کێشەکانی ئوتومبێل و خستنەڕووی باشترین چارەسەرەکان بۆی'
                    },
                },
            ]
        }

        // setting the datas
        setDatas({
            brand: response.brand,
            models: response.models
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {/* overriding document head */}
            <Helmet>
                <title>{datas.brand[Language.getLanguage()]} | KrdCars</title>
                <meta name="description" content={datas.brand[Language.getLanguage()]} />

                <meta property="og:title" content={`${datas.brand[Language.getLanguage()]} | KrdCars`} />
                <meta property="og:description" content={datas.brand[Language.getLanguage()]} />

                <meta name="keywords" content={`KrdCars, cars, car pars, car shop, kurdstan cars, ${datas.brand.en}`} />
                <meta property="og:url" content={window.location.href} />
            </Helmet>


            <div className="info-route info-brand-preview" dir="auto">
                <Container>

                    {/* info title */}
                    <div className="info-title">
                        <Typography variant="h1" className={classNames("title-h1", Language.getClassName())}>
                            {datas.brand[Language.getLanguage()]}
                        </Typography>
                    </div>

                    {/* info grid */}
                    <Grid container className="info-outlined-grid" spacing={4}>

                        {/* grid card */}
                        {datas.models.map((model, i) => (
                            <Grid key={i} item xs={12} md={6} lg={4}>
                                <Link to={`/info/brands/${kebabCase(datas.brand.en)}/${kebabCase(model.name.en)}`}>
                                    <Card className="grid-card">
                                        <CardContent>

                                            {/* card title */}
                                            <Typography variant="h5" className={classNames("card-title", Language.getClassName())}>
                                                {model.name[Language.getLanguage()]}
                                            </Typography>

                                            {/* card description */}
                                            <Typography variant="body1" className={classNames("card-description", Language.getClassName())}>
                                                {model.description[Language.getLanguage()]}
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
