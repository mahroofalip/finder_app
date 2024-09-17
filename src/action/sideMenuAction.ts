// get-side-menu
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, SidebarMenuOption, sidebarMenuOptionsState } from '../store'; // Adjust imports according to your project structure
import { BASE_URL } from '../consts';

const initialState: sidebarMenuOptionsState = {
    sidebarMenuOptions: null,
    loading: false,
    error: null,
};

const sidebarMenuSlice = createSlice({
    name: 'sidebarMenu',
    initialState,
    reducers: {
        loadSidebarMenuOptionsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadSidebarMenuOptionsSuccess: (state, action: PayloadAction<SidebarMenuOption[]>) => {
            state.loading = false;
            state.sidebarMenuOptions = action.payload;
        },
        loadSidebarMenuOptionsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    loadSidebarMenuOptionsStart,
    loadSidebarMenuOptionsSuccess,
    loadSidebarMenuOptionsFailure,
} = sidebarMenuSlice.actions;

export const loadSidebarMenuOptions = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    dispatch(loadSidebarMenuOptionsStart());
    try {
        const response = await axios.get(`${BASE_URL}/api/sidemenu/get-side-menu`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        dispatch(loadSidebarMenuOptionsSuccess(response.data));
    } catch (error: any) {
        dispatch(loadSidebarMenuOptionsFailure(error.message));
    }
};

export default sidebarMenuSlice.reducer;
