import { createStore } from 'redux';

import rootReducer from './reducers/rootReducer';



// Create the store
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



export default store;