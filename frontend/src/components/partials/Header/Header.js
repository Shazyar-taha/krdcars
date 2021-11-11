import React, { useState } from 'react'
import { Container } from '@mui/material'
import { useLocation } from 'react-router';
import { NavLink, Link } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import classNames from 'classnames';

import './header.scoped.scss'
import Language from '../helpers/Language';
import Brand from '../Brand/Brand'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import LanguageSelector from './LanguageSelector/LanguageSelector';


// component content
let componentContent = {
    navLinks: [
        { name: { en: 'Home', kr: 'سەرەتا' }, url: '/' },
        { name: { en: 'Informations', kr: 'زانیاریەکان' }, url: '/info' },
        { name: { en: 'Vehicle Parts', kr: 'پارچەکان' }, url: '/info/parts' },
        { name: { en: 'Violation', kr: 'سەرپێچی' }, url: '/violation' },
        { name: { en: 'Store', kr: 'کڕین و فرۆشتن' }, url: '/store' },
        { name: { en: 'About', kr: 'دەربارە' }, url: '/about' },
    ]
}



/**
 *  @return {Element} : app header
 */
export default function Header() {

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


    return (
        <div className="header">

            {/* mui container for header paddin */}
            <Container>

                {/* header navigation */}
                <nav className="nav">

                    {/* header brand */}
                    <div className="nav-brand">
                        <Link to="/">
                            <Brand krdColor={thisPath === '/' ? 'var(--white-color)' : ''} style={{ height: "var(--x-small-font-size)" }} />
                        </Link>
                    </div>

                    {/* navbar hamburger */}
                    <div className={classNames("nav-burger", { 'nav-burger-open': drawerState })} onClick={toggleDrawer}>
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                    </div>

                    {/* navigation links */}
                    <ul className={classNames("nav-links", Language.getClassName())}
                        style={Language.getLanguage() === 'kr' ? { flexDirection: "row-reverse" } : {}}
                    >
                        {
                            componentContent.navLinks.map((link, i) => (
                                <li key={i}>
                                    <NavLink to={link.url} className={classNames("link", { 'white-only': thisPath === '/' })} onClick={toggleDrawer}>
                                        {link.name[Language.getLanguage()]}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>

                    {/* navigation buttons */}
                    <div className="nav-buttons">
                        <Link to="/search" className={classNames("button", { 'white-only': thisPath === '/' })}>
                            <SearchOutlinedIcon />
                        </Link>
                        <div className={classNames("button", { 'white-only': thisPath === '/' })}>
                            <LanguageSelector />
                        </div>
                        <div className={classNames("button", { 'white-only': thisPath === '/' })}>
                            <ThemeSwitcher />
                        </div>
                        <Link to="/sign-up" className={classNames("button", { 'white-only': thisPath === '/' })} onClick={closeDrawer}>
                            <AccountCircleOutlinedIcon />
                        </Link>
                    </div>



                    {/* navigation drawer */}
                    <div className={classNames("nav-drawer", { 'nav-drawer-open': drawerState })}>

                        {/* drawer links */}
                        <ul className={classNames("drawer-links", Language.getClassName())}>
                            {
                                componentContent.navLinks.map((link, i) => (
                                    <li key={i}>
                                        <NavLink to={link.url} className="link" onClick={toggleDrawer}>
                                            {link.name[Language.getLanguage()]}
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
                            <Link to="/sign-up" className="button" onClick={closeDrawer}>
                                <AccountCircleOutlinedIcon />
                            </Link>
                        </div>
                    </div>

                </nav>
            </Container>
        </div>
    )
}
