import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Checkbox, Container, FormControl, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import './user.scoped.scss'
import CustomHelmet from '../../partials/helpers/CustomHelmet';
import background from './background.jpg'
import { useSelector } from 'react-redux';



// component content
let componentContent = {
    head: {
        title: 'register.head.title',
        description: 'register.head.description',
    },
    form: {
        title: 'register.form.title',
        description: 'register.form.description',
        name: 'register.form.name',
        email: 'register.form.email',
        password: 'register.form.password',
        confirmPassword: 'register.form.confirm_password',
        showPassword: 'register.form.show_password',
        submit: 'register.form.submit',
        registerQuestion: 'register.form.login_question',
        registerLink: 'register.form.login_link',
        passwordValidation: {
            length: 'register.form.password_validation.length',
            lowercase: 'register.form.password_validation.lowercase',
            uppercase: 'register.form.password_validation.uppercase',
            number: 'register.form.password_validation.number',
            symbols: 'register.form.password_validation.symbols',
        }
    },
    status: {
        success: 'register.status.success',
        failed: 'register.status.failed',
    }
}



/**
 *  @return {Element} : register page
 */
export default function Register() {

    const history = useHistory()
    const { t } = useTranslation()

    // user state
    const user = useSelector(state => state.user)

    // if the user loged in, rerowting to profile
    if (user) {
        history.push('/profile')
    }

    // flash message
    const [flash, setFlash] = useState(null)

    // valid input regexs
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})/


    // show password state
    const [values, setValues] = useState({
        showPassword: false,
        showPasswordHint: false,
        valid_name: true,
        valid_email: true,
        valid_password: true,
        valid_confirmPassword: true,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    // show password toogler
    function toggleShowPassword() {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    // handle input change
    function handleInput(e) {

        // input parent react textField
        let parent = e.target.closest('.MuiFormControl-root')

        setValues({
            ...values,
            [e.target.name]: e.target.value,
            [`valid_${e.target.name}`]:
                // eslint-disable-next-line no-eval
                parent.getAttribute('criteria') ? eval(parent.getAttribute('criteria')) // if the input has a validation criteria
                    : true // if the input was invaild and now changed, we reomve the error
        })
    }


    // form submition handler
    function handleSubmit() {

        // form validation
        let validation = { valid_name: true, valid_email: true, valid_password: true, valid_confirmPassword: true }

        // name must be longer than 3 characters
        if (values.name.length < 3) {
            validation.valid_name = false
        }

        // email must satisfy it's regex
        if (!emailRegex.test(values.email.toLowerCase())) {
            validation.valid_email = false
        }

        // password must satisfy it's regex
        if (!passwordRegex.test(values.password)) {
            validation.valid_password = false
        }

        // confirm password must be same as password
        if (values.password !== values.confirmPassword) {
            validation.valid_confirmPassword = false
        }

        setValues({ ...values, ...validation })

        // if any of the inputs are invaild, we don't submit the form
        if (Object.values(validation).some(value => value === false)) return

        axios.post('/apis/account/register', {
            fullName: values.name,
            email: values.email,
            password: values.password
        })
            .then(function (res) {

                /**
                 * @todo : reroute the user to login
                 */

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
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            {/* register page */}
            <div className="user-page">

                {/* background image */}
                <img src={background} className="main-background-image" alt="" />

                {/* page main section */}
                <Container className="user-container" dir="auto">

                    {/* register form */}
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

                            {/* full name input */}
                            <FormControl className="form-field">
                                <TextField
                                    className={classNames("textfield", t('configs.font_class_name'))}
                                    variant="outlined"
                                    name="name"
                                    autoComplete="name"
                                    label={t(componentContent.form.name)}
                                    value={values.name}
                                    onChange={handleInput}
                                    error={!values.valid_name}
                                    criteria="e.target.value.length > 3"
                                />
                            </FormControl>

                            {/* email input */}
                            <FormControl className="form-field">
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
                                    criteria="emailRegex.test(e.target.value.toLowerCase())"
                                />
                            </FormControl>

                            {/* password input */}
                            <FormControl className="form-field">
                                <TextField
                                    className={classNames("textfield", t('configs.font_class_name'))}
                                    variant="outlined"
                                    name="password"
                                    label={t(componentContent.form.password)}
                                    type={values.showPassword ? "text" : "password"}
                                    value={values.password}
                                    onChange={handleInput}
                                    onFocus={() => setValues({ ...values, showPasswordHint: true })}
                                    onBlur={() => setValues({ ...values, showPasswordHint: false })}
                                    error={!values.valid_password}
                                    criteria="passwordRegex.test(e.target.value)"
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

                                {values.showPasswordHint && <div className="password-validation">

                                    {/* password length validation */}
                                    <FormControl className="checkbox">
                                        <Checkbox
                                            sx={{ color: 'var(--body-oposite-color) !important' }}
                                            size="small"
                                            checked={/^(?=.{8,})/.test(values.password)}
                                            disabled
                                        />
                                        <label className={t('configs.font_class_name')}>
                                            {t(componentContent.form.passwordValidation.length)}
                                        </label>
                                    </FormControl>

                                    <br />

                                    {/* containing lower case validation */}
                                    <FormControl className="checkbox">
                                        <Checkbox
                                            sx={{ color: 'var(--body-oposite-color) !important' }}
                                            size="small"
                                            checked={/^(?=.*[a-z])/.test(values.password)}
                                            disabled
                                        />
                                        <label className={t('configs.font_class_name')}>
                                            {t(componentContent.form.passwordValidation.lowercase)}
                                        </label>
                                    </FormControl>

                                    <br />

                                    {/* containing upper case validation */}
                                    <FormControl className="checkbox">
                                        <Checkbox
                                            sx={{ color: 'var(--body-oposite-color) !important' }}
                                            size="small"
                                            checked={/^(?=.*[A-Z])/.test(values.password)}
                                            disabled
                                        />
                                        <label className={t('configs.font_class_name')}>
                                            {t(componentContent.form.passwordValidation.uppercase)}
                                        </label>
                                    </FormControl>

                                    <br />

                                    {/* containing number validation */}
                                    <FormControl className="checkbox">
                                        <Checkbox
                                            sx={{ color: 'var(--body-oposite-color) !important' }}
                                            size="small"
                                            checked={/^(?=.*[0-9])/.test(values.password)}
                                            disabled
                                        />
                                        <label className={t('configs.font_class_name')}>
                                            {t(componentContent.form.passwordValidation.number)}
                                        </label>
                                    </FormControl>

                                    <br />

                                    {/* containing symbols validation */}
                                    <FormControl className="checkbox">
                                        <Checkbox
                                            sx={{ color: 'var(--body-oposite-color) !important' }}
                                            size="small"
                                            checked={/^(?=.*[!@#$%^&*.])/.test(values.password)}
                                            disabled
                                        />
                                        <label className={t('configs.font_class_name')}>
                                            {t(componentContent.form.passwordValidation.symbols)}
                                        </label>
                                    </FormControl>
                                </div>}
                            </FormControl>

                            {/* confirm password input */}
                            <FormControl className="form-field">
                                <TextField
                                    className={classNames("textfield", t('configs.font_class_name'))}
                                    variant="outlined"
                                    name="confirmPassword"
                                    label={t(componentContent.form.confirmPassword)}
                                    type={values.showPassword ? "text" : "password"}
                                    value={values.confirmPassword}
                                    onChange={handleInput}
                                    error={!values.valid_confirmPassword}
                                    criteria="e.target.value === values.password"
                                />
                            </FormControl>

                            {/* register button */}
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

                            {/* login link */}
                            <FormControl className="form-field">
                                <Typography variant="body1" className={classNames("form-reroute-button", t('configs.font_class_name'))}>
                                    {t(componentContent.form.registerQuestion)}
                                    <span> </span>
                                    <Link to="/login" className={classNames("link", t('configs.font_class_name'))}>
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