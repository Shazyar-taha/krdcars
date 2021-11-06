import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/partials/Header/Header';
import './components/partials/designs/stylesheets/main.scss'



/**
 *  @return {Element} : app frontend
 */
export default function App() {

    // removing the preload class from the body when the page is ready
    // preload class prevent anything to animate before the whole page is ready
    useEffect(() => {
        document.getElementsByTagName('body')[0].classList.remove('preload')
    }, [])


    return (
        <Router>

            {/* material ui css baselines */}
            <CssBaseline />

            {/* header of the document */}
            <Header />
        </Router>
    );
}