import apiClient from "./auth/apiClient";
import {MessageEntity} from "../Entities/MessageEntities";
import {MessageDto} from "../DTO's/responses/fetchMessages";

const mapMessageDto = (message: MessageDto): MessageEntity => ({
    id: message.message_id,
    createdAt: message.created_at,
    order: message.message_order,
    sender: message.sender_type,
    text: message.text
});

export const fetchMessages = async (): Promise<MessageEntity[] | undefined> => {
    try {
        const {data: responseData} = await apiClient.get<{ messages: MessageDto[] }>('/messages/fetch', {
            chatId: true,
            botId: true
        });
        return responseData.messages.map(mapMessageDto);
    } catch (e) {
        console.error("Error fetching messages:", e);
    }
}