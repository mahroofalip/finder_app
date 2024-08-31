


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, User, UserState, } from '../store';

const initialState: UserState = {
    users: [],
    user:null,
    profile:null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       
         updateUserInfoStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          updateUserInfoSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.user = action.payload;
          },
          updateUserInfoFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
          },
          getProfileStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          getProfileSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.profile = action.payload;
          },
          getProfileFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
          },
          blockProfileStart: (state) => {
            state.loading = true;
            state.error = null;
          },
          blockProfileSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.profile = action.payload;
          },
          blockProfileFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
          },
          
    },
});


export const {
    updateUserInfoFailure,
    updateUserInfoStart,
    getProfileFailure,
    getProfileStart,
    getProfileSuccess,
    updateUserInfoSuccess,
    blockProfileFailure,
    blockProfileStart,
    blockProfileSuccess
} = userSlice.actions;

export const blockUser = (profileId: any) => async (dispatch: AppDispatch) => {
  dispatch(blockProfileStart());
  const token = localStorage.getItem("token"); 

  try {
    const response = await axios.put(
      "http://localhost:5000/api/users/block-profile",
      {profileId},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    dispatch(blockProfileSuccess(response.data));
    
  } catch (error: any) {
      dispatch(blockProfileFailure(error.response.data));
  }
};
export const updateUserProfile =
  (profile: any) => async (dispatch: AppDispatch) => {
    dispatch(updateUserInfoStart());
    const token = localStorage.getItem("token"); 

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/update-user",
        profile,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      dispatch(updateUserInfoSuccess(response.data));
      
    } catch (error: any) {
        dispatch(updateUserInfoFailure(error.response.data));
    }
  };
  export const getProfile = (profileId:any) => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token"); 
  dispatch(getProfileStart());
    try {
      const response = await axios.get(`http://localhost:5000/api/users/profile/${profileId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
  
    
    dispatch(getProfileSuccess(response.data));
        } catch (error: any) {
    dispatch(getProfileFailure(error.message));
    }
  };

export default userSlice.reducer;