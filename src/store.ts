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
import profileAction  from './action/profileAction';
import intrestsOptionsAction from './action/intrestsOptionsAction';
import likeAction from './action/likeActions'
import ignoreAction from './action/ignoreAction';
import visitorActions from './action/visitorActions';
import sideMenuAction from './action/sideMenuAction';




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
    pofile:profileAction,
    like:likeAction,
    ignore:ignoreAction,
    visitor:visitorActions,
    sideMenu:sideMenuAction
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
  selectedMessages:any
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
  isProfileCompleted: boolean | null;
  isLiked: boolean | null;
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
  lookingFor: any| null; 
}

export interface AuthState {
  user: User | null;
  loading: boolean
  error: string | null;
}

export interface UserState {
  users: User[];
  blockedUsers: User[];
  user:User| null;
  profile:any;
  loading: boolean;
  error: string | null;
}

export interface likeState {
  like:User | null,
  likes:User[] | null,
  loading: boolean;
  error: string | null;
}

export interface visitorState {
  visitor:User | null,
  visitors:User[] | null,
  loading: boolean;
  error: string | null;
}
export interface ignoreState {
  ignoredUser:User | null,
  ignoredUsers:User[] | null,
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


export interface SidebarMenuOption {
  id: number;
  label: string;
  icon:string;
}

export interface sidebarMenuOptionsState {
  sidebarMenuOptions: SidebarMenuOption[] | null;
  loading: boolean;
  error: string | null;
}
export interface SearchFields {
  age: number[] | null; // Update to accept an array of numbers
  gender: string;
  name:string;
  height: number[] | null;
  weight: number[] | null;
  eycolor: string;
  
  location: string;
}
