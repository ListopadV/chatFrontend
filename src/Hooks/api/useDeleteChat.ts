import useSWRMutation from "swr/mutation";
import {mutate} from "swr";
// import { deleteChat as deleteChatApi } from "../../api/chatApi";
import {deleteChat} from "../../services/chats";

export const useDeleteChat = (chat_id: string) => {
    const {trigger, isMutating, error} = useSWRMutation(
        ['/deleteChat', chat_id],
        async () => {
            await deleteChat();
            await mutate('/fetchChats');
        }
    );
    return {
        deleteChat: trigger, isDeleting: isMutating, error
    }
}
