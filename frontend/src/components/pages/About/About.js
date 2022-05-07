import React from 'react'
import { Container, Typography } from '@mui/material'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import './about.scoped.scss'
import Brand from '../../partials/Brand/Brand'
import CustomHelmet from '../../partials/helpers/CustomHelmet'


// component content
let componentContent = {
    head: {
        title: {
            en: 'About Us',
            kr: 'دەربارەی ئێمە'
        },
        description: {
            en: 'About Us',
            kr: 'دەربارەی تیمی KrdCars'
        }
    },
    title: {
        en: 'About Us',
        kr: 'دەربارەی ئێمە'
    },
}



/**
 *  @return {Element} : about
 */
export default function About() {

    // translation hook
    const { t } = useTranslation()


    return (
        <div>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} external />

            <div className="about-route long-element vertical-margin" dir="auto" align="center">
                <Container>

                    {/* page title */}
                    <Typography variant="h1" className={classNames("title", t('configs.font_class_name'))}>
                        دەربارەی ئێمە
                    </Typography>

                    {/* website brand */}
                    <div className="brand">
                        <Brand />
                    </div>

                    {/* page description */}
                    <Typography variant="body1" className={classNames("description", t('configs.font_class_name'))}>
                        ئێمە وەک تیمی وێبسایتی <span className='english-font'>KrdCars</span> هەستاوین بە ئامادەکردنی ئەم وێبسایتە بە مەبەستی پێشکەشکردنی
                        زانیاری دەربارەی ئوتومبێلەکان کە هۆکارێکی زۆر گرنگی گواستنەوەیە لە ژیانی ڕۆژانەماندا، بۆیە لێرەوە ئێمە هاوکاری هەموو ئەو کەسانە ئەکەین کە 
                        پێویستیان بە هەر زانیاریەک هەبێت دەربارەی هەر ئوتومبێلێک یاخود هەر پارچەیەک یان هەرشتێکی تر.
                        <br />
                        لەم پڕۆژەیەدا ئەتوانین هەموومان سوودمەند بین و ئەتوانن ئێوەش هاوکارمان ببن بە پێدانی زانیاری گونجاو.
                        <br />
                        <br />
                        هەمیشە سەلامەت بن.
                    </Typography>

                </Container>
            </div>
        </div>
    )
}
