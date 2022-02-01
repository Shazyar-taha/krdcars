import { combineReducers } from 'redux'

import userReducer from './userReducer'



// Combine all reducers
const rootReducer = combineReducers({
    user: userReducer
})



export default rootReducer