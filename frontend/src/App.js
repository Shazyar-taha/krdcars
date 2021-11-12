import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Aos from 'aos'
import 'aos/dist/aos.css';

import './components/partials/designs/stylesheets/main.scss'
import Language from './components/partials/helpers/Language'
import Header from './components/partials/Header/Header';
import Home from './components/pages/Home/Home';



/**
 *  @return {Element} : app frontend
 */
export default function App() {

    // initiating language helper cookie check constructor
    new Language()


    useEffect(() => {
        // removing the preload class from the body when the page is ready
        // preload class prevent anything to animate before the whole page is ready
        document.getElementsByTagName('body')[0].classList.remove('preload')

        // initiating AOS library
        Aos.init({})
    }, [])


    return (
        <Router>

            {/* material ui css baselines */}
            <CssBaseline />

            {/* header of the document */}
            <Header />

            {/* routes switch */}
            <Switch>

                {/* home page */}
                <Route path='/' exact>
                    <Home />
                </Route>

            </Switch>

            <div style={{ position: 'absolute', top: '2000px' }}>hello</div>

        </Router>
    );
}