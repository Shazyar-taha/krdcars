import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router'
import { Container } from '@mui/material'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { CenteredGrid } from '../../../partials/helpers/PageGrid/PageGrid'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'



// component content
let componentContent = {
    head: {
        title: {
            en: 'Brands',
            kr: 'براندەکان'
        },
        description: {
            en: 'Brands list',
            kr: 'لیستی براندەکان'
        }
    },
    title: {
        en: 'Car Brands',
        kr: 'کۆمپانیاکانی بەرهەمهێنانی ئوتومبێل'
    },
}



/**
 *  @return {Element} : info brands page
 */
export default function InfoBrands() {

    // this route path
    const { url } = useRouteMatch()


    // brand list state
    const [datas, setDatas] = useState([]);

    // get the datas list
    useEffect(() => {
        /**
        * @TODO : fetch from server
        */
        const response = [
            {
                url: 'mitsubishi',
                title: { en: 'Mitsubishi', kr: 'میسۆبیشی' },
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/2381px-Mitsubishi_logo.svg.png'
            },
            {
                url: 'maseraty',
                title: { en: 'Maseraty', kr: 'ماسێراتی' },
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcgsvwop0SIxlaP4knSlTeF8M-0MUQu2hc7g&usqp=CAU'
            },
        ]

        setDatas(response)
    }, [])


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={componentContent.title} />

                    {/* page list */}
                    <CenteredGrid list={datas} fullUrl={url} />

                </Container>
            </div>
        </>
    )
}
