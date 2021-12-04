import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../../partials/helpers/PageGrid/PageGrid'



// component content
let componentContent = {
    head: {
        title: {
            en: 'Kurdistan driving works',
            kr: 'کارەکانی وەزارەتی هاتووچۆ'
        },
        description: {
            en: 'list of legalls of ministry of transport',
            kr: 'لیستی کارەکانی وەزارەتی هاتوچۆ'
        }
    },
    title: {
        en: 'Kurdistan driving works',
        kr: 'کارەکانی وەزارەتی هاتووچۆ'
    },
}



/**
 *  @return {Element} : info driving works page
 */
export default function InfoDrivingWorks() {

    // this route url
    const { url } = useRouteMatch()


    // page datas
    const [datas, setDatas] = useState([]);

    // fetching the datas list
    useEffect(() => {
        /**
        * @TODO : fetch the datas
        */
        const response = // await fetch(`/api/info/driving-works`)
            [
                {
                    url: 'work-1',
                    title: { en: 'work1', kr: 'کاری ١' },
                    description: {
                        en: 'info about kurdistan car works',
                        kr: 'زانیاری دەربارەی کارەکانی شۆفێر لە کوردستان'
                    },
                },
            ]


        // setting the datas
        setDatas(response)
    }, [])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* info title */}
                    <PageTitle title={componentContent.title} />

                    {/* info list */}
                    <OutlinedGrid list={datas} fullUrl={url} />

                </Container>
            </div>
        </>
    )
}
