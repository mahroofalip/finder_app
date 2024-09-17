import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, EducationOption, educationOptionsState } from '../store';
import { BASE_URL } from '../consts';

const initialState: educationOptionsState = {
    educationOptions: [],
    loading: false,
    error: null,
};

const optionsSlice = createSlice({
    name: 'education',
    initialState,
    reducers: {
        loadEducationOptionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadEducationOptionsSuccess: (state, action: PayloadAction<EducationOption[]>) => {
            state.loading = false;
            state.educationOptions = action.payload;
        },
        loadEducationOptionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
 loadEducationOptionsFailure,
 loadEducationOptionsStart,
 loadEducationOptionsSuccess
} = optionsSlice.actions;

export const loadEducationOptions = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    dispatch(loadEducationOptionsStart());
    try {
        const response = await axios.get(`${BASE_URL}/api/common/education-list`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        dispatch(loadEducationOptionsSuccess(response.data));
    } catch (error: any) {
        dispatch(loadEducationOptionsFailure(error.message));
    }
};


export default optionsSlice.reducer;
