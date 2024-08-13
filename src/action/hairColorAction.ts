import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, hairColorOption, hairColorOptionsState } from '../store';

const initialState: hairColorOptionsState = {
    hairColorOptions: [],
    loading: false,
    error: null,
};

const optionsSlice = createSlice({
    name: 'eyeColor',
    initialState,
    reducers: {
        loadHairColorOptionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadHairColorOptionsSuccess: (state, action: PayloadAction<hairColorOption[]>) => {
            state.loading = false;
            state.hairColorOptions = action.payload;
        },
        loadHairColorOptionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
 loadHairColorOptionsFailure,
 loadHairColorOptionsStart,
 loadHairColorOptionsSuccess
} = optionsSlice.actions;

export const loadhairColorOptions = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    dispatch(loadHairColorOptionsStart());
    try {
        const response = await axios.get('http://localhost:5000/api/common/hair-color-list', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        dispatch(loadHairColorOptionsSuccess(response.data));
    } catch (error: any) {
        dispatch(loadHairColorOptionsFailure(error.message));
    }
};


export default optionsSlice.reducer;
