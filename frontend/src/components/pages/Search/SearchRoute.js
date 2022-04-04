import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import './search-route.scoped.scss'
import { CenteredGrid, OutlinedGrid } from '../../partials/helpers/PageGrid/PageGrid';



/**
 *  @return {Element} : Search page element
 */
export default function SearchRoute() {

    const { t } = useTranslation()

    // getting history reference
    const history = useHistory()


    // this url and query search
    const { search } = useLocation()
    // getting query string
    const query = new URLSearchParams(search).get('query')

    // search result datas
    const [datas, setDatas] = useState({
        brands: [], models: [], parts: [], problems: [], drivingWorks: []
    })

    // fetching the model details
    useEffect(() => {
        // checking if the query string is not empty
        if (search)
            axios.get(`/apis/search${search}`)
                .then(res => {
                    setDatas(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
    }, [search])


    // handling enter on the search field
    function handleKeys(e) {
        if (e.keyCode === 13 && e.target.value !== '') {
            history.push(`/search?query=${e.target.value}`)
        }
    }


    return (
        <div className="search-route long-element vertical-margin" dir="auto">
            <Container>

                {/* search input */}
                <div className="search-input">

                    {/* input field */}
                    <input
                        className={classNames("search-input-field", t('configs.font_class_name'))}
                        type="text"
                        id="search-input"
                        placeholder={t("configs.keywords.search")}
                        onKeyDown={handleKeys}
                        defaultValue={query}
                    />

                    {/* input label */}
                    <label htmlFor="search-input" className={classNames("search-input-label", t('configs.font_class_name'))}>
                        {t('configs.keywords.search_label')}
                    </label>
                </div>

                {/* if the search query is not empty, then showing the result */}
                {search &&
                    <div className="search-result">

                        {/* if the result brand is not empty, then showing them */}
                        {datas.brands.length > 0 &&
                            <div className="result search-result-brand">
                                <Typography variant="h4" className={classNames("result-title", t('configs.font_class_name'))}>
                                    {t('configs.keywords.brands')}
                                </Typography>
                                <CenteredGrid style={{ marginTop: '1rem' }} list={datas.brands} fullUrl="info/cars" external oneLang='en' />
                            </div>
                        }

                        {/* if the result models is not empty, then showing them */}
                        {datas.models.length > 0 &&
                            <div className="result search-result-brand">
                                <Typography variant="h4" className={classNames("result-title", t('configs.font_class_name'))}>
                                    {t('configs.keywords.models')}
                                </Typography>
                                <OutlinedGrid style={{ marginTop: '0rem' }} list={datas.models} fullUrl="info/cars/[brandUid]" external />
                            </div>
                        }

                        {/* if the result parts is not empty, then showing them */}
                        {datas.parts.length > 0 &&
                            <div className="result search-result-brand">
                                <Typography variant="h4" className={classNames("result-title", t('configs.font_class_name'))}>
                                    {t('configs.keywords.parts')}
                                </Typography>
                                <OutlinedGrid style={{ marginTop: '0rem' }} list={datas.parts} external />
                            </div>
                        }

                        {/* if the result problems is not empty, then showing them */}
                        {datas.problems.length > 0 &&
                            <div className="result search-result-brand">
                                <Typography variant="h4" className={classNames("result-title", t('configs.font_class_name'))}>
                                    {t('configs.keywords.problems')}
                                </Typography>
                                <OutlinedGrid style={{ marginTop: '0rem' }} list={datas.problems} external />
                            </div>
                        }

                        {/* if the result drivingWorks is not empty, then showing them */}
                        {datas.drivingWorks.length > 0 &&
                            <div className="result search-result-brand">
                                <Typography variant="h4" className={classNames("result-title", t('configs.font_class_name'))}>
                                    {t('configs.keywords.driving_works')}
                                </Typography>
                                <OutlinedGrid style={{ marginTop: '0rem' }} list={datas.drivingWorks} external />
                            </div>
                        }

                    </div>
                }

            </Container>
        </div>
    )
}
