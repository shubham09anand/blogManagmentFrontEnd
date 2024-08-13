import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from '../Features/Counter/LoginSlice';


export default configureStore({
  reducer: {
    LoginSlice: LoginSlice,
  },
})