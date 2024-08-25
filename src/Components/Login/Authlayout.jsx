import React from 'react'
import { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Authlayout({children, authentication = true}) {
    const navigate=useNavigate();
    const [loading,setloading]=useState(true);
    const authstatus=useSelector(state=>state.auth.status)/// aa check karvu

    useEffect(()=>{
        if(authentication && authstatus!=authentication ){
            navigate("/login")
        }else if(!authentication && authstatus!=authentication ){
            navigate("/")
        }
        setloading(false)
    },[authstatus,authentication,navigate])

    return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default Authlayout
