import React from 'react'
import { Container } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import './home-main.scoped.scss'
import background from './background.png'


// component content
let componentContent = {
    title: "home.main_section_title"
}



/**
 *  @return {Element} : home page main section
 */
export default function HomeMain() {

    // translation hook
    const { t } = useTranslation()
    

    return (
        <main className="home-main">

            {/* background image */}
            <img src={background} className="main-background-image" alt="" />

            {/* main section content */}
            <Container className="main-container">

                {/* main section title */}
                <div className="main-title" data-aos="fade-up" data-aos-duration="1500">
                    <h1 className={classNames("title-h1", t('configs.font_class_name'))} dir="auto">
                        {t(componentContent.title)}
                    </h1>
                </div>
            </Container>


            {/*  pointing down arrow */}
            <div className="arrow-down" data-aos="fade-up" data-aos-offset="0" data-aos-duration="1500">
                <KeyboardArrowDownIcon />
                <KeyboardArrowDownIcon />
            </div>
        </main>
    )
}
