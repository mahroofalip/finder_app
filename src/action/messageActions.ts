// messageSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, Message, MessageState } from '../store';

const initialState: MessageState = {
    messages: [],
    loading: false,
    error: null,
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        sendMessageStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        sendMessageSuccess: (state, action: PayloadAction<Message>) => {
            state.loading = false;
            state.messages.push(action.payload);
        },
        sendMessageFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        receiveMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        loadUserChatsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadUserChatsSuccess: (state, action: PayloadAction<Message[]>) => {
            state.loading = false;
            state.messages = action.payload;
        },
        loadUserChatsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    sendMessageStart,
    sendMessageSuccess,
    sendMessageFailure,
    receiveMessage,
    loadUserChatsStart,
    loadUserChatsSuccess,
    loadUserChatsFailure,
} = messageSlice.actions;

export const sendMessage = (messageData: Message) => async (dispatch: AppDispatch) => {
    dispatch(sendMessageStart());
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.post('http://localhost:5000/api/messages/sendMessage', messageData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        dispatch(sendMessageSuccess(response.data));
    } catch (error: any) {
        dispatch(sendMessageFailure(error.message));
    }
};

export const loadUserChats = () => async (dispatch: AppDispatch) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    dispatch(loadUserChatsStart());
    try {
        const response = await axios.get(`http://localhost:5000/api/messages/getUserChats`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header

            },
        });
        dispatch(loadUserChatsSuccess(response.data));
    } catch (error: any) {
        dispatch(loadUserChatsFailure(error.message));
    }
};

export default messageSlice.reducer;
