


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, User, UserState, } from '../store';
import { BASE_URL } from '../consts';

const initialState: UserState = {
  users: [],
  user: null,
  blockedUsers: [],
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
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
    unBlockProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    unBlockProfileSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.profile = action.payload;
    },
    unBlockProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getBlockedProfilesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getBlockedProfilesSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.blockedUsers = action.payload;
    },
    getBlockedProfilesFailure: (state, action: PayloadAction<string>) => {
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
  blockProfileSuccess,
  unBlockProfileFailure,
  unBlockProfileStart,
  unBlockProfileSuccess,
  getBlockedProfilesStart,
  getBlockedProfilesSuccess,
  getBlockedProfilesFailure
} = profileSlice.actions;


export const getBlockedProfiles = () => async (dispatch: AppDispatch) => {
  dispatch(getBlockedProfilesStart());
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${BASE_URL}/api/users/get-blocked-profies`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      }
    );
    dispatch(getBlockedProfilesSuccess(response.data));
  } catch (error: any) {
    dispatch(getBlockedProfilesFailure(error.response?.data?.message || "Failed to fetch likes"));
  }
};
export const unBlockUser = (profileId: any) => async (dispatch: AppDispatch) => {
  dispatch(blockProfileStart());
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${BASE_URL}/api/users/unblock-profile`,
      { profileId },
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
export const blockUser = (roomId:any,profileId: any) => async (dispatch: AppDispatch) => {
  dispatch(blockProfileStart());
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
     `${BASE_URL}/api/users/block-profile`,
      { profileId,roomId },
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
        `${BASE_URL}/api/users/update-user`,
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
export const getProfile = (profileId: any) => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem("token");
  dispatch(getProfileStart());
  try {
    const response = await axios.get(`${BASE_URL}/api/users/profile/${profileId}`, {
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

export default profileSlice.reducer;