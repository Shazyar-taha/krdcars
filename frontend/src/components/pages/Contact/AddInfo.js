import React, { useEffect, useState } from 'react'
import { Button, FormControl, TextField, Typography } from '@mui/material'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import axios from 'axios'
import Select from 'react-select'

import './contact.scoped.scss'
import CustomHelmet from '../../partials/helpers/CustomHelmet'



// component content
let componentContent = {
    head: {
        title: 'contact.add_info.head.title'
    },
    form: {
        title: 'contact.add_info.form.title',
        description: 'contact.add_info.form.description',
        brands: 'contact.add_info.form.brands',
        carTypes: 'contact.add_info.form.car_types',
        models: 'contact.add_info.form.models',
        year: 'contact.add_info.form.year',
        kurdishInfo: 'contact.add_info.form.kurdish_info',
        englishInfo: 'contact.add_info.form.english_info',
        submit: 'contact.add_info.form.submit'
    },
    status: {
        success: 'contact.add_info.status.success',
        failed: 'contact.add_info.status.failed',
        error: 'contact.add_info.status.error'
    }
}



/**
 *  @return {Element} : add info component
 */
export default function AddInfo() {

    const { t } = useTranslation()


    // datas and values
    const [flash, setFlash] = useState(null)
    const [values, setValues] = useState({ brand: '', carType: '', model: '', year: '', kurdishInfo: '', englishInfo: '' })
    const [datas, setDatas] = useState({ brands: [], carTypes: [], models: [] })

    // fetching the brands and car types
    useEffect(() => {
        axios.get('/apis/contact/get-details')
            .then(res => {
                setDatas({ ...datas, brands: res.data.brand, carTypes: res.data.carType })
            })
            .catch(err => {
                console.log(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // fetching the models based on the brand
    useEffect(() => {
        axios.get('/apis/contact/get-models/' + values.brand.value)
            .then(res => {
                setDatas({ ...datas, models: res.data })
            })
            .catch(err => {
                console.log(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values.brand])


    // handle change
    function handleInput(e) {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    // handle submition
    function handleSubmit(e) {

        // preparing the submition data
        let submitedValues = {
            ...values,
            brand: values.brand.value,
            carType: values.carType.value,
            model: values.model.value
        }

        // checking the values before submitting
        for (const iterator of Object.entries(submitedValues)) {
            if (!iterator[1] || iterator[1] === '') {

                // setting flash message
                setFlash(createFlash(
                    t(componentContent.status.error),
                    'failed',
                    t('configs.font_class_name')
                ))

                // remving flash message after 5s
                setTimeout(() => {
                    setFlash(null)
                }, 5000)

                return
            }
        }

        // submiting the data
        axios.post('/apis/contact/send-contact', submitedValues)
            .then(res => {

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
    }


    return (
        <>
            {/* overriding document head */}
            <CustomHelmet title={componentContent.head.title} description={componentContent.head.description} />


            {/* add info page */}
            <div className="vertical-margin long-element contact">
                <div className="contact-form">

                    {/* form title */}
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

                        {/* brand */}
                        <FormControl className="form-field react-select">
                            <Typography dir="auto" variant="body2" className={classNames("form-field-label", t('configs.font_class_name'))}>
                                {t(componentContent.form.brands)}
                            </Typography>
                            <Select
                                placeholder="Brands"
                                options={makeOptions(datas.brands)}
                                value={values.brand}
                                onChange={selctedOption => setValues({ ...values, brand: selctedOption })}
                                onFocus={(e) => { e.target.closest('.react-select').style.zIndex = +e.target.closest('.react-select').style.zIndex + 10 }}
                                onBlur={(e) => e.target.closest('.react-select').style.zIndex = ''}
                            />
                        </FormControl>

                        {/* car types */}
                        <FormControl className="form-field react-select">
                            <Typography dir="auto" variant="body2" className={classNames("form-field-label", t('configs.font_class_name'))}>
                                {t(componentContent.form.carTypes)}
                            </Typography>
                            <Select
                                className={t('configs.font_class_name')}
                                placeholder={t(componentContent.form.carTypes)}
                                options={makeOptions(datas.carTypes, i18next.language)}
                                onChange={selctedOption => setValues({ ...values, carType: selctedOption })}
                                value={values.carType}
                                onFocus={(e) => { e.target.closest('.react-select').style.zIndex = +e.target.closest('.react-select').style.zIndex + 10 }}
                                onBlur={(e) => e.target.closest('.react-select').style.zIndex = ''}
                            />
                        </FormControl>

                        {/* models */}
                        <FormControl className={classNames("form-field react-select", { disabled: values.brand === '' })}>
                            <Typography dir="auto" variant="body2" className={classNames("form-field-label", t('configs.font_class_name'))}>
                                {t(componentContent.form.models)}
                            </Typography>
                            <Select
                                placeholder="Models"
                                options={makeOptions(datas.models)}
                                onChange={selctedOption => setValues({ ...values, model: selctedOption })}
                                value={values.model}
                                isDisabled={values.brand === ''}
                                onFocus={(e) => { e.target.closest('.react-select').style.zIndex = +e.target.closest('.react-select').style.zIndex + 10 }}
                                onBlur={(e) => e.target.closest('.react-select').style.zIndex = ''}
                            />
                        </FormControl>

                        <hr className='form-field' />

                        {/* year input */}
                        <FormControl className="form-field">
                            <TextField
                                dir="ltr"
                                type="number"
                                className={classNames("textfield", t('configs.font_class_name'))}
                                variant="outlined"
                                name="year"
                                label={t(componentContent.form.year)}
                                value={values.year}
                                onChange={handleInput}
                            />
                        </FormControl>

                        {/* kurdish info input */}
                        <FormControl className="form-field">
                            <TextField
                                dir="auto"
                                className={"textfield textarea kurdish-font"}
                                variant="outlined"
                                name="kurdishInfo"
                                multiline
                                minRows={3}
                                maxRows={10}
                                label={t(componentContent.form.kurdishInfo)}
                                value={values.kurdishInfo}
                                onChange={handleInput}
                            />
                        </FormControl>

                        {/* english info input */}
                        <FormControl className="form-field">
                            <TextField
                                dir="auto"
                                className={"textfield textarea kurdish-font"}
                                variant="outlined"
                                name="englishInfo"
                                multiline
                                minRows={3}
                                maxRows={10}
                                label={t(componentContent.form.kurdishInfo)}
                                value={values.englishInfo}
                                onChange={handleInput}
                            />
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
                    </div>

                </div>

                {/* flash message */}
                {flash}
            </div>
        </>
    )
}









/**
 * making the select options
 * 
 * @param {Array} options : options array
 * @param {String} language : language symbol
 * 
 * @return {Array} : options array
 */
function makeOptions(options, language) {
    return options.map(option => {
        return {
            value: option.id,
            label: language ? option.name[language] : option.name.en ? option.name.en : option.name
        }
    })
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