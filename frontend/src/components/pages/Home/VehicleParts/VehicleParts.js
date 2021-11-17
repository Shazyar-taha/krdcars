import React from 'react'
import { Button, Typography } from '@mui/material'
import classNames from 'classnames'

import './vehicle-parts.scoped.scss'
import background from './background.png'
import Language from '../../../partials/helpers/Language'
import { Link } from 'react-router-dom'


// component content
let componentContent = {
    subtitle: {
        en: 'Information about',
        kr: 'زانیاری دەربارەی'
    },
    title: {
        en: 'Vehicle parts',
        kr: 'بەشەکانی ئوتومبێل'
    },
    descritopn: {
        en: 'Learn about vehicle parts and get infromed',
        kr: 'زانیاری بخوێنەرەوە دەربارەی بەشەکانی ئوتومبێل و خۆت پڕ زانیاری بکە'
    },
    button: { en: 'Read More', kr: 'زیاتر بخوێنەرەوە' }
}



/**
 *  @return {Element} : vehicle parts section
 */
export default function VehicleParts() {
    return (
        <section className="vehicle-parts">

            {/* section background image */}
            <img src={background} alt="" className="vehicle-parts-background" />

            {/* section details */}
            <div className="vehicle-parts-leftside">

                {/* section title */}
                <div className="vehicle-parts-details">

                    {/* section title */}
                    <Typography variant="h6" className={classNames("details-subtitle", Language.getClassName())}>
                        {componentContent.subtitle[Language.getLanguage()]}
                    </Typography>
                    <Typography variant="h4" className={classNames("details-title", Language.getClassName())}>
                        {componentContent.title[Language.getLanguage()]}
                    </Typography>

                    {/* section description */}
                    <Typography variant="body1" className={classNames("details-description", Language.getClassName())}>
                        {componentContent.descritopn[Language.getLanguage()]}
                    </Typography>

                    {/* read more button */}
                    <Link to="/info/parts">
                        <Button variant="outlined" className={classNames("details-read-more-btn white-btn-outline", Language.getClassName())}>
                            {componentContent.button[Language.getLanguage()]}
                        </Button>
                    </Link>

                </div>

            </div>

        </section>
    )
}
