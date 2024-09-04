import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, User, visitorState } from '../store';
const initialState: visitorState = {
    visitor: null,
    visitors: null,
    loading: false,
    error: null,
};
const visitorSlice = createSlice({
    name: 'visitor',
    initialState,
    reducers: {
        addVisitorStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addVisitorSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.visitor = action.payload;
        },
        addVisitorFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        getVisitorsForUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getVisitorForUserSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.visitors = action.payload;
        },
        getVisitorForUserFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});
export const {
    addVisitorStart,
    addVisitorSuccess,
    addVisitorFailure,
    getVisitorForUserFailure,
    getVisitorForUserSuccess,
    getVisitorsForUserStart
} = visitorSlice.actions;
export const addVisitor = (visitorData: { profileId: number }) => async (dispatch: AppDispatch) => {
    dispatch(addVisitorStart());
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(
            "http://localhost:5000/api/visitor/add-visitor",
            visitorData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        dispatch(addVisitorSuccess(response.data));
    } catch (error: any) {
        dispatch(addVisitorFailure(error.response?.data?.message || "Failed to add visitor"));
    }
};
export const getVisitors = () => async (dispatch: AppDispatch) => {
    dispatch(getVisitorsForUserStart());
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(
            `http://localhost:5000/api/visitor/get-visitorUser`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        dispatch(getVisitorForUserSuccess(response.data));
    } catch (error: any) {
        dispatch(getVisitorForUserFailure(error.response?.data?.message || "Failed to fetch visitors"));
    }
};
export default visitorSlice.reducer;
