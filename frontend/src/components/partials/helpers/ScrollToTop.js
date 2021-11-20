import { useEffect } from 'react'
import { useLocation } from "react-router-dom"




/**
 * scroll to top element is scrolling the window to top when the roure changes
 * 
 * @return {Element} : scrool to top element
 */
export default function ScrollToTop() {

    // getting the current route url
    const { pathname } = useLocation()

    // scrolling to top when the path changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname])


    return null
}
