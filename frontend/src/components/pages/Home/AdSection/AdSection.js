import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import './ad-section.scss'
import Brand from '../../../partials/Brand/Brand'

// lazy importing
const Carousel = React.lazy(() => import('react-material-ui-carousel'))


// component content
let componentContent = {
    introAd: {
        title: "home.ad_section.intro_ad.title",
        description: "home.ad_section.intro_ad.description",
        button: "configs.keywords.see_more",
    },
    ads: [
        /**
         * @TODO : ad
         */
    ]
}



/**
 *  @return {Element} : ads section
 */
export default function AdSection() {

    // translation hook
    const {t}= useTranslation()

    return (
        <section className="ad-section">
            <Container>


                {/* ad section carousel */}
                <Suspense fallback={<div></div>}>
                    <Carousel className="ads-carousel" animation="slide" duration={1000} stopAutoPlayOnHover={true}>

                        {/* our introduction */}
                        <div className="carousel-item intro">

                            {/* intro title */}
                            <Typography variant="h2" className={classNames("carousel-item-title", t('configs.font_class_name'))}>
                                {t(componentContent.introAd.title)}
                            </Typography>

                            {/* intro brand */}
                            <Brand className="carousel-item-brand" />

                            {/* intro description */}
                            <Typography variant="body1" className={classNames("carousel-item-description", t('configs.font_class_name'))} dir="auto">
                                {t(componentContent.introAd.description)}
                            </Typography>

                            <br />

                            {/* read more button */}
                            <Link to="/about">
                                <Button variant="outlined" className={classNames("read-more-btn red-btn-outline", t('configs.font_class_name'))}>
                                    {t(componentContent.introAd.button)}
                                </Button>
                            </Link>
                        </div>


                        {/* other ads */}
                        {/* {componentContent.ads.map((item, index) => <div className="carousel-item" key={index}>{item.name}</div>)} */}
                    </Carousel>
                </Suspense>

            </Container>
        </section>
    )
}
