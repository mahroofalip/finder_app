import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, likeState, User } from '../store';

const initialState: likeState = {
    like: null,
    likes: null,
    cancel: null,
    cancelledUsers: null,
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
        ignoreUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        ignoreUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.cancel = action.payload;
        },
        ignoreUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        removeLikeStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        removeLikeSuccess: (state) => {
            state.loading = false;
            state.like = null;
        },
        removeLikeFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        removeIgnoreStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        removeIgnoreSuccess: (state) => {
            state.loading = false;
            state.like = null;
        },
        removeIgnoreFailure: (state, action: PayloadAction<string>) => {
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
        getIgnoredUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getIgnoredUserSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.likes = action.payload;
        },
        getIgnoredUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    addLikeStart,
    addLikeSuccess,
    addLikeFailure,
    removeLikeStart,
    removeLikeSuccess,
    removeLikeFailure,
    getLikesForUserStart,
    getLikesForUserSuccess,
    getLikesForUserFailure,
    getIgnoredUserFailure,
    getIgnoredUserStart,
    getIgnoredUserSuccess,
    ignoreUserFailure,
    ignoreUserStart,
    ignoreUserSuccess,
    removeIgnoreFailure,
    removeIgnoreStart,
    removeIgnoreSuccess
} = likeSlice.actions;


// cancel


export const ignoreUser = (ignoreData: { profileId: number }) => async (dispatch: AppDispatch) => {
    dispatch(ignoreUserStart());
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(
            "http://localhost:5000/api/likes/ignoreUser",
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
        dispatch(ignoreUserFailure(error.response?.data?.message || "Failed to add like"));
    }
};
export const removeIgnore = (ignoredId: number) => async (dispatch: AppDispatch) => {
    dispatch(removeIgnoreStart());
    const token = localStorage.getItem("token");

    try {
        await axios.delete(
            `http://localhost:5000/api/likes/removeIgnore`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: { id: ignoredId },
            }
        );
        dispatch(removeIgnoreSuccess());
    } catch (error: any) {
        dispatch(removeIgnoreFailure(error.response?.data?.message || "Failed to remove Ignore"));
    }
};

export const getIgnoredProfileForUser = (profileId: number) => async (dispatch: AppDispatch) => {
    dispatch(getIgnoredUserStart());
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `http://localhost:5000/api/likes/getIgnoredProfileForUser/${profileId}`,
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

// like
export const addLike = (likeData: { profileId: number }) => async (dispatch: AppDispatch) => {
    dispatch(addLikeStart());
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(
            "http://localhost:5000/api/like/addlike",
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

export const removeLike = (likeId: number) => async (dispatch: AppDispatch) => {
    dispatch(removeLikeStart());
    const token = localStorage.getItem("token");

    try {
        await axios.delete(
            `http://localhost:5000/api/like/removeLike`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                data: { id: likeId },
            }
        );
        dispatch(removeLikeSuccess());
    } catch (error: any) {
        dispatch(removeLikeFailure(error.response?.data?.message || "Failed to remove like"));
    }
};

export const getLikesForUser = () => async (dispatch: AppDispatch) => {
    dispatch(getLikesForUserStart());
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `http://localhost:5000/api/like/getlikeuser`,
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
