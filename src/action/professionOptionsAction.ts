import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, ProfessionOption, professionOptionsState } from '../store';

const initialState: professionOptionsState = {
    professionOptions: [],
    loading: false,
    error: null,
};

const optionsSlice = createSlice({
    name: 'profession',
    initialState,
    reducers: {
        loadProfessionOptionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadProfessionOptionsSuccess: (state, action: PayloadAction<ProfessionOption[]>) => {
            state.loading = false;
            state.professionOptions = action.payload;
        },
        loadProfessionOptionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
   loadProfessionOptionsFailure,
   loadProfessionOptionsStart,
   loadProfessionOptionsSuccess
} = optionsSlice.actions;

export const loadProfessionOptions = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    dispatch(loadProfessionOptionsStart());
    try {
        const response = await axios.get('http://localhost:5000/api/common/profession-list', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        dispatch(loadProfessionOptionsSuccess(response.data));
    } catch (error: any) {
        dispatch(loadProfessionOptionsFailure(error.message));
    }
};


export default optionsSlice.reducer;
