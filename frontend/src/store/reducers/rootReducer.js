import { combineReducers } from 'redux'

import languageReducer from "./language";



// Combine all reducers
const rootReducer = combineReducers({
    language: languageReducer
})



export default rootReducer