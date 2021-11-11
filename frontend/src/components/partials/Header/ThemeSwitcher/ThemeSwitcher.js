import React, { useState, useEffect } from 'react'
import Brightness4Outlined from '@mui/icons-material/Brightness4Outlined'

import './theme-switcher.scoped.scss'



/**
 *  @return {Element} : theme switcher
 */
export default function ThemeSwitcher() {

    // getting user choosen theme color
    const [themeState, setThemeState] = useState(localStorage.getItem('theme-color'))

    // if the local storage theme was not as expected, making a new one
    if (themeState !== 'light' && themeState !== 'dark') {
        setThemeState('light')
    }

    // storing the theme only on its change
    useEffect(() => {
        // adding theme color property to the HTML document
        document.documentElement.setAttribute('theme-color', themeState)

        // saving the user theme changes
        localStorage.setItem('theme-color', themeState)
    }, [themeState])


    // theme switch toogle
    function toggleTheme(e) {
        // if the current theme was light, changing it to dark
        if (e.target.closest('.theme-switcher').getAttribute('theme') === 'light') {
            setThemeState('dark')
        }
        // changing to light otherwise
        else if (e.target.closest('.theme-switcher').getAttribute('theme') === 'dark') {
            setThemeState('light')
        }
    }


    return (
        <div className="theme-switcher" onClick={toggleTheme} theme={themeState} >
            <Brightness4Outlined />
        </div>
    )
}
