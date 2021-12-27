import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import './store.scoped.scss'
import background from './background.png'


// component content
let componentContent = {
    title: "home.store_title",
    button: "configs.keywords.see_more"
}



/**
 *  @return {Element} : home page store section
 */
export default function Store() {

    // translation hook
    const { t } = useTranslation()

    return (
        <div className="home-store">

            {/* section background image */}
            <img src={background} alt="" className="home-store-background" />

            {/* section content */}
            <Container>

                {/* home store details */}
                <div className="home-store-content">

                    {/* section description */}
                    <Typography variant="h4" className={classNames("content-title", t('configs.font_class_name'))}>
                        {t(componentContent.title)}
                    </Typography>

                    {/* read more button */}
                    <Link to="/store">
                        <Button variant="outlined" className={classNames("content-read-more-btn white-btn-outline", t('configs.font_class_name'))}>
                            {t(componentContent.button)}
                        </Button>
                    </Link>
                </div>

            </Container>
        </div>
    )
}
