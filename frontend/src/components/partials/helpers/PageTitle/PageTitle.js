import React from 'react'
import { Typography } from '@mui/material'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import './page-title.scoped.scss'



/**
 * Title element from pages
 * 
 * @param {Object} props : properties of the element
 *      @param {String} props.className : custom class name for the title
 *      @param {String} props.title : page title
 * 
 *  @return {Element} : page title element
 */
export default function PageTitle(props) {

    // translation hook
    const { t } = useTranslation()

    return (
        <div className={classNames("page-title", props.className || '')}>
            <Typography variant="h1" className={classNames("title-h1", t('configs.font_class_name'))}>
                {t(props.title)}
            </Typography>
        </div>
    )
}