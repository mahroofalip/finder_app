import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, ignoreState, User } from '../store';
import { BASE_URL } from '../consts';

const initialState: ignoreState = {
    ignoredUser: null,
    ignoredUsers: null,
    loading: false,
    error: null,
};

const ignoreSlice = createSlice({
    name: 'ignore',
    initialState,
    reducers: {
       
        ignoreUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        ignoreUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.ignoredUser = action.payload;
        },
        ignoreUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
       
        
        getIgnoredUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getIgnoredUserSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.ignoredUsers = action.payload;
        },
        getIgnoredUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    
    getIgnoredUserFailure,
    getIgnoredUserStart,
    getIgnoredUserSuccess,
    ignoreUserFailure,
    ignoreUserStart,
    ignoreUserSuccess,
   
} = ignoreSlice.actions;


// cancel


export const ignoreUser = (ignoreData: { profileId: number }) => async (dispatch: AppDispatch) => {
    dispatch(ignoreUserStart());
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(
            `${BASE_URL}/api/ignore/ignoreUser`,
            ignoreData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch(ignoreUserSuccess(response.data));
    } catch (error: any) {
        dispatch(ignoreUserFailure(error.response?.data?.message || "Failed to Ignore"));
    }
};


export const getIgnoredProfileForUser = () => async (dispatch: AppDispatch) => {
    dispatch(getIgnoredUserStart());
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `${BASE_URL}/api/ignore/getIgnoredUser`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        dispatch(getIgnoredUserSuccess(response.data));
    } catch (error: any) {
        dispatch(getIgnoredUserFailure(error.response?.data?.message || "Failed to fetch Ignored Users"));
    }
};



export default ignoreSlice.reducer;
