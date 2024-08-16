


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, User, UserState, } from '../store';

const initialState: UserState = {
    users: [],
    user:null,
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
    },
});


export const {
    updateUserInfoFailure,
    updateUserInfoStart,
    updateUserInfoSuccess
} = userSlice.actions;


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



export default userSlice.reducer;