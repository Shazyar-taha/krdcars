import React from 'react'
import { Button, Typography } from '@mui/material'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import './car-parts.scoped.scss'
import background from './background.png'
import { Link } from 'react-router-dom'


// component content
let componentContent = {
    subtitle: "home.car_parts.subtitle",
    title: "home.car_parts.title",
    descritopn: "home.car_parts.description",
    button: "configs.keywords.see_more"
}



/**
 *  @return {Element} : car parts section
 */
export default function CarParts() {
    
    // translation hook
    const { t } = useTranslation()
    

    return (
        <section className="car-parts">

            {/* section background image */}
            <img src={background} alt="" className="car-parts-background" />

            {/* section details */}
            <div className="car-parts-leftside">

                {/* section title */}
                <div className="car-parts-details">

                    {/* section title */}
                    <Typography variant="h6" className={classNames("details-subtitle", t('configs.font_class_name'))}>
                        {t(componentContent.subtitle)}
                    </Typography>
                    <Typography variant="h4" className={classNames("details-title", t('configs.font_class_name'))}>
                        {t(componentContent.title)}
                    </Typography>

                    {/* section description */}
                    <Typography variant="body1" className={classNames("details-description", t('configs.font_class_name'))}>
                        {t(componentContent.descritopn)}
                    </Typography>

                    {/* read more button */}
                    <Link to="/info/car-parts">
                        <Button variant="outlined" className={classNames("details-read-more-btn opposite-btn-outline", t('configs.font_class_name'))}>
                            {t(componentContent.button)}
                        </Button>
                    </Link>

                </div>

            </div>

        </section>
    )
}
