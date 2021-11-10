import React, { useState } from 'react'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import classNames from 'classnames';

import './language-selector.scoped.scss'
import Language from '../../helpers/Language';
import { useLocation } from 'react-router';

// component content
let componentContent = [
    { name: 'کوردی', symbol: 'kr', classname: 'kurdish-font' },
    { name: 'English', symbol: 'en', classname: 'english-font' }
]



/**
 *  @return {Element} : language selector
 */
export default function LanguageSelector() {

    // show list state
    const [showListState, setShowListState] = useState(false)

    // this route pathname
    const thisPath = useLocation().pathname


    // toggling show list
    function toggleDrawer(e) {
        setShowListState(!showListState)
    }


    // changing kanguage
    function changeLanguage(e) {

        // // storing selected language
        Language.setLanguage(e.target.getAttribute('symbol'))

        // // rerouting to same page
        window.location = thisPath
    }


    return (
        <div className={classNames("language-selector", { 'show-list': showListState })} onClick={toggleDrawer}>

            <LanguageOutlinedIcon />

            {/* language select languages */}
            <div className="languages-list">
                {
                    componentContent.map((language, i) => (
                        // each language select option
                        <div key={i}
                            className={classNames('language', language.classname)}
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
