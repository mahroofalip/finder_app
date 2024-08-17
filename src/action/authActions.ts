import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { AppDispatch, User, AuthState } from "../store";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerExistingUser: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMeSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    getMeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  registerExistingUser,
  getMeFailure,
  getMeStart,
  getMeSuccess,
  logout,
} = userSlice.actions;

export const loginUser = (userData: User) => async (dispatch: AppDispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = response.data.token;
    localStorage.setItem("token", token);
    dispatch(loginSuccess(response.data));
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

export const registerUser =
  (userData: User) => async (dispatch: AppDispatch) => {
    dispatch(registerStart());
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "response");

      const token = response.data.token;
      localStorage.setItem("token", token);

      dispatch(registerSuccess(response.data));
    } catch (error: any) {
      console.log(error.response.data, "error.response.data");
      if (error?.response?.data?.status === "exist") {
        dispatch(registerExistingUser(error.response.data));
      } else {
        dispatch(registerFailure(error.response.data));
      }
    }
  };

  export const getMe = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token"); 
  dispatch(getMeStart());
    try {
      const response = await axios.get("http://localhost:5000/api/users/getMe", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });
  
    console.log(response.data.user,"response.data");
    
    dispatch(getMeSuccess(response.data.user));
        } catch (error: any) {
    dispatch(getMeFailure(error.message));
    }
  };
  
  export const logoutUser = () => (dispatch: AppDispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

export default userSlice.reducer;
