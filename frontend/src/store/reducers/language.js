/**
 * language reducer
 * 
 * 
 * @param {Object} state : current state
 * @param {Object} action : action object
 * 
 * @return {Object} new state
 */
const languageReducer = (state = localStorage.getItem('language'), action) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return action.payload;
        default:
            return state;
    }
}



export default languageReducer;