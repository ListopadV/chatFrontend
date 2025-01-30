import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {AppDispatch} from "../store";
import axios from 'axios';
import { MessagesState, Message } from '../types';
import { url } from '../variables';

const initialState: MessagesState = {
    messages: [],
    messageOrder: 0
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        },
        setMessageOrder: (state, action: PayloadAction<number>) => {
            state.messageOrder = action.payload;
        },
        clearMessages: (state) => {
            return {
                ...state,
                messages: []
            }
        }
    }
});

export const fetchMessages = (accessToken: string, chat_id: string, bot_id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${url}/messages/fetch`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-chat-id': chat_id,
            'X-bot-id': bot_id
        },
    });
        dispatch(setMessages(response.data.messages));
        if (response.data.messages.length > 0){
        const order = response.data.messages[response.data.messages.length  - 1].message_order;
            dispatch(setMessageOrder(order));
        }
        return response;
    } catch (e){
        console.error('Error fetching messages: ', e);
    }
}

export const { setMessages, addMessage, clearMessages, setMessageOrder } = messagesSlice.actions;
export default messagesSlice.reducer;
