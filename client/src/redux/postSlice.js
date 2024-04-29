import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "../api/fetchAPI";
const cart = JSON.parse(localStorage.getItem("cart")) || []
export const STATUS = {
    LOADING:'loading',
    ERROR:'error',
    IDLE:'idle'
}

const initialState ={
    mode:"light",
    userposts:[],
    posts:[],
    commentId:"",
    comment:[],
    status:STATUS.LOADING
}

const itemSlice = createSlice({
    name:"item",
    initialState,
    reducers:{
        setMode(state,action){
          if(state.mode == "light"){
            state.mode = "dark"
            return state
          }else{
            state.mode = "light"
            return state
          }
        },
        setCommentId(state,action){
          state.commentId = action.payload
          return state
        },
        setComment(state,action){
          state.comment = action.payload[0].Comments
          return state
        },
        setUserPosts(state,action){
          state.userposts = action.payload
          return state
        },
        setClear(state){
          state = initialState
          return state
      }
      //  removeItem(state,action){
      //   state.status = STATUS.IDLE
      //   state.data = state.data.filter(x=>x._id != action.payload)
      //   return state
      //  },
      //  addCart(state,action){
      //    state.cart = action.payload
      //    localStorage.setItem("cart",JSON.stringify(state.cart))
      //    return state
      //  }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPost.fulfilled,(state,action)=>{
            state.status = STATUS.IDLE
            state.posts = action.payload
            return state
         })
        .addCase(fetchPost.pending,(state,action)=>{
            state.status = STATUS.LOADING
        }).addCase(fetchPost.rejected,(state,action)=>{
           state.status = STATUS.ERROR
        }),

        builder.addCase(fetchComment.fulfilled,(state,action)=>{
          state.commentId = action.payload
          return state
       })

    },
})

// export const fetchItem = createAsyncThunk('item/fetch',async()=>{
//     const res = await fetch("http://localhost:5000",{
//         headers:{
//             "content-type":"application/json"
//         },
//         method:"GET"
//     })
//     const data = await res.json()
//     return data                             
// }) 

export const fetchPost = createAsyncThunk('post/fetch',async()=>{
  const res = await fetchAPI('/posts',"GET",false)
  return res
})

export const fetchComment = createAsyncThunk('comment/fetch',async(id)=>{
  console.log(id)
  const res = await fetchAPI(`/posts/comment/${id}`,"GET",false)
  return res
})
export const { setCommentId,setMode,setComment,setUserPosts,setClear} = itemSlice.actions;
export default itemSlice.reducer

