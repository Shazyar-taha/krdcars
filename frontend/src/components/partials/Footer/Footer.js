import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Typography } from '@mui/material'
import classNames from 'classnames'

import './footer.scoped.scss'
import { getLanguage, getClassName } from '../helpers/language'
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
                { en: 'Informations', kr: 'زانیاریەکان', url: '/info' },
                { en: 'Cars', kr: 'ئوتومبێلەکان', url: '/info/brands' },
                { en: 'parts', kr: 'پارچەکان', url: '/info/parts' },
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
        <footer className="footer" dir={getLanguage() === 'kr' ? 'rtl' : 'ltr'}>
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
                        <Typography variant="body1" className={classNames("column-description", getClassName())}>
                            {componentContent.firstContent.description[getLanguage()]}
                        </Typography>
                    </div>


                    {/* grid content */}
                    {componentContent.content.map((content, index) => (
                        <div key={index} className="grid-column">

                            {/* columt title */}
                            <Typography variant="h6" className={classNames("column-title", getClassName())}>
                                {content.title[getLanguage()]}
                            </Typography>

                            {/* column list */}
                            <ul className="column-list">
                                {content.links.map((link, i) => (
                                    <li key={i}>
                                        <Link className="list-link" to={link.url}>
                                            {link[getLanguage()]}
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
                    <Typography variant="body1" className={classNames("footer-details-text", getClassName())}>
                        {componentContent.copyright[getLanguage()]}
                    </Typography>
                </div>

            </Container>
        </footer>
    )
}
