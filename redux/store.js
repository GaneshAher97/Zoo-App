import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import DarkModeReducer from './DarkModeReducer'

export const store = configureStore({
  reducer: {
    UserAuth: AuthSlice,
    darkMode : DarkModeReducer
  },
})