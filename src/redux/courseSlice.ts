import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: 'course',
    initialState:{
        courseName: '',
        description: '',
        image: null,
        topicName: '',
        lessons: []
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
        },
        setTopicName: (state, action) => {
            state.topicName = action.payload;
        },
        setLessons: (state, action) => {
            state.lessons = action.payload;
        }
    }
})

export const { setCourseName, setDescription, setImage, setTopicName, setLessons } = courseSlice.actions;
export default courseSlice.reducer;