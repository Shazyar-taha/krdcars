import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { Button, Checkbox, Container, FormControl, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import axios from 'axios'
import { useDispatch } from 'react-redux'

import './user.scoped.scss'
import background from './background.jpg'
import CustomHelmet from '../../partials/helpers/CustomHelmet'



// component content
let componentContent = {
    head: {
        title: 'login.head.title',
        description: 'login.head.description',
    },
    form: {
        title: 'login.form.title',
        description: 'login.form.description',
        email: 'login.form.email',
        password: 'login.form.password',
        showPassword: 'login.form.show_password',
        submit: 'login.form.submit',
        registerQuestion: 'login.form.register_question',
        registerLink: 'login.form.register_link',
    },
    status: {
        success: 'login.status.success',
        failed: 'login.status.failed',
    }
}



/**
 *  @return {Element} : login page
 */
export default function Login() {

    const history = useHistory()
    const dispatch = useDispatch()
    const { t } = useTranslation()


    // flash message
    const [flash, setFlash] = useState(null)


    // valid email regex
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // show password state
    const [values, setValues] = useState({
        showPassword: false,
        valid_email: true,
        valid_password: true,
        email: '',
        password: '',
    })

    // show password toogler
    function toggleShowPassword() {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    // handle input change
    function handleInput(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            [`valid_${e.target.name}`]: true // if the input was invaild and now changed, we reomve the error
        })
    }


    // form submition handler
    function handleSubmit() {

        let validation = { valid_email: true, valid_password: true }

        // email must satisfy it's regex
        if (!emailRegex.test(values.email.toLowerCase())) {
            validation.valid_email = false
        }

        // password fill must be filled
        if (values.password.length <= 0) {
            validation.valid_password = false
        }

        setValues({ ...values, ...validation })

        // if any of the inputs are invaild, we don't submit the form
        if (Object.values(validation).some(value => value === false)) return

        axios.post('/apis/account/login', {
            email: values.email,
            password: values.password
        })
            .then(async (res) => {

                // if the login was success
                if (res.data.message === 'SUCCESS') {

                    // storing user if the login success
                    await dispatch({
                        type: 'LOGIN',
                        payload: true
                    })

                    // redirect to the home page
                    history.push('/')
                }
                else {
                    // setting flash message
                    setFlash(createFlash(
                        t(componentContent.status[res.data.message.toLowerCase()]),
                        res.data.message.toLowerCase(),
                        t('configs.font_class_name')
                    ))

                    // remving flash message after 5s
                    setTimeout(() => {
                        setFlash(null)
                    }, 5000)
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            {/* login page */}
            <div className="user-page">

                {/* background image */}
                <img src={background} className="main-background-image" alt="" />

                {/* page main section */}
                <Container className="user-container" dir="auto">

                    {/* login form */}
                    <div className="user-page-form">

                        <div className="form-header">

                            {/* form title */}
                            <Typography variant="h1" className={classNames("form-title", t('configs.font_class_name'))}>
                                {t(componentContent.form.title)}
                            </Typography>

                            {/* form description */}
                            <Typography variant="body1" className={classNames("form-description", t('configs.font_class_name'))}>
                                {t(componentContent.form.description)}
                            </Typography>
                        </div>

                        {/* form fields */}
                        <div className="form-fields">

                            <FormControl className="form-field">
                                {/* email input */}
                                <TextField
                                    dir="ltr"
                                    className={classNames("textfield", t('configs.font_class_name'))}
                                    variant="outlined"
                                    name="email"
                                    autoComplete="email"
                                    label={t(componentContent.form.email)}
                                    value={values.email}
                                    onChange={handleInput}
                                    error={!values.valid_email}
                                />
                            </FormControl>

                            <FormControl className="form-field">
                                {/* password input */}
                                <TextField
                                    className={classNames("textfield", t('configs.font_class_name'))}
                                    variant="outlined"
                                    name="password"
                                    label={t(componentContent.form.password)}
                                    type={values.showPassword ? "text" : "password"}
                                    value={values.password}
                                    onChange={handleInput}
                                    error={!values.valid_password}
                                />

                                {/* show password toogler */}
                                <FormControl className="checkbox">
                                    <Checkbox
                                        id="show-password"
                                        sx={{ color: 'var(--body-oposite-color)' }}
                                        checked={values.showPassword}
                                        onChange={toggleShowPassword}
                                    />
                                    <label htmlFor="show-password" className={t('configs.font_class_name')}>
                                        {t(componentContent.form.showPassword)}
                                    </label>
                                </FormControl>
                            </FormControl>

                            {/* login button */}
                            <FormControl className="form-field">
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={t('configs.font_class_name')}
                                    onClick={handleSubmit}
                                >
                                    {t(componentContent.form.submit)}
                                </Button>
                            </FormControl>

                            {/* register link */}
                            <FormControl className="form-field">
                                <Typography variant="body1" className={classNames("form-reroute-button", t('configs.font_class_name'))}>
                                    {t(componentContent.form.registerQuestion)}
                                    <span> </span>
                                    <Link to="/user/register" className={classNames("link", t('configs.font_class_name'))}>
                                        {t(componentContent.form.registerLink)}
                                    </Link>
                                </Typography>
                            </FormControl>
                        </div>

                    </div>
                </Container>

                {/* flash message */}
                {flash}
            </div>
        </>
    );
}



/**
 * creates flash message for registration
 * 
 * @param {String} message : message shown in the flash
 * @param {String} status : status of the flash message, {failed || success}
 * @param {String} className : class name of the flash message
 */
function createFlash(message, status, className) {
    return (
        <div className={classNames("contact-flash", status, className)}>{message}</div>
    )
}