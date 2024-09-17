import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, likeState, User } from '../store';
import { BASE_URL } from '../consts';

const initialState: likeState = {
    like: null,
    likes: null,
    loading: false,
    error: null,
};

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        addLikeStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addLikeSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.like = action.payload;
        },
        addLikeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        getLikesForUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getLikesForUserSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.likes = action.payload;
        },
        getLikesForUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        
    },
});

export const {
    addLikeStart,
    addLikeSuccess,
    addLikeFailure,
    getLikesForUserStart,
    getLikesForUserSuccess,
    getLikesForUserFailure, 
} = likeSlice.actions;




// like
export const addLike = (likeData: { profileId: number }) => async (dispatch: AppDispatch) => {
    dispatch(addLikeStart());
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(
            `${BASE_URL}/api/like/addlike`,
            likeData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch(addLikeSuccess(response.data));
    } catch (error: any) {
        dispatch(addLikeFailure(error.response?.data?.message || "Failed to add like"));
    }
};

export const getLikesForUser = () => async (dispatch: AppDispatch) => {
    dispatch(getLikesForUserStart());
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `${BASE_URL}/api/like/getlikeuser`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        dispatch(getLikesForUserSuccess(response.data));
    } catch (error: any) {
        dispatch(getLikesForUserFailure(error.response?.data?.message || "Failed to fetch likes"));
    }
};

export default likeSlice.reducer;
