// messageSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, Chat, Message, MessageState } from '../store';


const initialState: MessageState = {
    messages: [],
    chat:null,
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
        createRoomStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createRoomSuccess: (state, action: PayloadAction<Chat>) => {
            state.loading = false;
            state.chat = action.payload;
        },
        createRoomFailure: (state, action: PayloadAction<string>) => {
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
    createRoomStart,
    createRoomSuccess,
    createRoomFailure
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
export const createRoom = (sender_id : any,receiver_id:any,message_content:any) => async (dispatch: AppDispatch) => {
    dispatch(createRoomStart());
    try {
        const token = localStorage.getItem('token'); 

        console.log(receiver_id,"step receiver_id");
        console.log(sender_id,"step sender_id");

        const response = await axios.post('http://localhost:5000/api/messages/createRoomAndSendMessage', {receiver_id,sender_id,message_content}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        dispatch(createRoomSuccess(response.data));
    } catch (error: any) {
        dispatch(createRoomFailure(error.message));
    }
};


export default messageSlice.reducer;
