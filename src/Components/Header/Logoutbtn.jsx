import React from 'react'
import {logout} from "../../Store/Authslice"
import {useDispatch} from 'react-redux'
import authservices from '../../appwrite/authentication'

function Logoutbtn() {

    const dispatch=useDispatch();

    const logouthandler=()=>{
        authservices.logout().then(()=>{
            dispatch(logout())
        })
    }


  return (
    <div>
      <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logouthandler}
    >Logout</button>
    </div>
  )
}

export default Logoutbtn
