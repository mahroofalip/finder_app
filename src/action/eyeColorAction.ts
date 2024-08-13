import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, EyeColorOption, eyeColorOptionsState, ProfessionOption, professionOptionsState } from '../store';

const initialState: eyeColorOptionsState = {
    eyeColorOptions: [],
    loading: false,
    error: null,
};

const optionsSlice = createSlice({
    name: 'education',
    initialState,
    reducers: {
        loadEyeColorOptionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadEyeColorOptionsSuccess: (state, action: PayloadAction<EyeColorOption[]>) => {
            state.loading = false;
            state.eyeColorOptions = action.payload;
        },
        loadEyeColorOptionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
 loadEyeColorOptionsFailure,
 loadEyeColorOptionsStart,
 loadEyeColorOptionsSuccess
} = optionsSlice.actions;

export const loadEyeColorOptions = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    dispatch(loadEyeColorOptionsStart());
    try {
        const response = await axios.get('http://localhost:5000/api/common/eye-color-list', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        dispatch(loadEyeColorOptionsSuccess(response.data));
    } catch (error: any) {
        dispatch(loadEyeColorOptionsFailure(error.message));
    }
};


export default optionsSlice.reducer;
