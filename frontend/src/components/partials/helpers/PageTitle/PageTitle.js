import React from 'react'
import { Typography } from '@mui/material'
import classNames from 'classnames'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'

import './page-title.scoped.scss'



/**
 * Title element from pages
 * 
 * @param {Object} props : properties of the element
 *      @param {String} props.external : determines if the details is external or not
 *      @param {String} props.className : custom class name for the title
 *      @param {String} props.title : page title
 *      @param {Array} props.details : page details
 *      @param {Object} props.detail : each detail in details array
 *      @param {String} props.detail.key : detail key name
 *      @param {String} props.detail.value : detail value
 *      @param {Boolean} props.detail.singleValue : determines if the value is on a single language or not
 *      @param {Boolean} props.detail.externalKey : determines if the key name is external or not
 *      @param {Boolean} props.detail.internalValue : determines if the value is internal or not
 * 
 *  @return {Element} : page title element
 */
export default function PageTitle(props) {

    // translation hook
    const { t } = useTranslation()

    return (
        <div className={classNames("page-title", props.className || '')}>

            {/* page title */}
            <Typography variant="h1" className={classNames("title-h1", t('configs.font_class_name'))}>
                {props.external ? props.title?.[i18n.language] : t(props.title)}
            </Typography>

            {/* page details */}
            {props.details ?
                <ul className={classNames("details", t('configs.font_class_name'))}>
                    {props.details.map((detail, i) =>
                        <li key={i} className="detail">
                            {detail.externalKey ? detail.key[i18n.language] : t(detail.key)}
                            : {detail.singleValue ? detail.value : detail.internalValue ? t(detail.value) : detail.value[i18n.language]}
                        </li>
                    )}
                </ul>
                : ''}
        </div>
    )
}