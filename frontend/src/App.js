import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Aos from 'aos'
import 'aos/dist/aos.css';

import './components/partials/designs/stylesheets/main.scss'
import { initLanguage } from './components/partials/helpers/language'
import ScrollToTop from './components/partials/helpers/ScrollToTop'
import UserCookieChech from './components/partials/helpers/UserCookieChech';
import Header from './components/partials/Header/Header';
import Footer from './components/partials/Footer/Footer';
import Home from './components/pages/Home/Home';
import InfoRoutes from './components/pages/Info/InfoRoutes';
import Violation from './components/pages/Violation/Violation';
import ContactRoutes from './components/pages/Contact/ContactRoutes';
import SearchRoute from './components/pages/Search/SearchRoute';
import UserRoutes from './components/pages/User/UserRoutes';
import About from './components/pages/About/About';




/**
 *  @return {Element} : app frontend
 */
export default function App() {

    // initiating language cookie check
    initLanguage()

    useEffect(() => {
        // removing the preload class from the body when the page is ready
        // preload class prevent anything to animate before the whole page is ready
        document.getElementsByTagName('body')[0].classList.remove('preload')

        // initiating AOS library
        Aos.init({})
    }, [])

    return (
        <Router>

            {/* user cookie check */}
            <UserCookieChech />

            {/* material ui css baselines */}
            <CssBaseline />

            {/* scroll to top on route change */}
            <ScrollToTop />

            {/* header of the document */}
            <Header />

            {/* routes switch */}
            <Switch>

                {/* home page */}
                <Route path='/' exact>
                    <Home />
                </Route>

                {/* info route */}
                <Route path='/info'>
                    <InfoRoutes />
                </Route>

                {/* violation route */}
                <Route path='/violation' exact>
                    <Violation />
                </Route>

                {/* search route */}
                <Route path='/search' exact>
                    <SearchRoute />
                </Route>

                {/* contact route */}
                <Route path='/contact'>
                    <ContactRoutes />
                </Route>

                {/* user routes */}
                <Route path='/user'>
                    <UserRoutes />
                </Route>

                {/* user routes */}
                <Route path='/about'>
                    <About />
                </Route>

            </Switch>

            {/* footer of the document */}
            <Footer />

        </Router>
    );
}