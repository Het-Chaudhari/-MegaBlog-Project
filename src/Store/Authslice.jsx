import { createSlice } from "@reduxjs/toolkit";




const initialState={
    status:false,
    userData:null
}




export const Authslice=createSlice({

    name:"het",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload//////// payload.userdata may be 
        },
        logout:(state,action)=>{
            state.status=false,
            state.userData=null
        }
    }

})

export const {login,logout} = Authslice.actions

export default Authslice.reducer