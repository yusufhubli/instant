import fetchAPI, { login } from "./fetchAPI";
import { setUserPosts } from '../redux/postSlice'
import { useDispatch } from "react-redux";


export const userPosts = async () => {
    const dispatch = useDispatch()
    console.log(object)
    const res = await fetchAPI(`/posts/${login}`, "GET", false)
    dispatch(setUserPosts(res))
}