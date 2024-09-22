import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name:"themeSlice",
    initialState: true,

    reducers:{
        toggleTheme : (state)=>{
            return !state
        }
    }
})

export default themeSlice.reducer
export const {toggleTheme} = themeSlice.actions