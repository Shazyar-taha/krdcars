import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import classNames from 'classnames'

import './footer.scoped.scss'
import Language from '../helpers/Language'
import Brand from '../Brand/Brand'


// component content
let componentContent = {
    firstContent: {
        description: {
            en: 'A website for kurdistan drivers and informing them about their vehicles',
            kr: 'وێبسایتێک تایبەت بە شۆفێرانی کوردستان و ئاگادارکردنەوەیان دەربارەی ئوتومبێلەکان'
        }
    },
    content: [
        {
            title: { en: 'Website routes', kr: 'بەشەکانی وێبسایتەکە' },
            links: [
                { en: 'Home', kr: 'سەرەکی', url: '/' },
                { en: 'Infos', kr: 'زانیاریەکان', url: '/infos' },
                { en: 'parts', kr: 'پارچەکان', url: '/infos/parts' },
                { en: 'About', kr: 'دەربارە', url: '/about' }
            ]
        },
        {
            title: { en: 'Contact', kr: 'پەیوەندی کردن' },
            links: [
                { en: 'Feedback', kr: 'فیدباک', url: '/contact/feedback' },
                { en: 'Add Informations', kr: 'زیادکردنی زانیاری', url: '/contact/add-info' },
                { en: 'Create ad', kr: 'بڵاوکردنەوەی ڕیکلام', url: '/contact/create-ad' }
            ]
        },
        {
            title: { en: 'Contribute', kr: 'پڕۆگرام سازی' },
            links: [
                { en: 'GitHub', kr: 'گیتهەب', url: '/github' },
                { en: 'Ask for application', kr: 'داواکاری بۆ پڕۆگرام', url: 'contact/request-for-app' }
            ]
        }
    ],
    copyright: { en: `Copyright ${new Date().getFullYear()}, all rights reserved.`, kr: `مافی بڵاوکردنەوەی ئەم وێبسایتە پارێزراوە` }
}



/**
 *  @return {Element} : app footer
 */
export default function Footer() {
    return (
        <footer className="footer" dir={Language.getLanguage() === 'kr' ? 'rtl' : 'ltr'}>
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
                        <Typography variant="body1" className={classNames("column-description", Language.getClassName())}>
                            {componentContent.firstContent.description[Language.getLanguage()]}
                        </Typography>
                    </div>


                    {/* grid content */}
                    {componentContent.content.map((content, index) => (
                        <div key={index} className="grid-column">

                            {/* columt title */}
                            <Typography variant="h6" className={classNames("column-title", Language.getClassName())}>
                                {content.title[Language.getLanguage()]}
                            </Typography>

                            {/* column list */}
                            <ul className="column-list">
                                {content.links.map((link, i) => (
                                    <li key={i}>
                                        <Link className="list-link" to={link.url}>
                                            {link[Language.getLanguage()]}
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
                    <Typography variant="body1" className={classNames("footer-details-text", Language.getClassName())}>
                        {componentContent.copyright[Language.getLanguage()]}
                    </Typography>
                </div>

            </Container>
        </footer>
    )
}
