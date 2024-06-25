import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: 'course',
    initialState:{
        courseName: '',
        description: '',
        image: null,
    },
    reducers:{
        setCourseName: (state, action) => {
            state.courseName = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        }
    }
})

export const { setCourseName, setDescription, setImage } = courseSlice.actions;
export default courseSlice.reducer;