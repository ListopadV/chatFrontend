import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from "../store";
import axios, {isAxiosError} from 'axios';
import { addMessage } from "./messagesSlice";
import { ChatsState, Chat } from "../types";
import { url } from '../variables';

type loadingFunction = (loading: boolean) => void
type errorHandler = (response: {
    message: string, open: boolean
}) => void

const initialState: ChatsState = {
    chats: [],
    user: {},
    adding: false,
    currentChat: {
        chat_id: '',
        chat_name: '',
        created_at: '',
        user_id: '',
        bot_id: '',
        bot_avatar: '',
        bot_name: '',
    }
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<Chat[]>) => {
            state.chats = action.payload;
        },
        setOpening: (state, action: PayloadAction<boolean>) => {
            state.adding = action.payload;
        },
        setCurrentChat: (state, action: PayloadAction<Chat>) => {
            state.currentChat = action.payload;
        },
        clearChats: (state) => {
            state.chats = [];
        }
    }
});

export const currentChat = (accessToken: string, chat_id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${url}/chats/${chat_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
        });
        dispatch(setCurrentChat(response.data));
    } catch (error) {
        console.error('Error fetching current chat: ', error);
    }
}

export const fetchChats = (accessToken: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${url}/chats/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        });
        dispatch(setChats(response.data));
    } catch (error) {
        console.error('Error fetching chats: ', error);
    }
}

export const createChat = (accessToken: string, name: string, bot_id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post(`${url}/chats/create`, {
            name: name,
            bot_id: bot_id,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
        });
        dispatch(setCurrentChat({
            chat_id: response.data.chat_id,
            user_id: response.data.user_id,
            bot_id: bot_id,
            chat_name: response.data.name,
            bot_avatar: response.data.bot_avatar,
            bot_name: response.data.bot_name,
            created_at: response.data.created_at,
        }));
    } catch (error) {
        console.error('Error creating chat: ', error);
    }
}

export const deleteChat = (accessToken: string, chat_id: string) => async (dispatch: AppDispatch) => {
    try {

        await axios.delete(`${url}/chats/${chat_id}/delete`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }).then(() => {
            dispatch(fetchChats(accessToken));
        })
    } catch (e) {
        console.error("Error deleting chat: ", e);
    }
}

export const askBot = (
    accessToken: string,
    text: string,
    name: string,
    params: Object | null,
    message_order: number,
    chat_id: string,
    bot_id: string,
    setLoading: loadingFunction,
    errorHandler: errorHandler,
) => async (dispatch: AppDispatch) => {
    try {
        setLoading(true);
        const response = await axios.post(`${url}/chats/ask`, {
            text: text,
            message_order: message_order,
            ...params
        }, {
            headers: {
                'X-name': name,
                'X-chat-id': chat_id,
                'X-bot-id': bot_id,
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        });
        const bot_message = response.data.bot_message;
        const user_message = response.data.user_message;
        dispatch(addMessage(user_message));
        dispatch(addMessage(bot_message));
    } catch (error) {
        if (isAxiosError(error) && error.response){
            errorHandler({
                message: error.response.data,
                open: true
            });
        }
    } finally {
        setLoading(false);
    }
}


export const { setChats, setOpening, setCurrentChat, clearChats } = chatsSlice.actions;
export default chatsSlice.reducer;
