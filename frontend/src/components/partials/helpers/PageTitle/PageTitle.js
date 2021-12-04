import React from 'react'
import { Typography } from '@mui/material'
import classNames from 'classnames'

import './page-title.scoped.scss'
import { getLanguage, getClassName } from '../../../partials/helpers/language'



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
    return (
        <div className={classNames("page-title", props.className || '')}>
            <Typography variant="h1" className={classNames("title-h1", getClassName())}>
                {props.title[getLanguage()]}
            </Typography>
        </div>
    )
}