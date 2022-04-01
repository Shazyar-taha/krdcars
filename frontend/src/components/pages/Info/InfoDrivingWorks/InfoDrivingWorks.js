import { Container, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useRouteMatch, useHistory, useLocation } from 'react-router'
import axios from 'axios'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'
import { OutlinedGrid } from '../../../partials/helpers/PageGrid/PageGrid'



// component content
let componentContent = {
    head: {
        title: 'informations.driving_works.head.title',
        description: 'informations.driving_works.head.description',
    },
    title: 'informations.driving_works.section_title',
}



/**
 *  @return {Element} : info driving works page
 */
export default function InfoDrivingWorks() {

    const { url } = useRouteMatch()
    const history = useHistory()
    const { search } = useLocation()

    // getting query string
    const query = new URLSearchParams(search).get('page')

    // parts datas
    const [datas, setDatas] = useState({ pageCount: 0, data: [] });

    // fetching the datas list
    useEffect(() => {
        axios.get(`/apis/info/driving-works${search}`)
            .then(res => {
                // if there was any data, showing them
                if (!res.data.message) setDatas(res.data);
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

                    {/* info title */}
                    <PageTitle title={componentContent.title} />

                    {/* info list */}
                    <OutlinedGrid className="long-element" list={datas.data} fullUrl={url} external />


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
