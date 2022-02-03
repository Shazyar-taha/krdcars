import { Button, Checkbox, Container, FormControl, TextField, Typography } from '@mui/material';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import CustomHelmet from '../../../partials/helpers/CustomHelmet';
import './profile.scoped.scss';



// component content
let componentContent = {
    head: {
        title: 'change_password.head.title',
    },
    form: {
        title: 'change_password.form.title',
        currentPassword: 'change_password.form.current_password',
        newPassword: 'change_password.form.new_password',
        confirmPassword: 'change_password.form.confirm_password',
        showPassword: 'change_password.form.show_password',
        submit: 'change_password.form.submit',
        passwordValidation: {
            length: 'change_password.form.password_validation.length',
            lowercase: 'change_password.form.password_validation.lowercase',
            uppercase: 'change_password.form.password_validation.uppercase',
            number: 'change_password.form.password_validation.number',
            symbols: 'change_password.form.password_validation.symbols',
        }
    },
    status: {
        not_logged_in: 'change_password.status.not_logged_in',
        failed: 'change_password.status.failed',
    }
}




/**
 *  @return {Element} : change password page
 */
export default function ChangePassword() {

    const history = useHistory()
    const { t } = useTranslation()

    // flash message
    const [flash, setFlash] = useState(null)


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})/

    // user datas
    const [values, setValues] = useState({
        showPassword: false,
        valid_password: true,
        valid_newPassword: true,
        valid_confirmPassword: true,
        password: '',
        newPassword: '',
        confirmPassword: '',
    })

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
        let validation = { valid_password: true, valid_newPassword: true, valid_confirmPassword: true }

        // password must be longer than 3 characters
        if (values.password.length < 4) {
            validation.valid_password = false
        }

        // new password must satisfy it's regex
        if (!passwordRegex.test(values.newPassword)) {
            validation.valid_newPassword = false
        }

        // confirm password must be same as new password
        if (values.newPassword !== values.confirmPassword) {
            validation.valid_confirmPassword = false
        }

        setValues({ ...values, ...validation })

        // if any of the inputs are invaild, we don't submit the form
        if (Object.values(validation).some(value => value === false)) return


        axios.post('/apis/account/change-password', {
            password: values.password,
            newPassword: values.newPassword,
        })
            .then(function (res) {

                if (res.data.status === 'SUCCESS') {

                    // redirect to the profile page
                    history.push('/user/profile')
                }
                else {
                    // if the user is not logged in, redirecting them to login page
                    if (res.data.message === 'not_logged_in') {
                        // redirect to the login page
                        history.push('/user/login')
                    }
                    else {
                        // setting flash message
                        setFlash(createFlash(
                            t(componentContent.status[res.data.message.toLowerCase()]),
                            res.data.status.toLowerCase(),
                            t('configs.font_class_name')
                        ))

                        // remving flash message after 5s
                        setTimeout(() => {
                            setFlash(null)
                        }, 5000)
                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            })
    }


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} />


            {/* change password page */}
            <div className="profile long-element vertical-margin" dir="auto">
                <Container>

                    {/* change password form */}
                    <div className="change-password-form margin-auto">

                        {/* form title */}
                        <Typography variant="h1" className={classNames("form-title", t('configs.font_class_name'))}>
                            {t(componentContent.form.title)}
                        </Typography>

                        {/* form fields */}
                        <div className="form-fields">

                            {/* current password field */}
                            <FormControl className="form-field width-100">
                                <TextField
                                    dir="ltr"
                                    className={classNames("textfield", t('configs.font_class_name'))}
                                    variant="outlined"
                                    name="password"
                                    type={values.showPassword ? "text" : "password"}
                                    label={t(componentContent.form.currentPassword)}
                                    value={values.email}
                                    onChange={handleInput}
                                    error={!values.valid_password}
                                    criteria="e.target.value.length > 3"
                                />
                            </FormControl>

                            {/* new password field */}
                            <FormControl className="form-field width-100">
                                <TextField
                                    dir="ltr"
                                    className={classNames("textfield", t('configs.font_class_name'))}
                                    variant="outlined"
                                    name="newPassword"
                                    type={values.showPassword ? "text" : "password"}
                                    label={t(componentContent.form.currentPassword)}
                                    value={values.newPassword}
                                    onChange={handleInput}
                                    onFocus={() => setValues({ ...values, showPasswordHint: true })}
                                    onBlur={() => setValues({ ...values, showPasswordHint: false })}
                                    error={!values.valid_newPassword}
                                    criteria="passwordRegex.test(e.target.value)"
                                />

                                {/* show password toogler */}
                                <FormControl className="checkbox">
                                    <Checkbox
                                        id="show-password"
                                        sx={{ color: 'var(--body-oposite-color)' }}
                                        checked={values.showPassword}
                                        onChange={() => setValues({ ...values, showPassword: !values.showPassword })}
                                    />
                                    <label htmlFor="show-password" className={t('configs.font_class_name')}>
                                        {t(componentContent.form.showPassword)}
                                    </label>
                                </FormControl>

                                {values.showPasswordHint &&
                                    <div className="password-validation">

                                        {/* password length validation */}
                                        <FormControl className="checkbox">
                                            <Checkbox
                                                sx={{ color: 'var(--body-oposite-color) !important' }}
                                                size="small"
                                                checked={/^(?=.{8,})/.test(values.newPassword)}
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
                                                checked={/^(?=.*[a-z])/.test(values.newPassword)}
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
                                                checked={/^(?=.*[A-Z])/.test(values.newPassword)}
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
                                                checked={/^(?=.*[0-9])/.test(values.newPassword)}
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
                                                checked={/^(?=.*[!@#$%^&*.])/.test(values.newPassword)}
                                                disabled
                                            />
                                            <label className={t('configs.font_class_name')}>
                                                {t(componentContent.form.passwordValidation.symbols)}
                                            </label>
                                        </FormControl>
                                    </div>
                                }
                            </FormControl>

                            {/* confirm password field */}
                            <FormControl className="form-field width-100">
                                <TextField
                                    dir="ltr"
                                    className={classNames("textfield", t('configs.font_class_name'))}
                                    variant="outlined"
                                    name="confirmPassword"
                                    label={t(componentContent.form.confirmPassword)}
                                    type={values.showPassword ? "text" : "password"}
                                    value={values.confirmPassword}
                                    onChange={handleInput}
                                    error={!values.valid_confirmPassword}
                                    criteria="e.target.value === values.newPassword"
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