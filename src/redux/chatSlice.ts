import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {ChatsState, ChatEntity} from "../Entities/ChatEntities";

const initialState: ChatsState = {
    chats: [],
    user: {},
    adding: false,
    currentChat: null
}

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<ChatEntity[]>) => {
            state.chats = action.payload;
        },
        setOpening: (state, action: PayloadAction<boolean>) => {
            state.adding = action.payload;
        },
        setCurrentChat: (state, action: PayloadAction<ChatEntity>) => {
            state.currentChat = action.payload;
        },
        clearChats: (state) => {
            state.chats = [];
        }
    }
});

export const { setChats, setOpening, setCurrentChat, clearChats } = chatsSlice.actions;
export default chatsSlice.reducer;
