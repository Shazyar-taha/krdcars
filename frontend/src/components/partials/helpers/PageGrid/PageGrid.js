import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import classNames from 'classnames'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'

import './page-grid.scoped.scss'



/**
 * Outlined grid element
 * 
 * @param {Object} props : properties of the element
 *      @param {String} props.external : determines if the details is external or not
 *      @param {String} props.oneLang : determines if the grid items has one language
 *      @param {String} props.className : custom class name for the list
 *      @param {String} props.style : custom style name for the list
 *      @param {Array} props.list : page list
 *      @param {Array} props.titleKeyName : key name for the title of each item
 *      @param {String} props.fullUrl : full url path to the card link
 *      @param {Object} props.gridConfigs : grid configurations
 *          @param {Number} props.gridConfigs.spacing : grid element spacing
 *          @param {Number} props.gridConfigs.xs : grid xs item siFze
 *          @param {Number} props.gridConfigs.md : grid md item size
 *          @param {Number} props.gridConfigs.lg : grid lg item size
 * 
 *  @return {Element} : Outlined grid element
 */
export function OutlinedGrid(props) {

    let titleKeyName = props.titleKeyName || 'title'

    // translation hook
    const { t } = useTranslation()

    return (
        <Grid container className={classNames("page-outlined-grid", props.className || '')} style={props.style}
            spacing={props.gridConfigs?.spacing || 4} // default spacing if not defined
        >

            {/* grid cards */}
            {props.list.map((item, i) => (

                // each grid card
                <Grid key={i} item
                    xs={props.gridConfigs?.xs || 12} // default xs size if not defined
                    md={props.gridConfigs?.md || 6} // default md size if not defined
                    lg={props.gridConfigs?.lg || 4} // default lg size if not defined
                >

                    {/* card link */}
                    <Link
                        to={{
                            pathname: item.otherUrl ||
                                `${props.fullUrl && // checking if the fullUrl is availabel
                                    /\[(\w+)\]/.test(props.fullUrl) ? // checking if the fullUrl has a dynamic key
                                    props.fullUrl.replace(/\[(\w+)\]/g, item[props.fullUrl.match(/\[(\w+)\]/)[1]]) : // replacing the dynamic key with its value in the item
                                    props.fullUrl || '' // if the fullUrl is not containg a dynamic key then use it normally, or if it is not provided at all then use an empty string
                                }/${item.url}`
                        }}
                        target={item.otherUrl ? '_blank' : '_self'}
                    >
                        <Card className="grid-card">
                            <CardContent>

                                {/* card title */}
                                <Typography variant="h5"
                                    className={classNames("card-title", props.oneLang ? props.oneLang : t('configs.font_class_name'))}
                                >
                                    {
                                        props.oneLang ? t(item[titleKeyName]) :
                                            props.external ? item[titleKeyName]?.[i18n.language] : t(item[titleKeyName])
                                    }
                                </Typography>

                                {/* card description */}
                                {item.description &&
                                    <Typography variant="body1" className={classNames("card-description", t('configs.font_class_name'))}>
                                        {props.external ?
                                            item.description?.[i18n.language].length > 100 ?
                                                item.description?.[i18n.language].substring(0, 100) + '...' : item.description?.[i18n.language]
                                            :
                                            t(item.description).length > 100 ?
                                                t(item.description).substring(0, 100) + '...' : t(item.description)
                                        }
                                    </Typography>
                                }

                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    )
}



/**
 * centered grid element
 * 
 * @param {Object} props : properties of the element
 *      @param {String} props.external : determines if the details is external or not
 *      @param {String} props.oneLang : determines if the grid items has one language
 *      @param {String} props.className : custom class name for the list
 *      @param {String} props.style : custom style name for the list
 *      @param {Array} props.list : page list
 *      @param {String} props.fullUrl : full url path to the card link
 *      @param {String} props.imagePrefix : prefix text of images, it is 'data:image/png;base64,' by default
 *      @param {Object} props.gridConfigs : grid configurations
 *          @param {Number} props.gridConfigs.spacing : grid element spacing
 *          @param {Number} props.gridConfigs.xs : grid xs item siFze
 *          @param {Number} props.gridConfigs.md : grid md item size
 *          @param {Number} props.gridConfigs.lg : grid lg item size
 * 
 *  @return {Element} : centered grid element
 */
export function CenteredGrid(props) {

    // translation hook
    const { t } = useTranslation()

    return (
        <Grid container className={classNames("page-centered-grid", props.className || '')} style={props.style}
            spacing={props.gridConfigs?.spacing || 4} // default spacing if not defined
        >

            {/* grid cards */}
            {props.list.map((item, i) => (

                // each grid card
                <Grid key={i} item className="grid-item"
                    xs={props.gridConfigs?.xs || 6} // default xs size if not defined
                    md={props.gridConfigs?.md || 4} // default md size if not defined
                    lg={props.gridConfigs?.lg || 3} // default lg size if not defined
                >

                    {/* card link */}
                    <Link
                        to={{
                            pathname: item.otherUrl ||
                                `${props.fullUrl && // checking if the fullUrl is availabel
                                    /\[(\w+)\]/.test(props.fullUrl) ? // checking if the fullUrl has a dynamic key
                                    props.fullUrl.replace(/\[(\w+)\]/g, item[props.fullUrl.match(/\[(\w+)\]/)[1]]) : // replacing the dynamic key with its value in the item
                                    props.fullUrl || '' // if the fullUrl is not containg a dynamic key then use it normally, or if it is not provided at all then use an empty string
                                }/${item.url}`
                        }}
                        target={item.otherUrl ? '_blank' : '_self'}
                    >

                        {/* item image */}
                        <img src={props.imagePrefix || '' + item.image} alt={item.title} className="item-image" />

                        {/* item title */}
                        <Typography variant="h5" className="item-title english-font">
                            {
                                props.oneLang ? item.title :
                                    props.external ? item.title?.[i18n.language] : t(item.title)
                            }
                        </Typography>
                    </Link>
                </Grid>
            ))}
        </Grid>
    )
}