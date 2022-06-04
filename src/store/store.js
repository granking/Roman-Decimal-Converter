import { configureStore } from '@reduxjs/toolkit'
import convertReducer from '../features/convertSlice';

export default configureStore({
  reducer: {
    convert: convertReducer,
  },
})