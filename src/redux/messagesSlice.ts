import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {MessagesState} from "../Entities/MessageEntities";
import {MessageEntity} from "../Entities/MessageEntities";


const initialState: MessagesState = {
    messages: [],
    messageOrder: 0
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<MessageEntity[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<MessageEntity>) => {
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

// export const fetchMessages = (accessToken: string, chat_id: string, bot_id: string) => async (dispatch: AppDispatch) => {
//     try {
//         const response = await axios.get(`${url}/messages/fetch`, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'X-chat-id': chat_id,
//             'X-bot-id': bot_id
//         },
//     });
//         dispatch(setMessages(response.data.messages));
//         if (response.data.messages.length > 0){
//         const order = response.data.messages[response.data.messages.length  - 1].message_order;
//             dispatch(setMessageOrder(order));
//         }
//         return response;
//     } catch (e){
//         console.error('Error fetching messages: ', e);
//     }
// }

export const { setMessages, addMessage, clearMessages, setMessageOrder } = messagesSlice.actions;
export default messagesSlice.reducer;
