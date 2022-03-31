import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory, useLocation } from 'react-router'
import { Container, Pagination } from '@mui/material'
import axios from 'axios'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { CenteredGrid } from '../../../partials/helpers/PageGrid/PageGrid'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'



// component content
let componentContent = {
    head: {
        title: 'informations.cars.head.title',
        description: 'informations.cars.head.description',
    },
    title: 'informations.cars.section_title',
}



/**
 *  @return {Element} : info Cars page
 */
export default function InfoCars() {

    const { url } = useRouteMatch()
    const history = useHistory()
    const { search } = useLocation()

    // getting query string
    const query = new URLSearchParams(search).get('page')


    // brands list datas
    const [datas, setDatas] = useState({ pageCount: 0, data: [] });

    // fetching the brands list
    useEffect(() => {
        axios.get(`/apis/info/cars${search}`)
            .then(res => {
                // if there was any data, showing them
                if (!res.data.message) setDatas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [search])


    // pagination handler
    function handlePagination(event, value) {
        history.push(`${url}?page=${value}`)
    }


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={componentContent.title} />

                    {/* page list */}
                    <CenteredGrid className="long-element" list={datas.data} fullUrl={url} external oneLang='english-font' />

                    {/* pagination */}
                    <div className="pagination" dir="ltr">
                        <Pagination
                            variant="outlined"
                            shape="rounded"
                            size="large"
                            count={datas.pageCount}
                            defaultPage={+query || 1}
                            onChange={handlePagination}
                        />
                    </div>
                </Container>
            </div>
        </>
    )
}
