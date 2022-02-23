import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from "react-router-dom"




// protected routes
const protectedRoutes = [
    { path: '/user/profile', condition: 'loggedIn', reroutePath: '/user/login' },
    { path: '/user/login', condition: 'loggedOut', reroutePath: '/user/profile' },
    { path: '/user/register', condition: 'loggedOut', reroutePath: '/user/profile' },
    { path: '/user/change-password', condition: 'loggedIn', reroutePath: '/user/login' }
]




/**
 * chechs the user cookie every time the route changes
 * 
 * @return {Element} : user cookie check
 */
export default function UserCookieChech() {

    const { pathname } = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()

    // user state
    const user = useSelector(state => state.user)


    // checking route
    function checkRoute() {

        // checking for the protected routes
        protectedRoutes.forEach(route => {
            if (pathname === route.path) {

                // if the condition is not met, redirecting to the login page
                if ((route.condition === 'loggedIn' && !user) || (route.condition === 'loggedOut' && user)) {
                    history.push(route.reroutePath)
                }
            }
        })
    }


    // scrolling to top when the path changes
    useEffect(() => {
        // getting user cookie
        axios.get('/apis/account/user-cockie')
            .then(res => {

                // if a user cookie is found but not stored, dispatching it
                if (res.data && !user) {
                    dispatch({
                        type: 'LOGIN',
                        payload: true
                    })
                }

                // if the user cookie is not found but the store had one, dispatching null
                if (!res.data.id && user) {
                    dispatch({
                        type: 'LOGOUT'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

        checkRoute()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    checkRoute()

    return null
}