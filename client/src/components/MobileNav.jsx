import React from 'react'
import {AiOutlineHome,AiOutlineProfile,AiOutlineSetting,AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { setMode } from '../redux/postSlice'
import { useDispatch } from 'react-redux'

const MobileNav = () => {
  const dispatch = useDispatch()
  return (
    <div className=' md:hidden fixed bottom-0 z-20 w-full h-12 flex items-center justify-around bg-black font-poppins text-[10px]'>
      <div><AiOutlineHome size={16} className=' mx-auto'/><Link to={'/'}>Home</Link></div>
      <div><AiOutlineProfile size={16} className=' mx-auto'/><Link to={'/profile'}>Profile</Link></div>
      <div><AiOutlinePlus size={30}/></div>
      <div onClick={()=>dispatch(setMode())}><AiOutlineSetting size={16} className=' mx-auto'/><Link>Setting</Link></div>
      <div><AiOutlineSetting size={16} className=' mx-auto'/><Link>Setting</Link></div>
    </div>
  )
}

export default MobileNav
