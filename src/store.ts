import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define User and UserState types
export interface User {
  password: string;
  phone: string;
  email: string;
  message :string| null;
  status:string| null;
}

export interface UserState {
  user: User | null;
  loading: boolean
  error: string | null;
}
