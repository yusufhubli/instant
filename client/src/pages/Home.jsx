import React, { useEffect } from 'react'
import Button from '../templates/Button'
import { useSelector, useDispatch } from 'react-redux'
import Creator from '../templates/Creator'
import Posts from '../templates/Posts'
import Profile from '../components/Profile'
import AddPost from '../components/AddPost'
import Comments from '../components/Comments'
import { fetchPost } from '../redux/postSlice'
import { togComment, togToggleProfile } from '../redux/toggleSlice'
import { fetchFollower, fetchFollowing, fetchItem, getUser } from '../redux/userSlice'
import { setUserPosts } from '../redux/postSlice'
import { login } from '../api/fetchAPI'
import fetchAPI from '../api/fetchAPI'
import Edit from '../components/Edit'


const Home = () => {
  const dispatch = useDispatch()
  const mode = useSelector(state => state.item.mode)
  const posts = useSelector(state => state.item.posts)
  const profile = useSelector(state => state.anime.profile)
  const comment = useSelector(state => state.anime.comment)
  const users = useSelector(state => state.user.users)
  const followers = useSelector(state => state.user.followers)
  const toggleProfile = useSelector(state => state.anime.toggleProfile)
  const edit = useSelector(state => state.anime.edit)


  const userPosts = async () => {
    const res = await fetchAPI(`/posts/${login}`, "GET", false)
    dispatch(setUserPosts(res))
  }
  const ri = async () => {
    const user = await fetchAPI(`/user/${login}`, "GET", false)
    console.log(user)
    dispatch(getUser(user))
    dispatch(fetchItem())
    dispatch(fetchPost())
    dispatch(fetchFollower(login))
    dispatch(fetchFollowing(login))
    dispatch(togToggleProfile(false))
    dispatch(togComment(false))
  }
  useEffect(() => {
    ri()
    userPosts()
  }, [])
  //console.log(profile)
  //console.log(followers)
  return (
    <div className={`${mode == "light" ? " bg-b-dark text-white" : " bg-b-light text-black"} h-[100vh] w-full snap-start grid grid-cols-1 lg:grid-cols-10 gap-1 px-2 lg:px-12 pt-12 lg:pt-20 pb-12 lg:pb-5`} >
      <div className='lg:hidden col-span-1 h-[100vh] overflow-hidden overflow-y-scroll hid'>{posts.map(post => <Posts key={post._id} posts={post} />)}</div>
      {/* profile section */}
      <div className={` col-span-3 rounded-xl h-80 pb-2 sm:hidden lg:block`}>
        <AddPost />
        <Profile tog={profile} />
      </div>

      {toggleProfile == true && edit == true ?
        <div className={`${mode == "light" ? "bg-dark" : "bg-light"} col-span-7 ml-6 px-6 py-0 rounded-xl`}><Edit key={22} /></div> :
        <>
          {/* posts section */}
          <div className={` col-span-4 rounded-xl h-[465px] sm:hidden lg:block overflow-hidden snap-mandatory snap-y overflow-y-scroll hid`}>
            <div className=' px-6'>
              {posts.map(post => <Posts key={post._id} posts={post} />)}
            </div>
          </div>
          {/* top creator section */}
          <div className={`${mode == "light" ? "bg-dark" : "bg-light"} col-span-3  sm:hidden lg:block rounded-xl h-[465px] pb-3`}>
            {comment == true ? <Comments profile={false} /> : <>
              <h1 className={` font-bold text-lg px-5 py-3`}>Top Creators</h1>
              <div className='px-4 h-[408px] overflow-hidden overflow-y-scroll hid'>
                {users.map(user => <Creator key={user._id} follow={"Follow"} data={user} />)}
              </div>
            </>}

          </div></>}
    </div>
  )
}

export default Home
