import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch, useHistory, useLocation } from 'react-router'
import { Container, Pagination } from '@mui/material'
import axios from 'axios'

import PageTitle from '../../../partials/helpers/PageTitle/PageTitle'
import { OutlinedGrid } from '../../../partials/helpers/PageGrid/PageGrid'
import CustomHelmet from '../../../partials/helpers/CustomHelmet'
import detailsFixer from '../../../partials/helpers/detailsFixer'



/**
 *  @return {Element} : info car brands preview page
 */
export default function InfoCarsBrandsPreview() {

    const { url } = useRouteMatch()
    const { brandUid } = useParams()
    const history = useHistory()
    const { search } = useLocation()

    // getting query string
    const query = new URLSearchParams(search).get('page')


    // page datas
    const [datas, setDatas] = useState({
        brand: { name: { en: '', kr: '' } },
        models: [],
        pageCount: 0
    });


    // fetching the brand details and models list
    useEffect(() => {
        axios.get(`/apis/info/cars/${brandUid}${search}`)
            .then(res => {

                // fixing the details for brand
                res.data.brand = detailsFixer(res.data.brand, 'configs.keywords.',)

                setDatas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [brandUid, search])


    // pagination handler
    function handlePagination(event, value) {
        history.push(`${url}?page=${value}`)
    }


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={datas.brand.name} description={datas.brand.name} external />


            <div className="info-route long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={datas.brand.name} details={datas.brand.details} external />

                    {/* page list */}
                    <OutlinedGrid className="long-element" list={datas.models} titleKeyName="model_name" fullUrl={url} external oneLang="english-font" />

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
