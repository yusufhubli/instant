import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineComment, AiOutlineClose } from 'react-icons/ai'
import { BsThreeDotsVertical, BsHandThumbsDown, BsHandThumbsUp, BsHandThumbsDownFill } from 'react-icons/bs'
import { togComment, togEdit, togModel, togPopup, togToggleProfile } from '../redux/toggleSlice'
import fetchAPI from '../api/fetchAPI.js'
import { login } from '../api/fetchAPI'
import { fetchPost, setCommentId } from '../redux/postSlice.js'
import { Link } from 'react-router-dom'
import PopUp from './PopUp.jsx'
import Loading from './Loading.jsx'

const Posts = ({ len, profile, posts }) => {
    const dispatch = useDispatch()
    const [tog, setTog] = useState(false)
    const [read, setRead] = useState(false)
    const [val, setLi] = useState({ UserId: login })
    const mode = useSelector(state => state.item.mode)
    const popup = useSelector(state => state.anime.popup)
    const user = useSelector(state => state.user.user)
    const status = useSelector(state => state.user.status)
    const { _id, Description, Image, Likes, DisLikes, Comments } = posts
    const { FirstName, LastName, UserName,Avatar } = posts.UserId
    //console.log(Description.length)
    const follow = posts.UserId.Followers.map(x => {
        if (x.UserId == user._id) {
            return true
        } else {
            return false
        }
    })
  //  console.log(follow[0])
    const setLike = async (id) => {
        console.log('object')
        const like = await fetchAPI(`/posts/likes/${id}`, "POST", val)
        console.log(like)
        dispatch(fetchPost())
    }

    const setDislike = async (id) => {
        const unlike = await fetchAPI(`/posts/dislikes/${id}`, "POST", val)
        console.log(unlike)
        dispatch(fetchPost())

    }

    const setFollow = async (fid) => {
        const fol = await fetchAPI(`/user/follow/${fid}`, "POST", val)
        console.log(fol)
        dispatch(fetchPost())
    }

    const setUnFollow = async (fid) => {
        const fol = await fetchAPI(`/user/unfollow/${fid}`, "POST", val)
        console.log(fol)
        dispatch(fetchPost())
    }

    const handleDelete = async (id) => {
        //    const res = await fetchAPI(`/posts/${id}`,"DELETE",false)
        //    alert(res.message)
    }
    if(status == "loading"){
        return(
            <div className=' h-[465px] w-full bg-black flex justify-center items-center rounded-xl mb-1 lg:mb-2'>
            <Loading/>
            </div>
        )
    }

    return (
        <>
      {popup && <PopUp text={"do you want to delete"} val={"Delete"}/>}
        <div className={` relative ${mode == "light" ? " bg-dark" : "bg-light"} px-8 pt-3 snap-start rounded-xl mb-1 lg:mb-2`}>
            <div className={`flex items-center justify-between py-1`}>
                <div className={`flex items-center`}>
                    <img src={Avatar} className={`w-10 h-10 rounded-full border`} alt="" />
                    <div className='ml-2 font-poppins'>
                        <h2 className=' text-xs font-bold capitalize flex items-center'>{FirstName} {LastName} <p className={`${mode == "light" ? "bg-light text-black": " bg-dark text-white"} ml-2  py-[1.5px] px-1.5 tracking-wider  rounded-sm font-poppins text-[8.5px]`}>Private</p></h2>
                        <h4 className=' text-[11px] font-mediums text-blue-700'>@{UserName}
                            <span className=' text-[10px] ml-2 text-gray-500'>20 min ago</span>
                        </h4>
                    </div>
                    <div className={`${mode == "light" ? " bg-dark text-white border-gray-700" : "bg-light text-black border-gray-200"} ${tog == false ? "hidden" : "block"} absolute right-2 text-sm font-[13px] font-poppins top-14 w-28 h-16 py-1.5 rounded-xl border-[1.5px]`}>
                        {profile == true ? <>
                            <h2 className={`${mode == "light" ? " hover:bg-b-dark" : " hover:bg-b-light"} text-[13px] px-4 py-0.5 cursor-pointer`} onClick={() => dispatch(togModel(true))}>Edit</h2>
                            <h2 className={`${mode == "light" ? " hover:bg-b-dark" : " hover:bg-b-light"} text-[13px] px-4 py-0.5 cursor-pointer`}
                                onClick={() =>dispatch(togPopup(true))}>Delete</h2>
                        </> : <>
                            <h2 className={`${mode == "light" ? " hover:bg-b-dark" : " hover:bg-b-light"} text-sm px-4 py-1 cursor-pointer`}><Link to={`/profile/${posts.UserId._id}`}>Profile</Link></h2>
                            {follow[0] != true ? <h2 onClick={() => setFollow(posts.UserId._id)} className={`${mode == "light" ? " hover:bg-b-dark" : " hover:bg-b-light"} px-4 py-1 cursor-pointer`}>Follow</h2>
                                : <h2 onClick={() => setUnFollow(posts.UserId._id)} className={`${mode == "light" ? " hover:bg-b-dark" : " hover:bg-b-light"} px-4 py-1 cursor-pointer`}>Unfollow</h2>}
                        </>}

                    </div>
                </div>
                {tog == false ? <BsThreeDotsVertical size={18} onClick={() => setTog(true)} className=' cursor-pointer' /> : <AiOutlineClose size={18} onClick={() => setTog(false)} className=' cursor-pointer' />}
            </div>
            <p className=' first-letter:capitalize text-[12px] py-1.5'>{ Description.length > 70 && !read ? `${Description.substring(0, 100)}... `: Description+" "}
                <button className={`${Description.length < 50 ? "hidden":""} text-[10px] capitalize text-blue-300 font-medium`} onClick={() => setRead(!read)}>{read  ? 'show less' : 'show more'}</button></p>
            <img src={Image} className={`${len == true ? "h-[260px]" : "h-[305px]"} w-full mt-2 bg-b-dark`} alt=" image" />
            <div className={`flex items-center justify-between px-3 py-2.5 font-poppins`}>
                <div className='flex font-poppins text-[14px]'>
                    <div className='flex items-center cursor-pointer'>
                        <span className='mr-1.5'>{Likes.length}</span>
                        <BsHandThumbsUp onClick={() => setLike(_id)} />
                    </div>
                    <div className='flex items-center ml-5 cursor-pointer'>
                        <span className='mr-1.5'>{DisLikes.length}</span>
                        <BsHandThumbsDown onClick={() => setDislike(_id)} />
                    </div>
                </div>
                <div onClick={() => {
                    dispatch(togComment(true))
                    dispatch(setCommentId(_id))
                    dispatch(togEdit(false))
                    dispatch(togToggleProfile(true))
                }} className='flex items-center cursor-pointer'>
                    <span className='mr-1.5'>{Comments.length}</span>
                    <AiOutlineComment />
                </div>
            </div>
        </div>
        </>
    )
}

export default Posts
