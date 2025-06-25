import apiClient from "./auth/apiClient";
import {MessageDto as RequestAskDto} from "../DTO's/requests/askBot";
import {MessagesDto as ResponseAskDto} from "../DTO's/responses/askBot";
import {ChatDto as RequestCreateChatDto} from "../DTO's/requests/createChat";
import {ChatDto as ResponseCreateChatDto} from "../DTO's/responses/createChat";
import {ChatDto as ResponseFetchChatsDto} from "../DTO's/responses/fetchChats";
import {ChatEntity, CreatedChatEntity} from "../Entities/ChatEntities";
import {idManager} from "./auth/idManager";

const mapChatDto = (chat: ResponseFetchChatsDto): ChatEntity => ({
    id: chat.chat_id,
    botId: chat.bot_id,
    name: chat.chat_name,
    botName: chat.bot_name,
    avatar: chat.bot_avatar,
    createdAt: chat.created_at
});

const mapCreatedChatDto = (chat: ResponseCreateChatDto): CreatedChatEntity => ({
    id: chat.chat_id,
    name: chat.chat_name,
    botAvatar: chat.bot_avatar,
    botName: chat.bot_name,
    createdAt: chat.created_at
});

export const askBot = async (name: string, data: RequestAskDto): Promise<ResponseAskDto | undefined> => {
    try {
        const {data: responseData} = await apiClient.post('/chats/ask', data, {
            headers: {
                'X-name': name,
            },
            botId: true,
            chatId: true
        });
        return {
            bot_message: responseData.bot_message,
            user_message: responseData.user_message
        }
    } catch (e) {
        console.error("Error sending message: ", e);
    }
}

export const fetchChats = async (): Promise<ChatEntity[] | undefined> => {
    try {
        const {data: responseData} = await apiClient.get<ResponseFetchChatsDto[]>('/chats/user');
        return responseData.map(mapChatDto);
    } catch (e) {
        console.error("Error fetching chats: ", e)
    }
}

export const createChat = async (data: RequestCreateChatDto): Promise<CreatedChatEntity | undefined> => {
    try {
        const {data: responseData} = await apiClient.post<ResponseCreateChatDto>(`/chats/create`, data);
        return mapCreatedChatDto(responseData);
    } catch (e) {
        console.error('Error creating chat: ', e);
    }
}

export const deleteChat = async (): Promise<void | undefined> => {
    try {
        const chatId = idManager.getChatId();
        if (!chatId) {
            return undefined;
        }
        await apiClient.delete(`/chats/${chatId}/delete`);
    } catch (e) {
        console.error("Error deleting chat: ", e);
    }
}

export const currentChat = async (chat_id: string): Promise<ChatEntity | undefined> => {
    const {data} = await apiClient.get<ResponseFetchChatsDto>(`/chats/${chat_id}`);
    return mapChatDto(data);
}
