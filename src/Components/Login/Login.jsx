import React  from 'react'
import {useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState} from 'react'
import {useForm} from "react-hook-form"
import authservices from '../../appwrite/authentication'
import { login as storelogin } from '../../Store/Authslice'
import Logo from '../Logo'
import { Link } from 'react-router-dom'
import Input from '../Input/Input'
import Button from '../Button'


//////-------------------------line 59 ma last &epos karine shu che 

//// ama input ,button ,logo ma problem che kem ke e nam change karva par kam nathi karta 

// koi login kare to (1) appwrite ma login karvu pade
/////////////////////(2) ene navigate karvu pade login page par kem k login che
/////////////////////(3) store ma state update karvi pade 
/////////////we will not handel this case in this senario///////(4) jo login na hoy to ane hoy to logout batavu pade

function Login() {

    const [error, setError] = useState("")
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {register, handleSubmit} = useForm()

    const handellogin=async(data)=>{////jya handel login vaprie tya data apvo padse
        setError("")
         try {
            const session= await authservices.login(data)
            if(session){
                const userdata=await authservices.getcurrentuser()
                if(userdata){
                    dispatch(storelogin(userdata))
                    navigate("/")
                }
            }
         } catch (error) {
            console.log("error avi login ma")
            setError(error.message)
         }
    }



    return (
        
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Donot have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(handellogin)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >Sign in</Button>
                </div>
            </form>
            </div>
        </div>
      )
    }

    

export default Login
