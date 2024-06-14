import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import { userSlice } from '../slices/userSlice';

const store = configureStore({
  reducer: {
    ...rootReducer,
    user: userSlice
  }
});

export default store;