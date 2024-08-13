import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, User, UserState, } from '../store';

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    user:null
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
    },
});

export const {
    loadUsersStart,
    loadUsersSuccess,
    loadUsersFailure,
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


export default userSlice.reducer;
