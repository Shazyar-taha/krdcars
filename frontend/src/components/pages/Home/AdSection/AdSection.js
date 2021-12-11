import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material'
import classNames from 'classnames'

import './ad-section.scss'
import { getLanguage, getClassName } from '../../../partials/helpers/language'
import Brand from '../../../partials/Brand/Brand'

// lazy importing
const Carousel = React.lazy(() => import('react-material-ui-carousel'))


// component content
let componentContent = {
    introAd: {
        title: { en: 'about us', kr: 'زانیاری سەرەتایی دەربارەی ئێمە' },
        description: {
            en: `we are a voluntery group making this website to serve drivers in Kurdistan to get information about their own cars, 
            and their components, viewing their panelty issues, etc. you as a driver can help us to gain success faster`,
            kr: `ئێمە گروپێکی خۆبەخشین کە هەڵساوین بە ئامادەردنی ئەم وێبسایتە کە بۆ خزمەتی شۆفێرانی کوردستانە
            لە ڕووی زانیاری ئوتومبێلەکان، زانیاری دەربارەی پارچەی ئوتومبێلەکان، بینینی سەرپێچیەکان و چەندەها خاڵی تر.
            وە تۆش وەک شۆفێرێک ئەتوانیت یارمەتیدەر بیت لە بەرەوپێشبردنی زانیاریەکان`
        },
        button: { en: 'Read More', kr: 'زیاتر بخوێنەرەوە' }
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
    return (
        <section className="ad-section">
            <Container>


                {/* ad section carousel */}
                <Suspense fallback={<div></div>}>
                    <Carousel className="ads-carousel" animation="slide" duration={1000} stopAutoPlayOnHover={true}>

                        {/* our introduction */}
                        <div className="carousel-item intro">

                            {/* intro title */}
                            <Typography variant="h2" className={classNames("carousel-item-title", getClassName())}>
                                {componentContent.introAd.title[getLanguage()]}
                            </Typography>

                            {/* intro brand */}
                            <Brand className="carousel-item-brand" />

                            {/* intro description */}
                            <Typography variant="body1" className={classNames("carousel-item-description", getClassName())} dir="auto">
                                {componentContent.introAd.description[getLanguage()]}
                            </Typography>

                            <br />

                            {/* read more button */}
                            <Link to="/about">
                                <Button variant="outlined" className={classNames("read-more-btn red-btn-outline", getClassName())}>
                                    {componentContent.introAd.button[getLanguage()]}
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
