import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import { Button, Container, Typography } from '@mui/material';
import classNames from 'classnames';

import './profile.scoped.scss'
import CustomHelmet from '../../../partials/helpers/CustomHelmet';
import PageTitle from '../../../partials/helpers/PageTitle/PageTitle';



// component content
let componentContent = {
    title: 'profile.title',
    name: 'profile.name',
    email: 'profile.email',
    changePassword: 'profile.change_password',
    logout: 'profile.logout'
}




/**
 *  @return {Element} : profile page
 */
export default function Profile() {

    const history = useHistory()
    const dispatch = useDispatch()
    const { t } = useTranslation()


    // user datas
    const [datas, setDatas] = useState({ full_name: 'profile', name: '', email: '' })

    // get user datas
    useEffect(() => {
        axios.get('/apis/account/user')
            .then(res => {
                setDatas(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    // logout handler
    function logout() {
        axios.post('/apis/account/logout')
            .then(res => {
                if (res.data.message === 'SUCCESS') {
                    dispatch({
                        type: 'LOGOUT'
                    })
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={datas.full_name} />


            {/* login page */}
            <div className="profile long-element vertical-margin" dir="auto">
                <Container>

                    {/* page title */}
                    <PageTitle title={componentContent.title} />

                    {/* user datas */}
                    <div className="user-datas">

                        {/* user name */}
                        <Typography variant="h4" className={classNames("profile-data", t('configs.font_class_name'))}>
                            {t(componentContent.name)}: {datas.full_name}
                        </Typography>

                        {/* user email */}
                        <Typography variant="h5" className={classNames("profile-data", t('configs.font_class_name'))}>
                            {t(componentContent.email)}: <span className="english-font" dir="ltr">{datas.email}</span>
                        </Typography>

                        {/* change password link */}
                        <Link to="/profile/change-password" className="profile-data">
                            <Button
                                variend="outlined"
                                className={classNames("white-btn-outline change-password", t('configs.font_class_name'))}
                            >
                                {t(componentContent.changePassword)}
                            </Button>
                        </Link>

                        <br />
                        {/* logout */}
                        <div className="profile-data">
                            <Button
                                variant="contained"
                                className={classNames("red-btn-contained logout-button", t('configs.font_class_name'))}
                                onClick={logout}
                            >
                                {t(componentContent.logout)}
                            </Button>
                        </div>
                    </div>

                </Container>
            </div>
        </>
    );
}
