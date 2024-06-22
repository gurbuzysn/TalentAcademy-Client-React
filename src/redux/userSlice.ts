import { createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    token: '',
    role: '',
    id: '',
    fullname: '',
    imageUri: '',

  },
  reducers:{
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setFullName: (state, action) => {
      state.fullname = action.payload;
    },
    setImageUri: (state, action) => {
      state.imageUri = action.payload;
    }
  },
});

export const { setUserName, setToken, setRole, setId, setFullName, setImageUri } = userSlice.actions;
export default userSlice.reducer;
