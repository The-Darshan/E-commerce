import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileData: null,
};

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setprofileData(state,action){
            state.profileData = action.payload;
        }
    }
})

export const {setprofileData} = profileSlice.actions;
export default profileSlice.reducer;