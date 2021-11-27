import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Aos from 'aos'
import 'aos/dist/aos.css';

import './components/partials/designs/stylesheets/main.scss'
import Language from './components/partials/helpers/Language'
import ScrollToTop from './components/partials/helpers/ScrollToTop'
import Header from './components/partials/Header/Header';
import Footer from './components/partials/Footer/Footer';
import Home from './components/pages/Home/Home';
import InfoIndex from './components/pages/Info/InfoIndex/InfoIndex';
import InfoBrands from './components/pages/Info/InfoBrands/InfoBrands';
import InfoBrandPreview from './components/pages/Info/InfoBrandPreview/InfoBrandPreview';




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

                {/* info page */}
                <Route path='/info' exact>
                    <InfoIndex />
                </Route>
                {/* info/brands page */}
                <Route path='/info/brands' exact>
                    <InfoBrands />
                </Route>
                {/* info/brands/:brand page */}
                <Route path='/info/brands/:brand' exact>
                    <InfoBrandPreview />
                </Route>

            </Switch>

            {/* footer of the document */}
            <Footer />

        </Router>
    );
}