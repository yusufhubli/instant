import React, { useState } from 'react'
import { AiOutlineInstagram, AiOutlineSearch } from 'react-icons/ai'
import { HiMiniXMark } from "react-icons/hi2";
import { MdSunny } from "react-icons/md";
import { setMode } from '../redux/postSlice';
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/fetchAPI';
import { setClear } from '../redux/userSlice';

const Navbar = () => {
    const [tog, setTog] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const mode = useSelector(state => state.item.mode)
    return (
        <div className={`${mode == "light" ? "bg-dark text-white" : "bg-white text-black"} w-full h-11 md:h-16 flex items-center justify-between md:px-5 lg:px-10 fixed z-20`}>
            <div className=' md:hidden flex items-center justify-between w-full px-3'>
                {!tog ? <><div className='flex items-center'>
                    <AiOutlineInstagram size={20} />
                    <h2 className={`font-medium font-poppins ml-1 text-[15px]`}>Instant</h2>
                </div>
                <button onClick={()=>setTog(true)} className={`ml-1.5 ${mode == "light" ? " text-white" : "text-gray-700"}`}><AiOutlineSearch size={18} /></button>
                </>:
                    <div className=' w-full flex items-center '>
                        <input type="search" placeholder='Search...' className={` px-3 py-[3px] border-[1.5px] w-64 text-xs outline-none rounded-full ${mode == "light" ? "border-gray-700 bg-b-dark text-white" : "border-gray-300 bg-b-light text-black"}`} />
                        <button className={`ml-2 ${mode == "light" ? " text-white" : "text-gray-700"}`}><AiOutlineSearch size={18} /></button>
                        <button onClick={()=>setTog(false)} className={` ${mode == "light" ? " text-white" : "text-gray-700"}`}><HiMiniXMark size={23} /></button>
                    </div>}
            </div>
            <div className='md:flex hidden'>
                <AiOutlineInstagram size={30} />
                <h2 className={`font-medium font-poppins text-2xl`}>Instant</h2>
            </div>
            <div className=' lg:w-[50%] md:w-[42%] items-center sm:hidden md:flex lg:flex'>
                <input type="text" placeholder='Search...' className={` pl-5 pr-20 py-[7px] border-[1.5px] w-full text-xs outline-none rounded-full ${mode == "light" ? "border-gray-700 bg-b-dark text-white" : "border-gray-300 bg-b-light text-black"}`} />
                <button className={`-ml-[60px] ${mode == "light" ? " text-white" : "text-gray-700"}`}><HiMiniXMark size={23} /></button>
                <button className={`ml-1.5 ${mode == "light" ? " text-white" : "text-gray-700"}`}><AiOutlineSearch size={18} /></button>
            </div>
            <div className=' flex items-center font-poppins sm:hidden md:flex lg:flex md:text-[13px] lg:text-sm'>
                {login == '' ? 
                <div className="flex">
                    <Link to={'/'} className=' cursor-pointer '>Home</Link>
                    <Link to={'/profile'} className=' cursor-pointer ml-8 '>Profile</Link>
                    <Link to={'/signup'} className=' cursor-pointer ml-8 '>Sign Up</Link>
                    <Link to={'/signin'} className=' cursor-pointer ml-8'>Sign In</Link>
                </div> :
                <div className="flex">
                    <Link to={'/'} className=' cursor-pointer '>Home</Link>
                    <Link to={'/profile'} className=' cursor-pointer ml-8 '>Profile</Link>
                    <Link to={'/signin'} className=' cursor-pointer ml-8 '>Sign In</Link>
                    <h2 className=' cursor-pointer ml-8' onClick={()=>{
                        localStorage.clear()
                        dispatch(setClear())
                        navigate('/signin')
                    }}>Log Out</h2>
                 </div>}

                <h2 className=' cursor-pointer ml-6' onClick={() => dispatch(setMode())}><MdSunny size={24}/></h2>
            </div>
        </div>
    )
}

export default Navbar
