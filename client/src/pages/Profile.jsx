import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PiCaretRightBold, PiCaretLeftBold } from "react-icons/pi"
import Button from '../templates/Button'
import Creator from '../templates/Creator'
import Posts from '../templates/Posts'
import Edit from '../components/Edit'
import Comments from '../components/Comments'
import { togComment, togToggleProfile } from '../redux/toggleSlice'
import PopUp from '../templates/PopUp'
import Model from '../templates/Model'
import { fetchPost, setUserPosts } from '../redux/postSlice'
import fetchAPI, { login } from '../api/fetchAPI'
import { UserProfile } from '../components/Profile'
import { fetchFollower, fetchFollowing,fetchItem,getUser } from '../redux/userSlice'



const Profile = () => {
  const [tog, setTog] = useState(false)
  const [read, setRead] = useState(false)
  const dispatch = useDispatch()
  const mode = useSelector(state => state.item.mode)
  const followers = useSelector(state => state.user.followers)
  const following = useSelector(state => state.user.following)
  const userposts = useSelector(state => state.item.userposts)
  const edit = useSelector(state => state.anime.edit)
  const comment = useSelector(state => state.anime.comment)
  const popup = useSelector(state => state.anime.popup)
  const model = useSelector(state => state.anime.model)
  const toggleProfile = useSelector(state => state.anime.toggleProfile)
  const cos = useSelector(state => state.user.user)
  //const { FirstName, LastName, Email, Age, DOB, City, State, Bio, Followers, Following } = cos

  const userPosts = async () => {
    const res = await fetchAPI(`/posts/${login}`, "GET", false)
    dispatch(setUserPosts(res))
  }
  const ri = async () => {
    const user = await fetchAPI(`/user/${login}`, "GET", false)
    //console.log(user)
    dispatch(getUser(user))
    dispatch(fetchItem())
    dispatch(fetchPost())
    dispatch(fetchFollower(login))
    dispatch(fetchFollowing(login))
    dispatch(togToggleProfile(false))
    dispatch(togComment(false))
  }
  // console.log(followers)
  useEffect(() => {
    dispatch(fetchPost())
    userPosts()
    ri()
  }, [])
  return (
    <>
      {model == true && <Model />}
      <div className={`${mode == "light" ? " bg-b-dark text-white " : " bg-b-light text-black"} w-full grid grid-cols-10 gap-4 px-2 md:px-7 lg:px-16 pt-12 md:pt-20 pb-5`}>
        <div className={`${mode == "light" ? "bg-dark" : "bg-light"} relative h-[430px] md:h-[470px] rounded-xl col-span-10 md:col-span-5 lg:col-span-4 font-poppins p-3`} >
          <UserProfile user={cos} />
        </div>
        <div className={` relative h-auto md:h-[670px] overflow-hidden overflow-y-scroll rounded-xl col-span-10 md:col-span-5 lg:hidden font-poppins p-3 md:p-0`} >
          <h1 className=' hidden text-sm md:text-xl font-bold px-3 pb-2.5'>My Posts</h1>
          {userposts.map(post => <Posts key={post._id} len={true} profile={true} posts={post} />)}
        </div>


        {toggleProfile == true ? <div className={`${mode == "light" ? "bg-dark" : "bg-light "} hidden h-[470px] md:flex col-span-6 rounded-xl px-5`}>
          {edit == true && <Edit key={23} />}
          {comment == true && <>
            <div className='w-[51%] h-[430px] ml-2 mt-5 overflow-hidden overflow-y-scroll hid'>{userposts.map(post => <Posts key={post._id} len={true} profile={true} posts={post} />)}</div>
            <div className=' w-[49%] ml-4'><Comments profile={true} /></div>
          </>}

        </div> : <>
          <div className={` h-[470px] hidden lg:block rounded-xl font-poppins col-span-3`} >
            <div className=' h-[470px] overflow-hidden overflow-y-scroll hid'>
              {
                userposts == "" ?
                  <p className=' text-center py-3 text-sm text-gray-200'>no posts yet</p>
                  : userposts.map(post => <Posts key={post._id} len={true} profile={true} posts={post} />)}
            </div>
          </div>
          <div className={`${mode == "light" ? "bg-dark" : "bg-light"} h-auto md:h-[470px] rounded-xl font-poppins col-span-10 md:col-span-5 lg:col-span-3 pb-3 md:pb-0 mb-10 md:mb-0`} >
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
        </>}


        {/*  */}
      </div>
    </>
  )
}

export default Profile
