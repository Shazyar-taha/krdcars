import React from 'react'
import { Container } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './home-main.scoped.scss'
import background from './background.png'



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
                    <h1 dir="auto">زانیاری و ڕێنمایی دەربارەی ئوتومبێلەکان</h1>
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
