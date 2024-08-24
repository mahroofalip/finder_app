// messageSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, Chat, Message, MessageState } from '../store';


const initialState: MessageState = {
    messages: [],
    selectedMessages:[],
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
            state.selectedMessages.push(action.payload);
        },
        sendMessageFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        receiveMessageStart: (state) => {
            // state.messages = []
            state.loading = true;
        },
        receiveMessageSuccess: (state, action: PayloadAction<Message>) => {
            state.selectedMessages = action.payload;
            state.loading = false;
        },
        receiveMessageFailure: (state, action: PayloadAction<Message>) => {
            state.loading = false;
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
    receiveMessageFailure,
    receiveMessageStart,
    receiveMessageSuccess,
    loadUserChatsStart,
    loadUserChatsSuccess,
    loadUserChatsFailure,
    createRoomStart,
    createRoomSuccess,
    createRoomFailure
} = messageSlice.actions;

export const sendMessage = (newMessage: any,roomId:any) => async (dispatch: AppDispatch) => {
    dispatch(sendMessageStart());
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.post('http://localhost:5000/api/messages/createNewMessage', {newMessage,roomId}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        
        // dispatch(sendMessageSuccess(response.data.message));
    } catch (error: any) {
        dispatch(sendMessageFailure(error.message));
    }
};
export const pushReciverNewMessage = (message: any) => async (dispatch: AppDispatch) => {
  
        dispatch(sendMessageSuccess(message));
    
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

export const getMessagesByRoomId = (roomId: Message) => async (dispatch: AppDispatch) => {
    dispatch(receiveMessageStart());
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const response = await axios.post('http://localhost:5000/api/messages/getMessagesByRoomId',{roomId}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
        });
        
        dispatch(receiveMessageSuccess(response.data.messages));
    } catch (error: any) {
        dispatch(receiveMessageFailure(error.message));
    }
};


export default messageSlice.reducer;
