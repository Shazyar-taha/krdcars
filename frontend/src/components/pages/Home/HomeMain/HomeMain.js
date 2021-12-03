import React from 'react'
import { Container } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import classNames from 'classnames';

import './home-main.scoped.scss'
import background from './background.png'
import { getLanguage, getClassName } from '../../../partials/helpers/language';


// component content
let componentContent = {
    title: {
        en: 'Information about vheicles',
        kr: 'زانیاری و ڕێنمایی دەربارەی ئوتومبێلەکان'
    }
}



/**
 *  @return {Element} : home page main section
 */
export default function HomeMain() {
    return (
        <main className="home-main">

            {/* background image */}
            <img src={background} className="main-background-image" alt="" />

            {/* main section content */}
            <Container className="main-container">

                {/* main section title */}
                <div className="main-title" data-aos="fade-up" data-aos-duration="1500">
                    <h1 className={classNames("title-h1", getClassName())} dir="auto">
                        {componentContent.title[getLanguage()]}
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
