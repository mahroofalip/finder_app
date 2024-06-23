import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './action/messageActions';
import authActions from './action/authActions';
import usersAction from './action/usersAction';



export const store = configureStore({
  reducer: {
    auth: authActions,
    message: messageReducer,
    users:usersAction
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message_content: string;
  room_id: any;
  timestamp: string;
  status: any
}

export interface Chat {
  // id: string;
  room_id: string;
  // receiverId: string;
  // message_content: string;
  // room_id: any;
  // timestamp: string;
  // status: any
}


export interface MessageState {
  messages: any;
  // messages:Message[]
  // chat: Chat | null;
    chat: any | null;
  loading: boolean;
  error: string | null;
}

// Define User and UserState types
export interface User {
  password: string;
  phone: string;
  email: string;
  message: string | null;
  status: string | null;
  firstName:string | null;
  lastName:string | null;
  age:string | null;
  isOnline:boolean;
  profileImage:string
  city:string
  id:any
  gender:string
  userName:string
  birthDate:string;
  height:string
  weight:string
  eyeColor:string
  hairColor:string
}

export interface AuthState {
  user: User | null;
  loading: boolean
  error: string | null;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}