import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "./postSlice";
import fetchAPI, { login } from "../api/fetchAPI";
const initialState = {
    user: [],
    users: [],
    followers: [],
    following: [],
    status: STATUS.LOADING
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser(state, action) {
            state.user = action.payload
            return state
        },
        setClear(state) {
            state = initialState
            return state
        },
        setFollowers(state, action) {
            state.followers = action.payload
            return state
        },
        setFollowing(state, action) {
            state.following = action.payload
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItem.fulfilled, (state, action) => {
            //console.log('hello', action.payload)
            state.status = STATUS.IDLE
            state.users = action.payload.filter(x => x._id != login)
            return state
        }).addCase(fetchItem.pending, (state, action) => {
            state.status = STATUS.LOADING
        }).addCase(fetchItem.rejected, (state, action) => {
            state.status = STATUS.ERROR
        }).addCase(fetchFollower.fulfilled, (state, action) => {
            state.status = STATUS.IDLE
            state.followers = action.payload
            return state
        }).addCase(fetchFollower.pending, (state, action) => {
            state.status = STATUS.LOADING
        }).addCase(fetchFollower.rejected, (state, action) => {
            state.status = STATUS.ERROR
        }).addCase(fetchFollowing.fulfilled, (state, action) => {
            state.status = STATUS.IDLE
            state.following = action.payload
            return state
        })
    }
})

export const fetchItem = createAsyncThunk('user/fetch', async () => {
    const res = await fetchAPI("/user", "GET", false)
    return res
})

export const fetchFollower = createAsyncThunk('follower/fetch', async (id) => {
    const res = await fetchAPI(`/user/follower/${id}`, "GET", false)
    return res
})

export const fetchFollowing = createAsyncThunk('following/fetch', async (id) => {
    const res = await fetchAPI(`/user/following/${id}`, "GET", false)
    return res
})

export const { getUser, setClear, setFollowers, setFollowing } = userSlice.actions
export default userSlice.reducer