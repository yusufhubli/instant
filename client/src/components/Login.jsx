import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AiFillGoogleSquare,AiFillFacebook,AiOutlineEye,AiFillEye } from 'react-icons/ai'
import fetchAPI,{login} from '../api/fetchAPI'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  const [hide,setHide] = useState(true)
    const mode = useSelector(state=>state.item.mode)
    const [log,setLog] = useState({
      Email:"",
      Password:"",
    })

    const [emailError,setEmail] = useState("")
    const [passError,setPass] = useState("")

    const handleSubmit =async() => {
      if( emailError =='' && passError == ''){
        alert("hello")
        const res = await fetchAPI('/auth/register', "POST", log)
        if (res.message) {
          localStorage.setItem("loggedUser", JSON.stringify(res))
          navigate('/')
        } else {
          navigate('/signup')
        }
      }else{
        alert('you have entered wrong input')
      }
  
    }

   useEffect(() => {
    login != '' &&  navigate('/') 
    const { Email, Password } = log
    let n = Email.length
    //console.log(Email.charAt(n - 10))
    //Email
    if (Email === "") {
      setEmail('field cannot empty')
    } else if (Email.length <= 10 == true || Email.charAt(n - 4) != '.' || Email.charAt(n - 10) != '@') {
      setEmail("not a valid email")
    } else {
      setEmail('')
    }

    if (Password === "") {
      setPass('passsword cannot empty')
    } else if (/[0-9]/.test(Password) === false) {
      setPass("Password should contain number")

    } else if (/[a-z]/.test(Password) === false) {
      setPass("Password should contain lowercase letter")

    } else if (/[A-Z]/.test(Password) === false) {
      setPass("Password should contain uppercase letter")
    }
    else if (/[~`!@#$%^&*()_+|\\<>,.?/{[\]=}]/.test(Password) === false) {
      setPass("the Password contain special symbol")

    } else if (Password.length >= 6 != true || Password.length <= 8 != true) {
      setPass('Password length should be 6 to 8')
    }
    else {
      setPass('')
    }
  }, [log])

  return (
    <div className=' pt-28 w-full h-[100vh]'>
      <div className={`${mode == "light"?"bg-dark":"bg-light"} w-[380px] mb-8 pb-6 mx-auto text-center rounded-xl h-auto`}>
         <h1 className=' font-bold text-lg py-5'>Sign In</h1>
         <input type="text" onChange={e=>setLog({...log,Email:e.target.value})} className={` ${mode == "light"?"bg-dark border-gray-100 placeholder:text-white":"bg-light placeholder:text-black border-gray-700"} font-poppins text-[12px] w-[68%] border-[1.5px] py-2 px-4 my-2 outline-none rounded-full`} placeholder='Email' />
        <h6 className={` text-[10.5px] -mt-1.5 ml-[4.5rem] text-red-600 text-left`}>{emailError}</h6>
         <div className=' flex items-center'>
         <input type={hide ? "password" :"text"} onChange={e=>setLog({...log,Password:e.target.value})} 
         className={` ${mode == "light"?"bg-dark border-gray-100 placeholder:text-white":"bg-light placeholder:text-black border-gray-700"} font-poppins text-[12px] w-[68%] ml-[3.8rem] border-[1.5px] py-[7px] px-4 my-2 outline-none rounded-full`} placeholder='Password' />
         { hide ?<AiOutlineEye onClick={()=>setHide(false)} size={17} className='-ml-[2rem] cursor-pointer'/>:<AiFillEye onClick={()=>setHide(true)} size={17} className='-ml-[2rem] cursor-pointer'/>}
         </div>
        <h6 className={` text-[10.5px] -mt-1.5 ml-[4.5rem] text-red-600 text-left`}>{passError}</h6>
         <button onClick={handleSubmit} className={`${mode == "light" ? "bg-light text-black":" bg-dark text-white"} font-bold font-poppins w-[68%] rounded-full text-[12px] py-1.5 mt-2 -mb-0.5 mx-14 border-[1.5px] `}>Sign In</button>
         <small className=' text-[11px] font-poppins'>already have an account <Link to={'/signup'}> <b>Sign Up</b></Link></small>
         <div className=' mx-20 flex items-center justify-around h-5 font-poppins'><div className={`${mode == "light"?"bg-white":"bg-black"} h-[1px] w-20`}></div><span className={`${mode == "light"?" text-white":"text-black"}`}>or</span><div className={`${mode == "light"?"bg-white":"bg-black"} h-[1px] w-20`}></div></div>
         <button className={`${mode == "light" ? "bg-light text-black":" bg-dark text-white"} font-poppins font-bold w-[68%] rounded-full text-[12px] py-1 my-3 border-[1.5px] mx-[60px] flex items-center pl-[4.7rem]`}><AiFillGoogleSquare className='mr-1.5' size={20}/>with Google</button>
         <button className={`${mode == "light" ? "bg-light text-black":" bg-dark text-white"} font-poppins font-bold w-[68%] rounded-full text-[12px] py-1 my-3 border-[1.5px] mx-[60px] flex items-center pl-[4.7rem]`}><AiFillFacebook className='mr-1.5' size={20}/>with Facebook</button>
      </div>
    </div>
  )
}

export default Login
