// user reducer
const userReducer = (state = null, action) => {
    switch (action.type) {

        // login case
        case 'LOGIN':
            return action.payload

        // logout case
        case 'LOGOUT':
            return null

        // default case
        default:
            return state
    }
}


export default userReducer