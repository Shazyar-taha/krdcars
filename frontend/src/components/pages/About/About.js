import React from 'react'
import { Container, Typography } from '@mui/material'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import './about.scoped.scss'
import Brand from '../../partials/Brand/Brand'
import CustomHelmet from '../../partials/helpers/CustomHelmet'


// component content
let componentContent = {
    head: {
        title: "about.head.title",
        description: "about.head.description",
    },
    title: "about.title",
    description: "about.description",
}



/**
 *  @return {Element} : about
 */
export default function About() {

    // translation hook
    const { t } = useTranslation()


    return (
        <div>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />

            <div className="about-route long-element vertical-margin" dir="auto" align="center">
                <Container>

                    {/* page title */}
                    <Typography variant="h1" className={classNames("title", t('configs.font_class_name'))}>
                        {t(componentContent.title)}
                    </Typography>

                    {/* website brand */}
                    <div className="brand">
                        <Brand />
                    </div>

                    {/* page description */}
                    <Typography variant="body1" className={classNames("description", t('configs.font_class_name'))}
                        dangerouslySetInnerHTML={{ __html: t(componentContent.description) }} dir='auto' />

                </Container>
            </div>
        </div>
    )
}
