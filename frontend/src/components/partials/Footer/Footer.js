import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import './footer.scoped.scss'
import Brand from '../Brand/Brand'


// component content
let componentContent = {
    description: 'partials.footer.description',
    content: [
        {
            title: 'partials.footer.content.website_routes.title',
            links: [
                { name: 'partials.footer.content.website_routes.links.informations', url: '/info' },
                { name: 'partials.footer.content.website_routes.links.cars', url: '/info/cars' },
                { name: 'partials.footer.content.website_routes.links.parts', url: '/info/parts' },
                { name: 'partials.footer.content.website_routes.links.about', url: '/about' }
            ]
        },
        {
            title: 'partials.footer.content.contact.title',
            links: [
                { name: 'partials.footer.content.contact.links.feedback', url: '/contact/feedback' },
                { name: 'partials.footer.content.contact.links.add_info', url: '/contact/add-info' },
                { name: 'partials.footer.content.contact.links.create_ad', url: '/contact/create-ad' },
                { name: 'partials.footer.content.contact.links.ask_for_app', url: '/contact/create-ad' },
            ]
        }
    ],
    copyright: 'partials.footer.copyright'
}



/**
 *  @return {Element} : app footer
 */
export default function Footer() {

    // translation hook
    const { t } = useTranslation()


    return (
        <footer className="footer" dir="auto">
            <Container>

                {/* footer content */}
                <div className="footer-grid-content">

                    {/* first column */}
                    <div className="grid-column intro-column">

                        {/* columt title */}
                        <Typography variant="h6" className="column-title">
                            <Brand className="list-brand" />
                        </Typography>

                        {/* column description */}
                        <Typography variant="body1" className={classNames("column-description", t('configs.font_class_name'))}>
                            {t(componentContent.description)}
                        </Typography>
                    </div>


                    {/* grid content */}
                    {componentContent.content.map((content, index) => (
                        <div key={index} className="grid-column">

                            {/* columt title */}
                            <Typography variant="h6" className={classNames("column-title", t('configs.font_class_name'))}>
                                {t(content.title)}
                            </Typography>

                            {/* column list */}
                            <ul className="column-list">
                                {content.links.map((link, i) => (
                                    <li key={i}>
                                        <Link className={classNames("list-link", t('configs.font_class_name'))} to={link.url}>
                                            {t(link.name)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* footer line */}
                <hr className="footer-line" />

                {/* footer details */}
                <div className="footer-details">
                    <Typography variant="body1" className={classNames("footer-details-text", t('configs.font_class_name'))}>
                        {t(componentContent.copyright)}
                    </Typography>
                </div>

            </Container>
        </footer>
    )
}
