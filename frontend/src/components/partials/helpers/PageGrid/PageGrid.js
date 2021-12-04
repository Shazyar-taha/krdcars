import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import classNames from 'classnames'

import './page-grid.scoped.scss'
import { getLanguage, getClassName } from '../../../partials/helpers/language'



/**
 * Outlined grid element
 * 
 * @param {Object} props : properties of the element
 *      @param {String} props.className : custom class name for the list
 *      @param {Array} props.list : page list
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
    return (
        <Grid container className={classNames("page-outlined-grid", props.className || '')}
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
                        to={{ pathname: item.otherUrl || `${props.fullUrl || ''}/${item.url}` }}
                        target={item.otherUrl ? '_blank' : '_self'}
                    >
                        <Card className="grid-card">
                            <CardContent>

                                {/* card title */}
                                <Typography variant="h5" className={classNames("card-title", getClassName())}>
                                    {item.title[getLanguage()]}
                                </Typography>

                                {/* card description */}
                                <Typography variant="body1" className={classNames("card-description", getClassName())}>
                                    {item.description[getLanguage()]}
                                </Typography>

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
 *      @param {String} props.className : custom class name for the list
 *      @param {Array} props.list : page list
 *      @param {String} props.fullUrl : full url path to the card link
 *      @param {Object} props.gridConfigs : grid configurations
 *          @param {Number} props.gridConfigs.spacing : grid element spacing
 *          @param {Number} props.gridConfigs.xs : grid xs item siFze
 *          @param {Number} props.gridConfigs.md : grid md item size
 *          @param {Number} props.gridConfigs.lg : grid lg item size
 * 
 *  @return {Element} : centered grid element
 */
export function CenteredGrid(props) {
    return (
        <Grid container className={classNames("page-centered-grid", props.className || '')}
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
                        to={{ pathname: item.otherUrl || `${props.fullUrl || ''}/${item.url}` }}
                        target={item.otherUrl ? '_blank' : '_self'}
                    >

                        {/* item image */}
                        <img src={item.image} alt={item.title[getLanguage()]} className="item-image" />

                        {/* item title */}
                        <Typography variant="h5" className={classNames("item-title", getClassName())}>
                            {item.title[getLanguage()]}
                        </Typography>
                    </Link>
                </Grid>
            ))}
        </Grid>
    )
}