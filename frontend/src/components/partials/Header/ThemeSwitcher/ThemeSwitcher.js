import React, { useState, useEffect } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

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


    // getting the other theme color changing the theme color
    const otherTheme = (currentTheme) => currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'light' : 'light'

    // theme switch toogle
    function toggleTheme(e) {
        setThemeState(otherTheme(e.target.closest('.theme-switcher').getAttribute('theme')))
    }


    return (
        <div className="theme-switcher" onClick={toggleTheme} theme={themeState} >
            {themeState === 'light' ? <DarkModeIcon /> : themeState === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </div>
    )
}
