import React, { useState } from 'react'
import { Container } from '@mui/material'
import { NavLink, Link } from 'react-router-dom'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import classNames from 'classnames';

import Brand from '../Brand/Brand'
import './header.scoped.scss'


// component content
let componentContent = {
    kr: {
        navLinks: [
            { name: 'سەرەتا', url: '/' },
            { name: 'دەربارە', url: '/about' },
            { name: 'زانیاریەکان', url: '/info' },
            { name: 'بەشەکان', url: '/info/parts' },
            { name: 'سەرپێچی', url: '/violation' },
            { name: 'کڕین و فرۆشتن', url: '/store' },
        ]
    }
}



/**
 *  @return {Element} : app header
 */
export default function Header() {

    // drawer state
    const [drawerState, setDrawerState] = useState(false)

    // toggling drawer Function
    function toggleDrawer(e) {
        setDrawerState(!drawerState)
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
                            <Brand style={{ height: "var(--nav-link-font-size)" }} />
                        </Link>
                    </div>

                    {/* navbar hamburger */}
                    <div className={classNames("nav-burger", { 'nav-burger-open': drawerState })} onClick={toggleDrawer}>
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                    </div>

                    {/* navigation links */}
                    <ul className="nav-links" style={{ flexDirection: "row-reverse" }}>
                        {
                            componentContent.kr.navLinks.map((link, i) => (
                                <li key={i}>
                                    <NavLink to={link.url} className="link" onClick={toggleDrawer}>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>

                    {/* navigation buttons */}
                    <div className="nav-buttons">
                        <Link to="/" className="button">
                            <SearchOutlinedIcon onClick={toggleDrawer} />
                        </Link>
                        <Link to="/" className="button">
                            <LanguageOutlinedIcon />
                        </Link>
                        <Link to="/" className="button">
                            <Brightness4OutlinedIcon />
                        </Link>
                        <Link to="/" className="button">
                            <AccountCircleOutlinedIcon />
                        </Link>
                    </div>


                    {/* navigation drawer */}
                    <div className={classNames("nav-drawer", { 'nav-drawer-open': drawerState })}>

                        {/* drawer links */}
                        <ul className="drawer-links" >
                            {
                                componentContent.kr.navLinks.map((link, i) => (
                                    <li key={i}>
                                        <NavLink to={link.url} className="link" onClick={() => setDrawerState(false)}>
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>

                        {/* drawer buttons */}
                        <div className="drawer-buttons">
                            <Link to="/" className="button">
                                <SearchOutlinedIcon />
                            </Link>
                            <Link to="/" className="button">
                                <LanguageOutlinedIcon />
                            </Link>
                            <Link to="/" className="button">
                                <Brightness4OutlinedIcon />
                            </Link>
                            <Link to="/" className="button" onClick={() => setDrawerState(false)}>
                                <AccountCircleOutlinedIcon />
                            </Link>
                        </div>
                    </div>

                </nav>

            </Container>
        </div>
    )
}
