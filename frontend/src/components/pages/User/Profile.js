import React from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import axios from 'axios'

export default function Profile() {

    const history = useHistory()

    // user state
    const user = useSelector(state => state.user)

    // if the user not loged in, rerowting to login
    if (user == null) {
        history.push('/login')
    }

    // axios.get('/apis/account/user-cockie')
    //     .then(res => {
    //         console.log(res.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    return (
        <>
            hello
        </>
    );
}
