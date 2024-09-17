import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, GenderOption, genderOptionsState,  } from '../store';
import { loadProfessionOptionsFailure, loadProfessionOptionsStart, loadProfessionOptionsSuccess } from './professionOptionsAction';
import { BASE_URL } from '../consts';

const initialState: genderOptionsState = {
    genderOptions: [],
    loading: false,
    error: null,
};

const optionsSlice = createSlice({
    name: 'gender',
    initialState,
    reducers: {
        loadGenderOptionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadGenderOptionsSuccess: (state, action: PayloadAction<GenderOption[]>) => {
            state.loading = false;
            state.genderOptions = action.payload;
        },
        loadGenderOptionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
   loadGenderOptionsFailure,
   loadGenderOptionsStart,
   loadGenderOptionsSuccess
} = optionsSlice.actions;

export const loadGenderOptions = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    dispatch(loadGenderOptionsStart());
    try {
        const response = await axios.get(`${BASE_URL}/api/common/genders-list`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        dispatch(loadGenderOptionsSuccess(response.data));
    } catch (error: any) {
        dispatch(loadGenderOptionsFailure(error.message));
    }
};


export default optionsSlice.reducer;
