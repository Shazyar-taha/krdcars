import React from 'react'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import './Info-preview.scoped.scss'
import { Link } from 'react-router-dom'




/**
 * information preview component
 * 
 * @param {Object} props : properties of the element
 *      @param {String} props.classNames : extending classnames
 *      @param {String} props.style : extending stilings
 *      @param {String} props.external : determines if the details is external or not
 *      @param {String} props.description : information description
 *      @param {String} props.image : infromation image
 *      @param {String} props.imageAlt : alt text for the image
 *      @param {String} props.SubText : alt text of the iamge
 *      @param {String} props.subTextLinkTemplate : template url for each link
 * 
 * @return {Element} : info preview element
 */
export default function InfoPreview(props) {

    // translation hook
    const { t } = useTranslation()

    return (
        <div className={classNames("info-preview",{'single-side': (!props.SubText && !props.image)} , props.className)} style={props.style}>

            {/* side */}
            <div className="side-1">

                {/* description */}
                <div className="info-description">
                    <p className={classNames("description", t('configs.font_class_name'))}>
                        {props.external ? props.description[i18n.language] : t(props.description)}
                    </p>
                </div>
            </div>


            {/* side */}
            {(props.SubText || props.image) &&
                <div className="side-2">

                    {/* info-image */}
                    {props.image &&
                        <div className="info-image">
                            <img className="image" src={props.image} alt={props.external ? props.imageAlt[i18n.language] : t(props.imageAlt)}
                            />
                        </div>
                    }

                    {/* info image subtext */}
                    {props.SubText &&
                        <div className="info-subtext">

                            {/* if the subtext is array, then showing them in ul, otherwise as a string */}
                            {Array.isArray(props.subText) ?
                                <ul className={classNames("subtext-ul", t('configs.font_class_name'))}>
                                    {props.subText.map((subtext, i) =>
                                        <li key={i} className="subtext-li">
                                            <Link to={`${props.subTextLinkTemplate}?year=${subtext}`}>{subtext}</Link>
                                        </li>
                                    )}
                                </ul>
                                :
                                <p className={classNames("subtext-p", t('configs.font_class_name'))}>
                                    {props.subText}
                                </p>
                            }
                        </div>
                    }
                </div>
            }

        </div>
    )
}
