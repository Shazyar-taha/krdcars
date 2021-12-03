import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'
import classNames from 'classnames'

import './store.scoped.scss'
import background from './background.png'
import { getLanguage, getClassName } from '../../../partials/helpers/language'


// component content
let componentContent = {
    title: {
        en: 'Find the vehicle that suits you',
        kr: 'ئەو ئوتومبێلە هەڵبژێرە کە بۆ تۆ گونجاوە'
    },
    button: { en: 'See More', kr: 'زیاتر ببینە' }
}



/**
 *  @return {Element} : home page store section
 */
export default function Store() {
    return (
        <div className="home-store">

            {/* section background image */}
            <img src={background} alt="" className="home-store-background" />

            {/* section content */}
            <Container>

                {/* home store details */}
                <div className="home-store-content">

                    {/* section description */}
                    <Typography variant="h4" className={classNames("content-title", getClassName())}>
                        {componentContent.title[getLanguage()]}
                    </Typography>

                    {/* read more button */}
                    <Link to="/store">
                        <Button variant="outlined" className={classNames("content-read-more-btn white-btn-outline", getClassName())}>
                            {componentContent.button[getLanguage()]}
                        </Button>
                    </Link>
                </div>

            </Container>
        </div>
    )
}
