import {configureStore} from '@reduxjs/toolkit'
import postReducer from './postSlice.js'
import toggleReducer from './toggleSlice.js'
import userReducer from './userSlice.js'

const store = configureStore({
    reducer:{
        item:postReducer,
        anime:toggleReducer,
        user:userReducer
    }
})
export default store