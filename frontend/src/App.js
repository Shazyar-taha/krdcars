import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Aos from 'aos'
import 'aos/dist/aos.css';

import './components/partials/designs/stylesheets/main.scss'
import { initLanguage } from './components/partials/helpers/language'
import ScrollToTop from './components/partials/helpers/ScrollToTop'
import UserCookieChech from './components/partials/helpers/UserCookieChech';
import ProtectedRoute from './components/partials/helpers/ProtectedRoute';
import Header from './components/partials/Header/Header';
import Footer from './components/partials/Footer/Footer';
import Home from './components/pages/Home/Home';
import InfoRoutes from './components/pages/Info/InfoRoutes';
import Violation from './components/pages/Violation/Violation';
import ContactRoutes from './components/pages/Contact/ContactRoutes';
import SearchRoute from './components/pages/Search/SearchRoute';
import Profile from './components/pages/User/Profile/Profile';
import Login from './components/pages/User/Login';
import Register from './components/pages/User/Register';
import ChangePassword from './components/pages/User/Profile/ChangePassword';




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

                {/* contact route */}
                <Route path='/contact' exact>
                    <ContactRoutes />
                </Route>

                {/* search route */}
                <Route path='/search' exact>
                    <SearchRoute />
                </Route>


                {/* profile route */}
                <ProtectedRoute path='/user/profile' condition="loggedIn" reroutePath="/user/login" exact>
                    <Profile />
                </ProtectedRoute>
                {/* login route */}
                <ProtectedRoute path='/user/login' condition="loggedOut" reroutePath="/user/profile" exact>
                    <Login />
                </ProtectedRoute>
                {/* register route */}
                <ProtectedRoute path='/user/register' condition="loggedOut" reroutePath="/user/profile" exact>
                    <Register />
                </ProtectedRoute>
                {/* change password route */}
                <ProtectedRoute path='/user/change-password' condition="loggedIn" reroutePath="/user/login" exact>
                    <ChangePassword />
                </ProtectedRoute>

            </Switch>

            {/* footer of the document */}
            <Footer />

        </Router>
    );
}