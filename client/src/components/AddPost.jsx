import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineFileImage, AiOutlineSend } from 'react-icons/ai'
import { togProfile } from '../redux/toggleSlice'
import fetchAPI, { login } from '../api/fetchAPI'
import { fetchPost } from '../redux/postSlice'

const AddPost = () => {
  const [add, setAdd] = useState(false)
  const [tog, setTog] = useState(false)
  const [des ,setDes] = useState({
    UserId:login,
    Description:"",
    file:""
  })
  const dispatch = useDispatch()
  const mode = useSelector(state => state.item.mode)
  
  const handleSubmit = async()=>{
    console.log(des)
    const formdata = new FormData()
    formdata.append("UserId",des.UserId)
    formdata.append("Description",des.Description)
    formdata.append("file",des.file)
    const res = await fetch("http://localhost:5000/posts",{
    method:"POST",
      body:formdata
    })
    console.log(res.json())
   alert(res.message)  
   // dispatch(fetchPost())
  }

  return (
    <div className={`${mode == "light" ? "bg-dark" : "bg-light"} py-2 px-4 border-gray-800 rounded-xl`}>
      <div className={`flex items-center justify-between text-lg h-8 font-bold font-poppins px-4`}>
        <h1>Add Post</h1>
        {add == false ? <AiOutlinePlus onClick={() =>{
          setAdd(true)
          setTog(true)
          dispatch(togProfile(true))
        }} size={22} /> : <AiOutlineMinus onClick={() =>{
          setAdd(false)
          setTog(false)
          dispatch(togProfile(false))

        }} size={22} />}
      </div>
      <div className={`${tog == false ? "hidden":"block "}`}>
        <div className={`${mode =="light"?" border-gray-200":"border-gray-400"} flex items-center justify-center border-[1.5px] w- h-24 mx-4 mt-2 mb-3 rounded-xl`}>
          <label htmlFor="image" className={`${mode =="light"?" text-gray-200":"text-gray-400"}`}><AiOutlineFileImage size={50} /></label>
          <input type="file" id='image' name='avatar'  onChange={e=>setDes({...des,file:e.target.files[0]})} className=' hidden' />
        </div>
        <div className={`${mode == "light" ? "bg-dark border-gray-200" : "bg-light border-gray-400"} mx-4 my-3 flex items-center rounded-xl border-[1.5px]`}>
          <input onChange={e=>setDes({...des,Description:e.target.value})} type="text" className={`${mode == "light" ? "bg-dark border-gray-200" : "bg-light border-gray-400"} px-3 py-2 text-sm rounded-xl w-[88%] placeholder:text-sm font-poppins outline-none`} placeholder='Description' />
          <button onClick={handleSubmit} className={` flex justify-center w-[12%] `}><AiOutlineSend size={21} /></button>
        </div>
      </div>

    </div>
  )
}

export default AddPost
