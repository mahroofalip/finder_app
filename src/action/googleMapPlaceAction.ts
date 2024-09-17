import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch , googlemapPlaceOptionsState, PlacesOption,  } from '../store';
import { loadProfessionOptionsFailure, loadProfessionOptionsStart, loadProfessionOptionsSuccess } from './professionOptionsAction';
import { BASE_URL } from '../consts';

const initialState: googlemapPlaceOptionsState = {
    places: [],
    loading: false,
    error: null,
};

const optionsSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        loadGooglePlacesOptionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadGooglePlacesSuccess: (state, action: PayloadAction<PlacesOption[]>) => {
            state.loading = false;
            state.places = action.payload;
        },
        loadGooglePlacesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
   loadGooglePlacesFailure,
   loadGooglePlacesOptionsStart,
   loadGooglePlacesSuccess
} = optionsSlice.actions;

export const loadGooglePlaces = (input:string) => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    dispatch(loadGooglePlacesOptionsStart());
    try {
        const response = await axios.get(`${BASE_URL}/api/map/places`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            params:{
                input
            }
        });
        dispatch(loadGooglePlacesSuccess(response.data.predictions));
    } catch (error: any) {
        dispatch(loadGooglePlacesFailure(error.message));
    }
};


export default optionsSlice.reducer;
