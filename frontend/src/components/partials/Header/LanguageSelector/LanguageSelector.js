import React, { useState } from 'react'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import classNames from 'classnames';
import i18n from 'i18next'

import './language-selector.scoped.scss'
import { availableLanguages } from '../../../../i18n.js'



/**
 *  @return {Element} : language selector
 */
export default function LanguageSelector() {

    // show list state
    const [showListState, setShowListState] = useState(false)

    // toggling show list
    function toggleDrawer(e) {
        setShowListState(!showListState)
    }


    // changing kanguage
    function changeLanguage(e) {
        i18n.changeLanguage(e.target.getAttribute('symbol'))
    }


    return (
        <div className={classNames("language-selector", { 'show-list': showListState })} onClick={toggleDrawer}>

            <LanguageOutlinedIcon />

            {/* language select languages */}
            <div className="languages-list">
                {
                    availableLanguages.map((language, i) => (
                        // each language select option
                        <div key={i}
                            className={classNames('language', language.className)}
                            onClick={changeLanguage}
                            symbol={language.symbol}
                        >
                            {language.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
