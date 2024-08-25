import Authslice from "./Authslice";
import {configureStore} from '@reduxjs/toolkit'

const Store =configureStore({
    reducer:{
        auth:Authslice
    }
})

export default Store


 
