import useSWR from "swr";
import {currentChat} from "../../services/chats";
import {ChatEntity} from "../../Entities/ChatEntities";
import {idManager} from "../../services/auth/idManager";


export const useCurrentChat = ( ) => {
    const id = idManager.getChatId()
    return useSWR<ChatEntity | undefined>(id ? ['/currentChat', id] : null, currentChat);
}