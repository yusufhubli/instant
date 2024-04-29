import React, { useEffect, useState } from 'react'
import Button from '../templates/Button'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import fetchAPI, { getDate } from '../api/fetchAPI'
import {fetchItem, getUser} from '../redux/userSlice'
import { login } from '../api/fetchAPI'
import { togToggleProfile,togEdit,togComment } from '../redux/toggleSlice'

const Profile = ({ tog }) => {
  //console.log(tog)
  const dispatch = useDispatch()
  const [profileMode,setProfileMode] = useState({})
  const mode = useSelector(state => state.item.mode)
 
  const handle = async()=>{
    const pro = await fetchAPI(`/user/profile/${login}`,"PUT",false)
    setProfileMode(pro)
  }
//   const ri = async()=>{
//   const user = await fetchAPI(`/user/${login}`,"GET",false)
//   console.log(user)
//   dispatch(getUser(user))
//   dispatch(fetchItem())
//   }
//  useEffect(()=>{
//    ri()
//  },[])
 const user = useSelector(state => state.user.user)
 const userposts = useSelector(state => state.item.userposts)
 const {FirstName,LastName,UserName,Avatar,Followers,Following} = user
  return (
    <div>
      {tog == false ? <div className={`px-4 pb-2 rounded-xl my-4 ${mode == "light" ? "bg-dark" : "bg-light"}`}>
        <h1 className='px-3 py-3 font-poppins font-bold text-lg'>Your Profile</h1>
        <div className=' font-poppins text-center'>
          <img src={Avatar} alt="" className='mx-auto w-[80px] h-[80px] border rounded-full' />
          <h2 className=' font-bold mt-3 capitalize'>{ FirstName} {LastName}</h2>
          <h4 className=' text-blue-700 text-sm'>@{UserName}</h4>
        </div>
        <div className="flex items-center justify-around px-6 py-2">
          <div className=' text-center font-poppins text-[13px] flex items-center'>
            <p>{Following}</p>
            <p className='ml-1.5'>Following</p>
          </div>
          <div className=' text-center font-poppins text-[13px] flex items-center'>
            <p>{Followers}</p>
            <p className='ml-1.5'>Followers</p>
          </div>
          <div className=' text-center font-poppins text-[13px] flex items-center'>
            <p>{userposts.length}</p>
            <p className='ml-1.5'>Posts</p>
          </div>
        </div>
        <div className=' flex justify-around items-center py-2 px-6'>
        <Button onClick={handle} value={ `${profileMode.profile?"Public":"Private" }`+" Profile"} widt={"5"} />
          <Button onClick={() => {
              dispatch(togToggleProfile(true))
              dispatch(togEdit(true))
              dispatch(togComment(false))
            }} value={"Edit Profile"} widt={"5"} />
        </div>
        <button className={`${mode == "light" ? "bg-light text-black" : "bg-dark text-white"} w-[77%] text-center mx-9 font-bold rounded-full py-1.5 my-2 font-poppins text-xs`}><Link to={'/profile'}>View Profile</Link></button>
      </div> :
        <div className={`px-4 pb-2 rounded-xl my-4 ${mode == "light" ? "bg-dark" : "bg-light"}`}>
          <h1 className='px-4 py-3 font-poppins font-bold text-lg'>Your Profile</h1>
          <div className=' font-poppins text-center flex items-center h-14 mx-10'>
            <img src={Avatar} alt="" className=' w-[60px] h-[60px] border rounded-full' />
            <div className='ml-7 -mt-2'>
              <h2 className=' font-bold text-sm mt-3 capitalize'>{ FirstName} {LastName}</h2>
              <h4 className=' text-blue-700 text-xs'>@iamyusuf</h4>
            </div>
          </div>
          <div className="flex items-center justify-around px-6 py-3">
            <div className=' text-center font-poppins text-[11px] flex items-center'>
              <p>{Following}</p>
              <p className='ml-1.5'>Following</p>
            </div>
            <div className=' text-center font-poppins text-[11px] flex items-center'>
              <p>{Followers}</p>
              <p className='ml-1.5'>Followers</p>
            </div>
            <div className=' text-center font-poppins text-[11px] flex items-center'>
            <p>{userposts.length}</p>
              <p className='ml-1.5'>Posts</p>
            </div>
          </div>
          <div className=' flex justify-around items-center py-1 px-6'>
          <Button onClick={handle} value={ `${profileMode.profile ?"Public":"Private" }`+" Profile"} widt={"5"} />
            <Button onClick={() => {
              dispatch(togToggleProfile(true))
              dispatch(togEdit(true))
              dispatch(togComment(false))
            }} value={"Edit Profile"} widt={"5"} />
          </div>
          <button className={`${mode == "light" ? "bg-light text-black" : "bg-dark text-white"} w-[77%] text-center mx-9 rounded-full py-1.5 my-2 font-poppins text-xs`}><Link to={'/profile'}>View Profile</Link></button>
        </div>}
    </div>
  )
}

export const UserProfile = ({user})=>{
  const mode = useSelector(state=>state.item.mode)
 const userposts = useSelector(state => state.item.userposts)
  const dispatch = useDispatch()
  const {FirstName,LastName,UserName,Avatar,DOB,Bio,Email,State,City,Age,Followers,Following} =user
  const date = getDate(DOB)
  
  const [profileMode,setProfileMode] = useState({})
  const [read,setRead] = useState(true)
  const handle = async()=>{
    const pro = await fetchAPI(`/user/profile/${login}`,"PUT",false)
    setProfileMode(pro)
  }
  return(
    <div>
       <div className=' flex items-center justify-between font-poppins px-5 py-1'>
          <h1 className='font-bold text-sm md:text-lg '>Profile</h1>
        </div>
        <div className=' font-poppins text-center'>
          <img src={`${Avatar}`} alt="" className='mx-auto w-14 h-14 md:w-[80px] md:h-[80px] border rounded-full' />
          <h2 className=' font-bold text-xs md:text-[14px] mt-3 capitalize'>{FirstName} {LastName}</h2>
          <h4 className=' text-blue-700 text-xs md:text-sm font-bold'>@{UserName}</h4>
        </div>
        <div className="flex items-center justify-around text-[11px] md:text-[14px] font-poppins px-6 py-2 md:py-3">
          <div className=' text-center flex items-center cursor-pointer'>
            <p>{Following}</p>
            <p className='ml-1.5'>Following</p>
          </div>
          <div className=' text-center flex items-center cursor-pointer'>
            <p>{Followers}</p>
            <p className='ml-1.5'>Followers</p>
          </div>
          <div className=' text-center flex items-center cursor-pointer'>
            <p>{userposts.length}</p>
            <p  className='ml-1.5'>Posts</p>
          </div>
        </div>
        <div className=' h-16 overflow-hidden overflow-y-scroll hid mx-4 md:mx-7 mb-2'>
            <p className={`${mode == "light" ? "text-gray-300" : "text-gray-700"} text-[11px] md:text-[12px] leading-4 `}>{Bio}</p>
          </div>
          {read && <ul className=' mx-4 md:mx-7 text-[11px] md:text-[13px] font-medium'>
            <li className=' py-0.5 flex items-center justify-between'><h4 className=' w-11'>Email</h4><h4>{Email}</h4></li>
            <li className=' py-0.5 flex items-center justify-between'><h4 className=' w-11'>Dob</h4><h4>{date}</h4></li>
            <li className=' py-0.5 flex items-center justify-between'><h4 className=' w-11'>Age</h4><h4>{Age}</h4></li>
            <li className=' py-0.5 flex items-center justify-between'><h4 className=' w-11'>City</h4><h4>{City}</h4></li>
            <li className=' py-0.5 flex items-center justify-between'><h4 className=' w-11'>State</h4><h4>{State}</h4></li>
          </ul>}
        <div className=' flex justify-around items-center py-4 px-6'>
            <Button onClick={handle} value={ `${profileMode.profile ?"Public":"Private" }`+" Profile"} widt={"10"} />
            <Button onClick={() => {
              dispatch(togToggleProfile(true))
              dispatch(togEdit(true))
              dispatch(togComment(false))
            }} value={"Edit Profile"} widt={"10"} />
          </div>
    </div>
  )
}

export default Profile
