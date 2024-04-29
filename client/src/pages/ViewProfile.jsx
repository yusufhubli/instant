import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchAPI from '../api/fetchAPI'
import { useDispatch, useSelector } from 'react-redux'
import Posts from '../templates/Posts'
import PopUp from '../templates/PopUp'
import Creator from '../templates/Creator'
import { UserProfile } from '../components/Profile'
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi"
import { fetchFollower, fetchFollowing } from '../redux/userSlice'


const ViewProfile = () => {
  const { id } = useParams()
  const mode = useSelector(state=>state.item.mode)
  const followers = useSelector(state => state.user.followers)
  const following = useSelector(state => state.user.following)
  const [user, setUser] = useState([])
  const [post, setPost] = useState([])
  const [tog, setTog] = useState(false)
  const dispatch = useDispatch()

  const getData = async () => {
    const users = await fetchAPI(`/user/${id}`, "GET", false)
    setUser(users)
    console.log(users)
    const posts = await fetchAPI(`/posts/${id}`, "GET", false)
    setPost(posts)
    console.log(posts)
    dispatch(fetchFollower(id))
    dispatch(fetchFollowing(id))
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <PopUp text={'hello'} val={'Ok'} />
      <div className={`${mode == "light" ? " bg-b-dark text-white " : " bg-b-light text-black"} w-full grid grid-cols-10 gap-4 px-16 pt-20 pb-5`}>
        <div className={`${mode == "light" ? "bg-dark" : "bg-light"} relative h-[470px] rounded-xl col-span-4 font-poppins p-3`} >
         <UserProfile user={user}/>
        </div>
        <div className={` h-[470px] rounded-xl font-poppins col-span-3`} >
          <div className=' h-[470px] overflow-hidden overflow-y-scroll hid'>
              {post.map(post => <Posts key={post._id} len={true} posts={post} />)}
          </div>
        </div>
        <div className={`${mode == "light" ? "bg-dark" : "bg-light"} h-[470px] rounded-xl font-poppins col-span-3`} >
        <div className=' flex items-center justify-between px-5 py-3'>
              <h1 className='font-bold text-lg'>{tog == false ? "Followers" : "Following"}</h1>
              <div className=' flex items-center gap-1'>
                <PiCaretLeftBold onClick={() => setTog(false)} />
                <PiCaretRightBold onClick={() => setTog(true)} />
              </div>
            </div>
            <div className='px-4'>
              {tog == false ?
                followers != '' ? followers.map(follow => <Creator key={follow.UserId._id} follow={"Unfollow"} data={follow.UserId} />) : <p className=' text-center py-3 text-sm text-gray-200'>no followers</p>
                : following != '' ? following.map(follow => <Creator key={follow.UserId._id} follow={"Unfollow"} data={follow.UserId} />) : <p className=' text-center py-3 text-sm text-gray-200'>no followings</p>
              }


            </div>
        </div>

      </div>
    </>
  )
}

export default ViewProfile
