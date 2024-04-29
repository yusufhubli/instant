import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    profile: false,
    edit: false,
    comment: false,
    toggleProfile:false,
    model:false,
    popup:false
}

const toggleSlice = createSlice({
    name: "anime",
    initialState,
    reducers: {
        togProfile(state, action) {
            state.profile = action.payload
            return state
        },
        togEdit(state, action) {
            state.edit = action.payload
            return state
        },
        togComment(state, action) {
            state.comment = action.payload
            return state
        },
        togToggleProfile(state, action) {
            state.toggleProfile = action.payload
            return state
        },
        togModel(state, action) {
            state.model = action.payload
            return state
        },
        togPopup(state, action) {
            state.popup = action.payload
            return state
        },
        setClear(state){
            state = initialState
            return state
        }
    }
})

export const { togProfile, togEdit,togComment,togToggleProfile,togModel,togPopup,setClear } = toggleSlice.actions
export default toggleSlice.reducer 