import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiFillGoogleSquare, AiFillFacebook,AiFillEye,AiOutlineEye } from 'react-icons/ai'
import fetchAPI from '../api/fetchAPI'
import { useCookies } from 'react-cookie'
import { redirect, useNavigate } from 'react-router-dom'

const Register = () => {
  const login = JSON.parse(localStorage.getItem("loggedUser")) || []
  const navigate = useNavigate()
  const mode = useSelector(state => state.item.mode)
  const [cookie, setCookie] = useCookies(['user'])
  const [hide ,setHide] = useState(true)
  const [reg, setReg] = useState({
    UserName: "",
    Email: "",
    Password: "",
  })

  const [userError,setUser] = useState("")
  const [emailError,setEmail] = useState("")
  const [passError,setPass] = useState("")
   

  const auth = (reg) => {
    const { UserName, Email, Password } = reg
    let n = Email.length
    //console.log(Email.charAt(n - 10))
    //username
    if (UserName === "") {
      console.log('object')
      setError({UserNameError: 'field cannot empty' })
    } else if (/[~`!@#$%^&*()_+|\\<>,.?/{[\]=}]/.test(UserName) === true) {
      setError({ UserNameError: "username should contain special charecters" })
    } else {
      setError({ UserNameError: '' })
    }
    //Email
    if (Email === "") {
      setError({ EmailError: 'field cannot empty' })
    } else if (Email.length <= 10 == true || Email.charAt(n - 4) != '.' || Email.charAt(n - 10) != '@') {
      setError({ EmailError: "not a valid email" })
    } else {
      setError({ EmailError: '' })
    }

    if (Password === "") {
      setError({PasswordError: 'passsword cannot empty' })
    } else if (/[0-9]/.test(Password) === false) {
      setError({PasswordError: "Password should contain number" })

    } else if (/[a-z]/.test(Password) === false) {
      setError({PasswordError: "Password should contain lowercase letter" })

    } else if (/[A-Z]/.test(Password) === false) {
      setError({PasswordError: "Password should contain uppercase letter" })
    }
    else if (/[~`!@#$%^&*()_+|\\<>,.?/{[\]=}]/.test(Password) === false) {
      setError({PasswordError: "the Password contain special symbol" })

    } else if (Password.length >= 6 != true || Password.length <= 8 != true) {
      setError({PasswordError: 'Password length should be 6 to 8' })
    }
    else {
      setError({PasswordError: '' })
    }
  }


  const handleSubmit =async() => {
    if(userError=='' && emailError =='' && passError == ''){
      alert("hello")
      const res = await fetchAPI('/auth/register', "POST", reg)
      if (res.message) {
        localStorage.setItem("loggedUser", JSON.stringify(res))
        navigate('/')
      } else {
        navigate('/signin')
      }
    }else{
      alert('you have entered wrong input')
    }

  }

  useEffect(() => {
    login != '' &&  navigate('/') 
    const { UserName, Email, Password } = reg
    let n = Email.length
    //console.log(Email.charAt(n - 10))
    //username
    if (UserName === "") {
      setUser('field cannot empty')
    } else if (/[~`!@#$%^&*()_+|\\<>,.?/{[\]=}]/.test(UserName) === true) {
      setUser( "username should contain special charecters")
    } else if(UserName.length< 4){
    setUser("Username shouldn't less than 4 character")
    } else {
      setUser( '')
    }
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
  }, [reg])

  return (
    <div className=' pt-20 w-full h-[100vh]'>
      <div className={`${mode == "light" ? "bg-dark" : "bg-light"} w-[380px] mb-8 pb-6 mx-aut text-center rounded-xl h-auto`}>
        <h1 className=' font-bold text-lg py-5'>Sign Up</h1>
        <input onChange={e => setReg({ ...reg, UserName: e.target.value })} type="text" className={` ${mode == "light" ? "bg-dark border-gray-100 placeholder:text-white" : "bg-light placeholder:text-black border-gray-700"} font-poppins text-[12px] w-[68%] border-[1.5px] py-1.5 px-4 my-2.5 outline-none rounded-full`} placeholder='Name' />
        <h6 className={` text-[10.5px] -mt-1.5 ml-[4.5rem] text-red-600 text-left`}>{userError}</h6>
        <input onChange={e => setReg({ ...reg, Email: e.target.value })} type="Email" className={` ${mode == "light" ? "bg-dark border-gray-100 placeholder:text-white" : "bg-light placeholder:text-black border-gray-700"} font-poppins text-[12px] w-[68%] border-[1.5px] py-1.5 px-4 my-2.5 outline-none rounded-full`} placeholder='Email' />
        <h6 className={` text-[10.5px] -mt-1.5 ml-[4.5rem] text-red-600 text-left`}>{emailError}</h6>
        <div className=' flex items-center'>
        <input type={hide ? "password" :"text"} onChange={e=>setReg({...reg,Password:e.target.value})} 
         className={` ${mode == "light"?"bg-dark border-gray-100 placeholder:text-white":"bg-light placeholder:text-black border-gray-700"} font-poppins text-[12px] w-[68%] ml-[3.8rem] border-[1.5px] py-[7px] px-4 my-2 outline-none rounded-full`} placeholder='Password' />
         { hide ?<AiOutlineEye onClick={()=>setHide(false)} size={17} className='-ml-[2rem] cursor-pointer'/>:<AiFillEye onClick={()=>setHide(true)} size={17} className='-ml-[2rem] cursor-pointer'/>}
         </div>
        <h6 className={` text-[10.5px] -mt-1.5 ml-[4.5rem] text-red-600 text-left`}>{passError}</h6>
        <button onClick={handleSubmit} className={`${mode == "light" ? "bg-light text-black" : " bg-dark text-white"} font-bold w-[68%] rounded-full text-[12px] py-[6px] mt-3 -mb-0.5 mx-14 border-[1.5px] font-poppins `}>Sign Up</button>
        <small className=' text-[11px] font-poppins'>already have an account <b>Sign In</b></small>
        <div className=' mx-20 flex items-center justify-around h-5 font-poppins'><div className={`${mode == "light" ? "bg-white" : "bg-black"} h-[1px] w-20`}></div><span className={`${mode == "light" ? " text-white" : "text-black"}`}>or</span><div className={`${mode == "light" ? "bg-white" : "bg-black"} h-[1px] w-20`}></div></div>
        <button className={`${mode == "light" ? "bg-light text-black" : " bg-dark text-white"} font-poppins font-bold w-[68%] rounded-full text-[12px] py-[5px] my-2.5 border-[1.5px] mx-[60px] flex items-center pl-[4.7rem]`}><AiFillGoogleSquare className='mr-1.5 ' size={20} /><p className='mt-0.5'>with Google</p></button>
        <button className={`${mode == "light" ? "bg-light text-black" : " bg-dark text-white"} font-poppins font-bold w-[68%] rounded-full text-[12px] py-[5px] my-2.5 border-[1.5px] mx-[60px] flex items-center pl-[4.7rem]`}><AiFillFacebook className='mr-1.5' size={20} /><p className=' mt-0.5'>with Facebook</p></button>
      </div>
    </div>
  )
}

export default Register
