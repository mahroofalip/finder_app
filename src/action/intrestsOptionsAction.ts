import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, IntrestOptionsState, IntrestsOption } from '../store';
import { BASE_URL } from '../consts';

const initialState: IntrestOptionsState = {
    intrestsOptions: [],
    loading: false,
    error: null,
};

const optionsSlice = createSlice({
    name: 'intrest',
    initialState,
    reducers: {
        loadIntrestOptionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadIntrestOptionsSuccess: (state, action: PayloadAction<IntrestsOption[]>) => {
            state.loading = false;
            state.intrestsOptions = action.payload;
        },
        loadIntrestOptionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
   loadIntrestOptionsFailure,
   loadIntrestOptionsStart,
   loadIntrestOptionsSuccess
} = optionsSlice.actions;

export const loadIntrestsOptions = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); 
    dispatch(loadIntrestOptionsStart());
    try {
        const response = await axios.get(`${BASE_URL}/api/common/interests-list`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        });
        dispatch(loadIntrestOptionsSuccess(response.data));
    } catch (error: any) {
        dispatch(loadIntrestOptionsFailure(error.message));
    }
};

export default optionsSlice.reducer;
