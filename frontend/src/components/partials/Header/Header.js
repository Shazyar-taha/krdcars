import React, { useState } from 'react'
import { useLocation } from 'react-router';
import { Container } from '@mui/material'
import { NavLink, Link } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import classNames from 'classnames';
import i18n from 'i18next'
import { useTranslation } from 'react-i18next';

import './header.scoped.scss'
import Brand from '../Brand/Brand'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import LanguageSelector from './LanguageSelector/LanguageSelector';



// component content
let componentContent = {
    navLinks: [
        { title: 'partials.header.links.home', url: '/', options: { exact: true } },
        {
            title: 'partials.header.links.informations', url: '/info',
            options: {
                isActive: (match, location) =>
                    location.pathname.startsWith('/info') && !location.pathname.startsWith('/info/cars')
            }
        },
        {
            title: 'partials.header.links.cars', url: '/info/cars',
            options: { isActive: (match, location) => location.pathname.startsWith('/info/cars') }
        },
        { title: 'partials.header.links.violation', url: '/violation' },
        // { title: 'partials.header.links.store', url: '/store' },
        { title: 'partials.header.links.about', url: '/about' },
    ],
    whiteNavLinks: ['/'],
    blackNavLinks: ['/user/login', '/user/register'],
}



/**
 *  @return {Element} : app header
 */
export default function Header() {

    // translation hook
    const { t } = useTranslation()


    // getting curent location
    const thisPath = useLocation().pathname


    // drawer state
    const [drawerState, setDrawerState] = useState(false)

    // toggling drawer Function
    function toggleDrawer(e) {
        setDrawerState(!drawerState)
    }

    function closeDrawer() {
        setDrawerState(false)
    }


    // navigation color based on the url it is colored in
    let navColor =
        componentContent.whiteNavLinks.includes(thisPath) && !drawerState ? 'white' :
            componentContent.blackNavLinks.includes(thisPath) && !drawerState ? 'black' : ''

    // brand color based on the url it is colored in
    let brandColor =
        componentContent.whiteNavLinks.includes(thisPath) ? 'var(--white-color)' :
            componentContent.blackNavLinks.includes(thisPath) ? 'var(--black-color)' : undefined


    return (
        <div className="header">

            {/* mui container for header paddin */}
            <Container>

                {/* header navigation */}
                <nav className="nav">

                    {/* header brand */}
                    <div className="nav-brand">
                        <Link to="/">
                            <Brand krdColor={brandColor} style={{ height: "var(--x-small-font-size)" }} />
                        </Link>
                    </div>

                    {/* navbar hamburger */}
                    <div className={classNames("nav-burger", { 'nav-burger-open': drawerState })} onClick={toggleDrawer}>
                        <span className={classNames("burger-line", navColor)}></span>
                        <span className={classNames("burger-line", navColor)}></span>
                        <span className={classNames("burger-line", navColor)}></span>
                    </div>

                    {/* navigation links */}
                    <ul className={classNames("nav-links", t('configs.font_class_name'))}
                        style={i18n.language === 'kr' ? { flexDirection: "row-reverse" } : {}}
                    >
                        {
                            componentContent.navLinks.map((link, i) => (
                                <li key={i}>
                                    <NavLink
                                        to={link.url}
                                        className={classNames("link", navColor)}
                                        onClick={closeDrawer}
                                        {...link.options}
                                    >
                                        {t(link.title)}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>

                    {/* navigation buttons */}
                    <div className="nav-buttons">
                        <Link to="/search" className={classNames("button", navColor)}>
                            <SearchOutlinedIcon />
                        </Link>
                        <div className={classNames("button", navColor)}>
                            <LanguageSelector />
                        </div>
                        <div className={classNames("button", navColor)}>
                            <ThemeSwitcher />
                        </div>
                        <Link to="/user/profile" className={classNames("button", navColor)} onClick={closeDrawer}>
                            <AccountCircleOutlinedIcon />
                        </Link>
                    </div>



                    {/* navigation drawer */}
                    <div className={classNames("nav-drawer", { 'nav-drawer-open': drawerState })}>

                        {/* drawer links */}
                        <ul className={classNames("drawer-links", t('configs.font_class_name'))}>
                            {
                                componentContent.navLinks.map((link, i) => (
                                    <li key={i}>
                                        <NavLink
                                            to={link.url}
                                            className={classNames("link")}
                                            onClick={closeDrawer}
                                            {...link.options}
                                        >
                                            {t(link.title)}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>

                        {/* drawer buttons */}
                        <div className="drawer-buttons">
                            <Link to="/search" className="button">
                                <SearchOutlinedIcon />
                            </Link>
                            <div className="button">
                                <LanguageSelector />
                            </div>
                            <div className="button">
                                <ThemeSwitcher />
                            </div>
                            <Link to="/user/profile" className="button" onClick={closeDrawer}>
                                <AccountCircleOutlinedIcon />
                            </Link>
                        </div>
                    </div>

                </nav>
            </Container>
        </div>
    )
}
