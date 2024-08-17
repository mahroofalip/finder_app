import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './action/messageActions';
import authActions from './action/authActions';
import usersAction from './action/usersAction';
import genderOptionsAction from './action/genderOptionsAction';
import educationOptionsAction from './action/educationOptionsAction';
import professionOptionsAction from './action/professionOptionsAction';
import eyeColorOptionsAction from './action/eyeColorAction';
import hairColorOptionsAction from './action/hairColorAction';
import googleMapPlaceAction from './action/googleMapPlaceAction';
import updateUserProfile  from './action/profileAction';
import intrestsOptionsAction from './action/intrestsOptionsAction';





export const store = configureStore({
  reducer: {
    auth: authActions,
    message: messageReducer,
    users:usersAction,
    genderOption:genderOptionsAction,
    intrestOption:intrestsOptionsAction,
    educationOption:educationOptionsAction,
    professionOption:professionOptionsAction,
    eyeColorOption:eyeColorOptionsAction,
    hairColorOption:hairColorOptionsAction,
    googlePlaces:googleMapPlaceAction,
    updateUser:updateUserProfile
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

export interface PlacesOption {
  id: string;
  description: string;
}
export interface GenderOption {
  id: string;
  gender: string;
}
export interface EyeColorOption {
  id: string;
  eyeColor: string;
}
export interface hairColorOption {
  id: string;
  hairColor: string;
}

export interface EducationOption {
  id: string;
  education: string;
}
export interface ProfessionOption {
  id: string;
  profession: string;
}


export interface User {
  password: string| null;
  phone: string| null;
  email: string| null;
  message: string | null;
  status: string | null;
  firstName:string | null;
  lastName:string | null;
  education :string | null;
  profession :string | null;
  displayName :string | null;
  description :string | null;
  place :string | null;
  age:string | null;
  isOnline:boolean| null;
  profileImage: string| null;
  profileImageKey: string| null;
  city:string| null;
  id:any| null;
  gender:string| null;
  userName:string| null;
  birthDate:string| null;
  height:string| null;
  weight:string| null;
  eyeColor:string| null;
  hairColor:string| null;
  updatedAt:any;
  interests: any| null; 
}

export interface AuthState {
  user: User | null;
  loading: boolean
  error: string | null;
}

export interface UserState {
  users: User[];
  user:User| null;
  loading: boolean;
  error: string | null;
}

export interface genderOptionsState {
  genderOptions: GenderOption[];
  loading: boolean;
  error: string | null;
}
export interface IntrestsOption {
  id: string;
  intrest: string;
}
export interface IntrestOptionsState {
  intrestsOptions: IntrestsOption[];
  loading: boolean;
  error: string | null;
}

export interface googlemapPlaceOptionsState {
  places: PlacesOption[];
  loading: boolean;
  error: string | null;
}


export interface educationOptionsState {
  educationOptions: EducationOption[];
  loading: boolean;
  error: string | null;
}


export interface professionOptionsState {
  professionOptions: ProfessionOption[];
  loading: boolean;
  error: string | null;
}

export interface eyeColorOptionsState {
  eyeColorOptions: EyeColorOption[];
  loading: boolean;
  error: string | null;
}


export interface hairColorOptionsState {
  hairColorOptions: hairColorOption[];
  loading: boolean;
  error: string | null;
}


