import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { togEdit, togToggleProfile } from '../redux/toggleSlice'
import fetchAPI, { imageAPI, login } from '../api/fetchAPI'


const Edit = () => {
  const dispatch = useDispatch()
  const edit = useSelector(state => state.anime.edit)
  const mode = useSelector(state => state.item.mode)
  const [type,setType] = useState("text")
  const [edituser,setEdit] = useState({
    file:"",
    FirstName:"",
    LastName:"",
    Age:"",
    DOB:"",
    Bio:"",
    City:"",
    State:""
  })

console.log(edituser)
  

  const handleSubmit = async()=>{
    const formdata = new FormData()
    formdata.append("file",edituser.file)
    formdata.append("FirstName",edituser.FirstName)
    formdata.append("LastName",edituser.LastName)
    formdata.append("Age",edituser.Age)
    formdata.append("Bio",edituser.Bio)
    formdata.append("DOB",edituser.DOB)
    formdata.append("City",edituser.City)
    formdata.append("State",edituser.State)
    const res = await fetch(`http://localhost:5000/user/update/${login}`,{
      method:"PUT",
      body:formdata
    })
    console.log( await res.json())
  }
  return (
    <div className={`${mode == "light" ? "bg-dark border-gray-200" : "bg-light border-gray-700"} w-full`}>
      <h1 className='px-3 py-3 font-bold text-lg font-poppins flex items-center'>
        <BsFillArrowLeftSquareFill className='mr-3' onClick={()=>{
          dispatch(togEdit(false))
          dispatch(togToggleProfile(false))}} size={20}/> Edit Profile</h1>
        <div className=' w-[80%] mx-auto text-xs h-[415px] overflow-hidden overflow-y-scroll pb-6 hid'>
            <label htmlFor="file">
              <AiOutlineUser className={`${mode == "light" ?"bg-dark":"bg-light border-gray-800 placeholder:text-black"} w-24 h-24 p-3 rounded-full mx-auto mb-3 border-[1.5px]`}/>
            </label>  
          <input type="file" onChange={e=>{setEdit({...edituser,file:e.target.files[0]}) 
          e.target.files}} id='file' className=' hidden' />
          <div className=' flex items-center justify-between py-2'>
            <input onChange={e=>setEdit({...edituser,FirstName:e.target.value})} className={`${mode == "light" ?"bg-dark":"bg-light border-gray-800 placeholder:text-black"} outline-none py-1.5 px-3.5 rounded-full border-[1.5px] w-[48%] `} placeholder='First Name' type="text" />
            <input onChange={e=>setEdit({...edituser,LastName:e.target.value})} className={`${mode == "light" ?"bg-dark":"bg-light border-gray-800 placeholder:text-black"} outline-none py-1.5 px-3.5 rounded-full border-[1.5px] w-[48%] `} placeholder='Last Name' type="text" />
          </div>
          {/* <input className={`${mode == "light" ?"bg-dark":"bg-light border-gray-800 placeholder:text-black"} outline-none py-1.5 px-3.5 rounded-full my-2 border-[1.5px] w-[100%] `} placeholder='Username' type="text" />
          <input className={`${mode == "light" ?"bg-dark":"bg-light border-gray-800 placeholder:text-black"} outline-none py-1.5 px-3.5 rounded-full my-2 border-[1.5px] w-[100%] `} placeholder='Email' type="text" /> */}
          <textarea onChange={e=>setEdit({...edituser,Bio:e.target.value})} className={`${mode == "light" ?"bg-dark":"bg-light border-gray-800 placeholder:text-black"} rounded-xl outline-none px-3.5 py-1.5 my-2 border-[1.5px] w-[100%]`} placeholder='Bio' rows="5"></textarea>
          <div className=' flex items-center justify-between py-2'>
            <input onChange={e=>setEdit({...edituser,DOB:e.target.value})} className={`${mode == "light" ?"bg-dark ":"bg-light border-gray-800 placeholder:text-black"} outline-none py-1.5 px-3.5 rounded-full border-[1.5px] w-[48%] `} onClick={()=>setType('date')} placeholder='DOB' type={type} />
            <input onChange={e=>setEdit({...edituser,Age:e.target.value})} className={`${mode == "light" ?"bg-dark":"bg-light border-gray-800 placeholder:text-black"} outline-none py-1.5 px-3.5 rounded-full border-[1.5px] w-[48%] `} placeholder='Age' type="text" />
          </div> <div className=' flex items-center justify-between py-2'>
            <input onChange={e=>setEdit({...edituser,City:e.target.value})} className={`${mode == "light" ?"bg-dark":"bg-light border-gray-800 placeholder:text-black"} outline-none py-1.5 px-3.5 rounded-full border-[1.5px] w-[48%] `} placeholder='City' type="text" />
            <input onChange={e=>setEdit({...edituser,State:e.target.value})} className={`${mode == "light" ?"bg-dark":"bg-light border-gray-800 placeholder:text-black"} outline-none py-1.5 px-3.5 rounded-full border-[1.5px] w-[48%] `} placeholder='State' type="text" />
          </div>
          <button onClick={handleSubmit} className={`${mode == "light" ?"bg-light text-black":"bg-dark text-white"} py-1.5 font-bold text-sm rounded-full w-[100%] my-3 text-center`}>Edit</button>
        </div>
        </div>
  )
}

export default Edit
