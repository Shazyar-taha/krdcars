import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import classNames from 'classnames'
import kebabCase from 'lodash/kebabCase'

import '../info.scoped.scss'
import Language from '../../../partials/helpers/Language'
import { Link } from 'react-router-dom'



// component content
let componentContent = {
    title: {
        en: 'Car Production Companies',
        kr: 'کۆمپانیاکانی بەرهەمهێنانی ئوتومبێل'
    },
}



/**
 *  @return {Element} : info brands page
 */
export default function InfoBrands() {

    // brand list state
    const [brands, setBrands] = useState([]);

    // get the brands list
    useEffect(() => {
        /**
        * @TODO : fetch from server
        */
        const response = [
            {
                name: { en: 'Mitsubishi', kr: 'میسۆبیشی' },
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/2381px-Mitsubishi_logo.svg.png'
            },
            {
                name: { en: 'Maseraty', kr: 'ماسێراتی' },
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcgsvwop0SIxlaP4knSlTeF8M-0MUQu2hc7g&usqp=CAU'
            },
        ]

        setBrands(response)
    }, [])



    return (
        <div className="info info-brands" dir="auto">
            <Container>

                {/* info title */}
                <div className="info-title">
                    <Typography variant="h1" className={classNames("title-h1", Language.getClassName())}>
                        {componentContent.title[Language.getLanguage()]}
                    </Typography>
                </div>

                {/* brand list */}
                <Grid container className="info-brands-grid" spacing={4}>

                    {/* grid item */}
                    {brands.map((brand, index) => (
                        <Grid key={index} item xs={6} sm={4} md={3} className="grid-item">
                            <Link to={`/info/brands/${kebabCase(brand.name.en)}`}>

                                {/* item image */}
                                <img src={brand.image} alt={brand[Language.getLanguage()]} className="item-image" />

                                {/* item title */}
                                <Typography variant="h5" className={classNames("item-title", Language.getClassName())}>
                                    {brand.name[Language.getLanguage()]}
                                </Typography>
                            </Link>
                        </Grid>
                    ))}

                </Grid>

            </Container>
        </div>
    )
}
