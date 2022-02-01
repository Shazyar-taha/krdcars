import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from "react-router-dom"




/**
 * chechs the user cookie every time the route changes
 * 
 * @return {Element} : user cookie check
 */
export default function UserCookieChech() {

    // getting the current route url
    const { pathname } = useLocation()


    const dispatch = useDispatch()

    // user state
    const user = useSelector(state => state.user)

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])


    return null
}
