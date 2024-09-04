import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, User, UserState, } from '../store';

const initialState: UserState = {
    users: [],
    blockedUsers:[],
    profile:null,
    loading: false,
    error: null,
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.users = action.payload;
        },
        loadUsersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateOnlineStatusStart: (state) => {
            state.loading = true;
        },
        updatOnlineStatusSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
        },
        updateOnlineStatusFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
        },
    },
});

export const {
    loadUsersStart,
    loadUsersSuccess,
    loadUsersFailure,
    updateOnlineStatusStart,
    updatOnlineStatusSuccess,
    updateOnlineStatusFailure
} = userSlice.actions;

export const loadFinderUsers = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    dispatch(loadUsersStart());
    try {
        const response = await axios.get('http://localhost:5000/api/users/getUsers', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        dispatch(loadUsersSuccess(response.data));
    } catch (error: any) {
        dispatch(loadUsersFailure(error.message));
    }
};

export const updateUserOnlineStatus =
    () => async () => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get(
                "http://localhost:5000/api/users/update-online",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        }

    };


// update-online
export default userSlice.reducer;
