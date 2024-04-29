import React, { useEffect, useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { togComment, togToggleProfile } from '../redux/toggleSlice'
import fetchAPI, { login } from '../api/fetchAPI'
import { fetchPost, setComment } from '../redux/postSlice'


export const Comment = ({ cmt }) => {
  console.log(cmt)
  const {comment} = cmt
  const {FirstName,LastName} = cmt.UserId
  const mode = useSelector(state => state.item.mode)
  return (<div className={`${mode == "light" ? "borderm-gray-700 text-white" : "border-gray-300 text-black"} border rounded-md p-2.5 mb-3 mt-1.5`}>
      <div className=' flex items-center justify-between'>
        <div className=' flex items-center'>
          <img src="vite.svg" alt="" className={`w-7 h-7 rounded-full border`} />
          <div className='ml-2'>
            <h2 className=' text-[10px] font-bold'>{FirstName}</h2>
            <h5 className=' text-[9px] ml-[1px] text-gray-500'>2 hour ago</h5>
          </div>
        </div>
        <BsThreeDotsVertical size={11} />
      </div>
      <p className=' text-[11.5px] pt-3 leading-4 font-poppins'>{comment}</p>
    </div>
    
  )
}

const Comments = ({ profile }) => {
  const dispatch = useDispatch()
  const [send,setSend] = useState([])
  const [coment, setComent] = useState({
    UserId: login,
    comment: ""
  })
  const mode = useSelector(state => state.item.mode)
  const commentId = useSelector(state => state.item.commentId)
  const posts = useSelector(state => state.item.posts)
  const comments = useSelector(state => state.item.comment)
 //console.log(comment)
  const sendComment = async () => {
    const res = await fetchAPI(`/posts/comment/${commentId}`, "POST", coment)
    console.log(res)
    dispatch(fetchPost())
  }
  const getComment = async()=>{
    let data = await fetchAPI(`/posts/comment/${commentId}`, "GET",false)
   dispatch(setComment(data))
  }
  useEffect(()=>{
   getComment()
  },[commentId])
  
  return (
    <div className={`${mode == "light" ? "border-gray-700 text-white" : "border-gray-300 text-black"} font-poppins px-5 rounded-xl w-full h-[428px]`}>
      <h1 className=' py-3 font-bold flex items-center '><BsFillArrowLeftSquareFill size={20} onClick={() => {
        dispatch(togComment(false))
        dispatch(togToggleProfile(false))
      }} className=' mr-3' /> Comments</h1>
      {profile == false && <div className=' flex items-center justify-between'>
        <input type="text" onChange={e => setComent({ ...coment, comment: e.target.value })} className={`${mode == "light" ? "bg-dark" : "bg-light border-gray-300 placeholder:text-gray-400"} outline-none py-1.5 text-[12px] px-2 rounded-md my-1 border w-[88%] `} placeholder='Comment' />
        <button onClick={sendComment}><AiOutlineSend size={20} /></button>
      </div>}
      <div className=' h-[340px] overflow-hidden overflow-y-scroll hid'>
        {comments != '' ? comments.map((comment)=><Comment  cmt={comment} />): <p className=' text-center text-[11px] py-2'>no comments</p>}
      </div>
    </div>
  )
}

export default Comments
