import useSWR from "swr";
import {currentChat} from "../../services/chats";
import {ChatEntity} from "../../Entities/ChatEntities";

export const useCurrentChat = (chat_id: string) => {
    return useSWR<ChatEntity | undefined>(chat_id ? chat_id : null, currentChat);
};