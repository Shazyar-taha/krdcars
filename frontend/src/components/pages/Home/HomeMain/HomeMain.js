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
                <div className="main-title">
                    <h1 dir="auto">زانیاری و ڕێنمایی دەربارەی ئوتومبێلەکان</h1>
                </div>
            </Container>


            {/*  pointing down arrow */}
            <div className="arrow-down">
                <KeyboardArrowDownIcon />
                <KeyboardArrowDownIcon />
            </div>
        </main>
    )
}
